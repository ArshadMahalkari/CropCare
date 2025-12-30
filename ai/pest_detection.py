import sys
import json

def detect_pest(crop):
    crop_upper = crop.upper() if crop else "UNKNOWN"
    
    if crop_upper == "RICE":
        return {
            "disease": "Rice Leaf Blight",
            "solution": "Use recommended fungicide (e.g., Propiconazole) and avoid excess nitrogen fertilizer. Ensure proper spacing and good drainage."
        }

    if crop_upper == "COTTON":
        return {
            "disease": "Cotton Bollworm",
            "solution": "Install pheromone traps or spray recommended pesticide (e.g., Spinosad) at early stage. Practice crop rotation."
        }

    if crop_upper == "WHEAT":
        return {
            "disease": "Wheat Rust",
            "solution": "Use resistant varieties and apply fungicides like Tebuconazole. Remove infected plant debris."
        }

    if crop_upper == "MAIZE":
        return {
            "disease": "Maize Leaf Blight",
            "solution": "Apply fungicides containing Mancozeb. Ensure proper crop spacing and avoid waterlogging."
        }

    return {
        "disease": "Unknown Disease",
        "solution": "Consult local agricultural extension officer for proper diagnosis and treatment."
    }

if __name__ == "__main__":
    try:
        crop = sys.argv[1] if len(sys.argv) > 1 else "Rice"
        result = detect_pest(crop)
        # Output JSON to stdout (important for PythonShell to capture)
        print(json.dumps(result))
        sys.stdout.flush()  # Ensure output is flushed
    except Exception as e:
        error_result = {
            "disease": "Error",
            "solution": f"Error processing request: {str(e)}"
        }
        print(json.dumps(error_result))
        sys.stdout.flush()
        sys.exit(1)
