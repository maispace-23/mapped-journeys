import Map from "react-map-gl/maplibre";
import { Source, Layer } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { decodePolyline } from "../../utils/polyline";
import { stravaData } from "../../services/stravaTempData";
import { getPolylines } from "../../utils/extractPolylines";

const polylines = getPolylines(stravaData);

const coordinates = decodePolyline(polylines[0]);

const mapCoordinates = coordinates.map(([lat, lng]) => [lng, lat]);

const demoTrail = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: mapCoordinates,
      },
    },
  ],
};

const trails = {
  type: "FeatureCollection",
  features: [
    polylines.map((polyline: string) => ({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: decodePolyline(polyline),
      },
    })),
  ],
};

const trailLayer = {
  id: "trail",
  type: "line",
  paint: {
    "line-color": "#ff0000",
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
      {/* <Source id="trail" type="geojson" data={trail}>
        <Layer {...trailLayer} />
      </Source> */}
      <Source id="trail" type="geojson" data={demoTrail}>
        <Layer {...trailLayer} />
      </Source>
    </Map>
  );
};

export default MapView;
