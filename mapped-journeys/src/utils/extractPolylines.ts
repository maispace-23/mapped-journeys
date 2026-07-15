export const getPolylines = (hikes: any) => {
    const polylines = hikes
    .map(hike => hike.map?.summary_polyline)
    .filter(Boolean);
    return polylines;
};