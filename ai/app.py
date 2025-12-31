from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Enhanced crop-soil knowledge base
CROP_DATA = {
    "Rice": {
        "clay": {
            "suitability": "High",
            "water_retention": "Excellent",
            "drainage_needs": "Moderate",
            "fertilizer_base": "NPK 120:60:40 kg/ha"
        },
        "loam": {
            "suitability": "High", 
            "water_retention": "Good",
            "drainage_needs": "Good",
            "fertilizer_base": "NPK 100:50:50 kg/ha"
        },
        "sandy": {
            "suitability": "Moderate",
            "water_retention": "Poor",
            "drainage_needs": "Excellent", 
            "fertilizer_base": "NPK 80:40:60 kg/ha"
        }
    },
    "Cotton": {
        "clay": {
            "suitability": "Moderate",
            "water_retention": "High",
            "drainage_needs": "Critical",
            "fertilizer_base": "NPK 150:75:75 kg/ha"
        },
        "loam": {
            "suitability": "High",
            "water_retention": "Good", 
            "drainage_needs": "Good",
            "fertilizer_base": "NPK 120:60:60 kg/ha"
        },
        "sandy": {
            "suitability": "High",
            "water_retention": "Low",
            "drainage_needs": "Excellent",
            "fertilizer_base": "NPK 100:50:75 kg/ha"
        }
    },
    "Wheat": {
        "clay": {
            "suitability": "Moderate",
            "water_retention": "High",
            "drainage_needs": "Important",
            "fertilizer_base": "NPK 120:60:40 kg/ha"
        },
        "loam": {
            "suitability": "High",
            "water_retention": "Good",
            "drainage_needs": "Good", 
            "fertilizer_base": "NPK 100:50:30 kg/ha"
        },
        "sandy": {
            "suitability": "Moderate",
            "water_retention": "Poor",
            "drainage_needs": "Excellent",
            "fertilizer_base": "NPK 80:40:40 kg/ha"
        }
    },
    "Maize": {
        "clay": {
            "suitability": "Moderate",
            "water_retention": "High", 
            "drainage_needs": "Critical",
            "fertilizer_base": "NPK 150:75:60 kg/ha"
        },
        "loam": {
            "suitability": "High",
            "water_retention": "Good",
            "drainage_needs": "Good",
            "fertilizer_base": "NPK 120:60:40 kg/ha"
        },
        "sandy": {
            "suitability": "High",
            "water_retention": "Low",
            "drainage_needs": "Excellent", 
            "fertilizer_base": "NPK 100:50:50 kg/ha"
        }
    }
}

def generate_three_advisories(crop: str, soil: str, location: str = "", season: str = ""):
    """Generate three parallel advisory modes: Economical, Environment-friendly, Balanced"""
    
    crop = crop or "Rice"
    soil = (soil or "loam").lower()
    
    # Get base crop-soil data
    crop_info = CROP_DATA.get(crop, CROP_DATA["Rice"])
    soil_info = crop_info.get(soil, crop_info["loam"])
    
    # Base explanation for all modes
    base_explanation = f"This recommendation is based on {crop} cultivation in {soil} soil. "
    if soil == "clay":
        base_explanation += "Clay soil retains water well but needs good drainage to prevent waterlogging."
    elif soil == "sandy":
        base_explanation += "Sandy soil drains quickly and requires frequent irrigation with organic matter."
    else:
        base_explanation += "Loamy soil provides ideal conditions with balanced water retention and drainage."
    
    # 1. ECONOMICAL MODE 💰
    economical = {
        "mode": "Economical",
        "icon": "💰",
        "focus": "Cost minimization and short-term profit",
        "what_to_do": [
            f"Use 75% of recommended fertilizer: {reduce_fertilizer(soil_info['fertilizer_base'])}",
            "Apply farmyard manure (5-7 tons/ha) to reduce chemical fertilizer needs",
            "Use drip irrigation or alternate wetting-drying to save water costs",
            "Practice intercropping to maximize land utilization"
        ],
        "when_to_do": [
            "Apply base fertilizer 2 weeks before sowing",
            "First top-dressing at 30 days after sowing", 
            "Second top-dressing at flowering stage",
            "Irrigate only when soil moisture drops below 70%"
        ],
        "why_advice": base_explanation + " This economical approach reduces input costs by 25-30% while maintaining 85-90% yield potential.",
        "cost_implication": "₹15,000-20,000 per hectare (25% cost reduction)",
        "yield_expectation": "85-90% of maximum potential yield",
        "risk_level": "Medium - Lower inputs may affect yield in adverse conditions"
    }
    
    # 2. ENVIRONMENT-FRIENDLY MODE 🌱  
    environment = {
        "mode": "Environment-Friendly",
        "icon": "🌱", 
        "focus": "Sustainability and soil health",
        "what_to_do": [
            "Use 100% organic fertilizers: Compost (8-10 tons/ha) + Vermicompost (2 tons/ha)",
            "Apply bio-fertilizers: Azotobacter, PSB, and KSB",
            "Practice crop rotation with legumes to fix nitrogen naturally",
            "Use neem-based organic pesticides and beneficial insects"
        ],
        "when_to_do": [
            "Apply organic manure 3-4 weeks before sowing",
            "Bio-fertilizer application at sowing time",
            "Foliar spray of organic nutrients every 15 days",
            "Mulching after 20 days of sowing"
        ],
        "why_advice": base_explanation + " This organic approach builds long-term soil health, reduces chemical residues, and supports sustainable farming practices.",
        "cost_implication": "₹18,000-25,000 per hectare (Higher initial cost, lower long-term expenses)",
        "yield_expectation": "80-85% of conventional yield initially, improving over 2-3 seasons",
        "risk_level": "Low - Builds soil resilience and reduces dependency on external inputs"
    }
    
    # 3. BALANCED MODE ⚖️
    balanced = {
        "mode": "Balanced", 
        "icon": "⚖️",
        "focus": "Optimal cost-benefit with sustainability",
        "what_to_do": [
            f"Use integrated approach: 50% chemical + 50% organic fertilizers",
            f"Chemical component: {soil_info['fertilizer_base']} (reduced by 50%)",
            "Organic component: FYM (6 tons/ha) + Vermicompost (1 ton/ha)",
            "Precision irrigation based on soil moisture sensors"
        ],
        "when_to_do": [
            "Apply organic manure 2-3 weeks before sowing",
            "Chemical fertilizer in 3 split doses: basal, 30 DAS, flowering",
            "Bio-fertilizer application with seeds",
            "Monitor and irrigate based on crop growth stage"
        ],
        "why_advice": base_explanation + " This balanced approach optimizes both economic returns and environmental sustainability, recommended for most farmers.",
        "cost_implication": "₹20,000-28,000 per hectare (Moderate investment with good returns)",
        "yield_expectation": "90-95% of maximum potential yield",
        "risk_level": "Low - Best risk-reward ratio with sustainable practices"
    }
    
    return {
        "economical": economical,
        "environment": environment, 
        "balanced": balanced,
        "crop": crop,
        "soil": soil,
        "suitability": soil_info["suitability"],
        "timestamp": datetime.now().isoformat()
    }

def reduce_fertilizer(fertilizer_str):
    """Reduce fertilizer recommendation by 25% for economical mode"""
    try:
        # Extract NPK values from string like "NPK 120:60:40 kg/ha"
        parts = fertilizer_str.split()
        npk_part = parts[1]  # "120:60:40"
        n, p, k = map(int, npk_part.split(':'))
        
        # Reduce by 25%
        n_reduced = int(n * 0.75)
        p_reduced = int(p * 0.75) 
        k_reduced = int(k * 0.75)
        
        return f"NPK {n_reduced}:{p_reduced}:{k_reduced} kg/ha"
    except:
        return "NPK 90:45:30 kg/ha (reduced)"

def make_advisory(crop: str, soil: str):
    """Legacy function for backward compatibility"""
    advisories = generate_three_advisories(crop, soil)
    
    # Return balanced mode as default for legacy compatibility
    balanced = advisories["balanced"]
    
    result = {
        "crop": crop,
        "suitability": advisories["suitability"],
        "irrigation": balanced["what_to_do"][:2],
        "fertilizer": balanced["what_to_do"][2:],
        "precautions": ["Monitor pests regularly", "Maintain proper drainage"],
        "explanation": balanced["why_advice"]
    }
    
    advice_text = f"Balanced advisory for {crop} in {soil} soil: " + ". ".join(balanced["what_to_do"][:2])
    return {"advice": advice_text, "result": result}


@app.route('/infer/advisory', methods=['POST'])
def infer_advisory():
    """Enhanced advisory endpoint supporting three parallel modes"""
    data = request.get_json() or {}
    crop = data.get('crop', 'Rice')
    soil = data.get('soil', 'loam')
    location = data.get('location', '')
    season = data.get('season', '')
    mode = data.get('mode', 'all')  # 'all', 'economical', 'environment', 'balanced'
    
    if mode == 'all':
        # Return all three advisory modes
        advisories = generate_three_advisories(crop, soil, location, season)
        return jsonify(advisories)
    else:
        # Return specific mode for backward compatibility
        advisories = generate_three_advisories(crop, soil, location, season)
        if mode in advisories:
            return jsonify({
                "advice": f"{advisories[mode]['focus']}: " + ". ".join(advisories[mode]['what_to_do'][:2]),
                "result": advisories[mode],
                "mode": mode
            })
        else:
            # Fallback to legacy format
            return jsonify(make_advisory(crop, soil))

@app.route('/infer/weather', methods=['POST'])
def get_weather_context():
    """Weather intelligence endpoint for advisory enhancement"""
    data = request.get_json() or {}
    location = data.get('location', '')
    
    # Mock weather data - in production, integrate with weather API
    weather_data = {
        "location": location,
        "temperature": "28°C",
        "humidity": "75%",
        "rainfall_forecast": "Light rain expected in next 48 hours",
        "wind_speed": "12 km/h",
        "advisory_impact": {
            "irrigation": "Reduce watering frequency due to expected rainfall",
            "fertilizer": "Delay nitrogen application until after rain",
            "pest_risk": "Moderate - humid conditions may increase fungal diseases"
        }
    }
    
    return jsonify(weather_data)

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "CropCare AI Advisory Engine",
        "version": "2.0.0",
        "features": ["three_mode_advisory", "weather_intelligence", "explainable_ai"]
    })


if __name__ == '__main__':
    print("🌾 CropCare AI Advisory Engine v2.0")
    print("✅ Three-mode advisory system enabled")
    print("✅ Weather intelligence ready")
    print("✅ Explainable AI activated")
    app.run(host='0.0.0.0', port=8000, debug=True)
