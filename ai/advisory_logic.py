import sys

def get_crop_advisory(crop, soil):
    if crop == "Rice":
        if soil == "Clay":
            return "Clay soil holds water well. Reduce irrigation and apply nitrogen fertilizer after 15 days."
        elif soil == "Loam":
            return "Loam soil is ideal. Maintain regular irrigation and apply balanced fertilizer."
        else:
            return "Sandy soil drains quickly. Increase irrigation frequency and add organic manure."

    if crop == "Cotton":
        if soil == "Clay":
            return "Ensure proper drainage and avoid waterlogging. Apply fertilizer in split doses."
        elif soil == "Loam":
            return "Loam soil suits cotton well. Follow recommended fertilizer schedule."
        else:
            return "Sandy soil needs frequent irrigation and organic matter for cotton."

    return "Follow standard agricultural practices for your crop."


if __name__ == "__main__":
    try:
        crop = sys.argv[1]
        soil = sys.argv[2]
        print(get_crop_advisory(crop, soil))
    except Exception:
        print("Follow standard agricultural practices for your crop.")
