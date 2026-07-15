import polyline from "@mapbox/polyline";

export const decodePolyline = (encoded: string) => {
    const coordinates = polyline.decode(encoded);
    return coordinates;
}