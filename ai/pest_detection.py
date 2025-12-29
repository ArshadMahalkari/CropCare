def detect_pest(crop):
    if crop == "Rice":
        return {
            "disease": "Rice Leaf Blight",
            "solution": "Use recommended fungicide and avoid excess nitrogen fertilizer."
        }

    if crop == "Cotton":
        return {
            "disease": "Cotton Bollworm",
            "solution": "Install pheromone traps or spray recommended pesticide at early stage."
        }

    return {
        "disease": "Unknown",
        "solution": "Consult local agricultural extension officer."
    }

import sys
import json

if __name__ == "__main__":
    crop = sys.argv[1]
    result = detect_pest(crop)
    print(json.dumps(result))
