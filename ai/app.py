from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def make_advisory(crop: str, soil: str):
    crop = crop or "unknown"
    soil = (soil or "loam").lower()
    advice_lines = []

    # Basic rule set
    if soil in ["clay", "clayey"]:
        advice_lines.append("Soil is clay-heavy — avoid waterlogging; use moderate, deep irrigations.")
        irrigation = "Moderate watering; avoid waterlogging"
        fertilizer = "Add organic matter and balanced NPK; avoid excess urea"
        suitability = "Moderate"
    elif soil in ["sandy", "sandy loam"]:
        advice_lines.append("Sandy soils drain fast — provide frequent light irrigations.")
        irrigation = "Frequent light watering"
        fertilizer = "Use split fertilizer applications and organic matter"
        suitability = "Moderate"
    else:
        advice_lines.append("Loamy soils are generally suitable for many crops.")
        irrigation = "Regular schedule based on crop stage"
        fertilizer = "Standard NPK with organic amendments"
        suitability = "High"

    advice_lines.append(f"Crop: {crop}. Irrigation guidance: {irrigation}. Fertilizer: {fertilizer}.")

    result = {
        "crop": crop,
        "suitability": suitability,
        "irrigation": [irrigation],
        "fertilizer": [fertilizer],
        "precautions": ["Monitor pests regularly", "Avoid overwatering"],
        "explanation": "Rule-based advisory v1: simple soil-crop heuristics"
    }

    advice_text = " ".join(advice_lines)
    return {"advice": advice_text, "result": result}


@app.route('/infer/advisory', methods=['POST'])
def infer_advisory():
    data = request.get_json() or {}
    crop = data.get('crop') or data.get('crop', 'unknown')
    soil = data.get('soil') or data.get('soil', 'loam')

    out = make_advisory(crop, soil)
    return jsonify(out)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000)
