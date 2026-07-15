import Map from "react-map-gl/maplibre";
import { Source, Layer } from "react-map-gl/maplibre";
import { decodePolyline } from "../../utils/polyline";
import { stravaData } from "../../services/stravaTempData";
import { getPolylines } from "../../utils/extractPolylines";
import "maplibre-gl/dist/maplibre-gl.css";

const polylines = getPolylines(stravaData);

const allTrails = {
  type: "FeatureCollection",
  features: polylines.map((polyline: string) => {
    const coordinates = decodePolyline(polyline);

    const mapCoordinates = coordinates.map(([lat, lng]) => [lng, lat]);

    return {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: mapCoordinates,
      },
    };
  }),
};

const trailLayer = {
  id: "trail",
  type: "line",
  paint: {
    "line-color": "#001eff",
    "line-width": 5,
  },
};

const MapView = () => {
  return (
    <Map
      initialViewState={{
        longitude: -111.891,
        latitude: 40.7608,
        zoom: 9,
      }}
      style={{
        width: "100vw",
        height: "100vh",
      }}
      mapStyle="https://tiles.openfreemap.org/styles/bright"
    >
      <Source id="trail" type="geojson" data={allTrails}>
        <Layer {...trailLayer} />
      </Source>
    </Map>
  );
};

export default MapView;
