# CropCare Deployment Guide

Complete guide for deploying CropCare to production environments.

## Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Environment Setup](#environment-setup)
- [Docker Deployment](#docker-deployment)
- [Manual Deployment](#manual-deployment)
- [Cloud Deployment](#cloud-deployment)
- [Post-Deployment](#post-deployment)

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database backups configured
- [ ] SSL certificates obtained
- [ ] Domain name configured
- [ ] Monitoring setup
- [ ] Error tracking configured

## Environment Setup

### Production Environment Variables

#### Backend (`backend/.env.production`)

```env
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/cropcare?retryWrites=true&w=majority
JWT_SECRET=<strong-random-secret>
AI_URL=http://ai-service:8000
PORT=5000
```

#### AI Service (`ai/.env.production`)

```env
FLASK_ENV=production
FLASK_DEBUG=0
PORT=8000
HOST=0.0.0.0
```

#### Frontend

Build-time environment variables in `vite.config.js`:

```javascript
export default defineConfig({
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('https://api.cropcare.com')
  }
})
```

## Docker Deployment

### Using Docker Compose

#### 1. Production Docker Compose

Create `docker-compose.prod.yml`:

```yaml
version: "3.8"

services:
  mongo:
    image: mongo:6
    restart: always
    volumes:
      - mongo-data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
    ports:
      - "27017:27017"
    networks:
      - cropcare-network

  python:
    build: ./ai
    restart: always
    env_file:
      - ./ai/.env.production
    depends_on:
      - mongo
    networks:
      - cropcare-network

  backend:
    build: ./backend
    restart: always
    env_file:
      - ./backend/.env.production
    depends_on:
      - mongo
      - python
    ports:
      - "5000:5000"
    networks:
      - cropcare-network

  frontend:
    build: ./frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - cropcare-network

volumes:
  mongo-data:

networks:
  cropcare-network:
    driver: bridge
```

#### 2. Build and Deploy

```bash
# Build images
docker-compose -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop services
docker-compose -f docker-compose.prod.yml down
```

### Dockerfile Examples

#### Backend Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
```

#### Frontend Dockerfile

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### AI Service Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "app:app"]
```

## Manual Deployment

### Server Requirements

- Ubuntu 20.04+ / CentOS 8+ / Debian 11+
- Node.js 20.x
- Python 3.11+
- MongoDB 6.0+
- Nginx (for reverse proxy)

### Step-by-Step Deployment

#### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Python
sudo apt install -y python3 python3-pip python3-venv

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org

# Install Nginx
sudo apt install -y nginx

# Install PM2 (process manager)
sudo npm install -g pm2
```

#### 2. Application Setup

```bash
# Clone repository
git clone https://github.com/yourusername/CropCare.git
cd CropCare

# Setup backend
cd backend
npm install --production
cp .env.example .env
# Edit .env with production values
pm2 start index.js --name cropcare-backend

# Setup AI service
cd ../ai
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
gunicorn -w 4 -b 127.0.0.1:8000 app:app --daemon

# Setup frontend
cd ../frontend
npm install
npm run build
# Copy dist/ to web server directory
sudo cp -r dist/* /var/www/cropcare/
```

#### 3. Nginx Configuration

Create `/etc/nginx/sites-available/cropcare`:

```nginx
server {
    listen 80;
    server_name cropcare.com www.cropcare.com;

    # Frontend
    location / {
        root /var/www/cropcare;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # AI Service (if needed)
    location /ai {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/cropcare /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 4. SSL Setup (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d cropcare.com -d www.cropcare.com
```

## Cloud Deployment

### AWS Deployment

#### Using EC2

1. Launch EC2 instance (Ubuntu 20.04)
2. Follow manual deployment steps
3. Configure security groups
4. Set up Elastic IP

#### Using ECS/Fargate

1. Push Docker images to ECR
2. Create ECS cluster
3. Define task definitions
4. Create services

### Heroku Deployment

#### Backend

```bash
cd backend
heroku create cropcare-backend
heroku addons:create mongolab:sandbox
heroku config:set JWT_SECRET=your-secret
git push heroku main
```

#### Frontend

```bash
cd frontend
heroku create cropcare-frontend --buildpack https://github.com/mars/create-react-app-buildpack.git
git push heroku main
```

### DigitalOcean App Platform

1. Connect GitHub repository
2. Configure build settings
3. Set environment variables
4. Deploy

## Post-Deployment

### Health Checks

Create health check endpoints:

**Backend** (`/api/health`):
```javascript
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date(),
    mongo: mongoose.connection.readyState === 1
  });
});
```

### Monitoring

- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Error Tracking**: Sentry
- **Logging**: Loggly, Papertrail
- **Performance**: New Relic, Datadog

### Backup Strategy

#### MongoDB Backup

```bash
# Daily backup script
mongodump --uri="mongodb://localhost:27017/cropcare" --out=/backups/$(date +%Y%m%d)
```

#### Automated Backups

```bash
# Add to crontab
0 2 * * * /path/to/backup-script.sh
```

### Scaling

#### Horizontal Scaling

- Load balancer (Nginx/HAProxy)
- Multiple backend instances
- Database replication

#### Vertical Scaling

- Increase server resources
- Optimize database queries
- Add caching layer (Redis)

## Security Checklist

- [ ] HTTPS enabled
- [ ] Strong JWT secret
- [ ] Database authentication enabled
- [ ] Firewall configured
- [ ] Regular security updates
- [ ] Rate limiting enabled
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CORS properly configured

## Maintenance

### Regular Tasks

- Update dependencies monthly
- Review and rotate secrets quarterly
- Database optimization
- Log rotation
- Backup verification

### Update Procedure

```bash
# Pull latest changes
git pull origin main

# Update dependencies
npm install
pip install -r requirements.txt

# Rebuild and restart
docker-compose down
docker-compose build
docker-compose up -d

# Or for manual deployment
pm2 restart cropcare-backend
sudo systemctl restart nginx
```

---

For support, contact: devops@cropcare.com
