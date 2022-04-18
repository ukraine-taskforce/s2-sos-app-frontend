import MapComponent, { Layer, Source, MapProvider } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Geometry, FeatureCollection, GeoJsonProperties } from "geojson";
import { Box } from "@mui/material";
import { useSosInfoContext } from "../../others/contexts/sosInfo";

const MAP_STYLE = "https://api.maptiler.com/maps/streets/style.json?key=8XnO8TF3UjHDY1RKP9jm";


export const Map = () => {
  const { currentValue } = useSosInfoContext();
  const data: FeatureCollection<Geometry, GeoJsonProperties> = {
    type: "FeatureCollection",
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [currentValue.geolocation!.longitude, currentValue.geolocation!.latitude],
      },
      properties: {
      }
    }],
  };

  const initialView = {
    latitude: currentValue.geolocation!.latitude,
    longitude: currentValue.geolocation!.longitude,
    zoom: 16,
  };

  const circleStyle = {
    "circle-radius": 5,
    "circle-color": "rgb(24,178,43)",
    "circle-stroke-color": "black",
    "circle-stroke-width": 1,
    "circle-opacity": 1,
  };

  const metersToPixelsAtMaxZoom = currentValue.geolocation!.accuracy / 0.075 / Math.cos(currentValue.geolocation!.latitude * Math.PI / 180);

  const accuracyStyle = {
    "circle-radius": {
      stops: [
        [0, 0],
        [20, metersToPixelsAtMaxZoom],
      ],
      base: 2
    },
    "circle-color": "blue",
    "circle-stroke-color": "black",
    "circle-stroke-width": 1,
    "circle-opacity": 0.5,
  };

  return (
      <MapProvider>
        <Box sx={{ height: "100%", width: "100%" }}>
          <MapComponent
            mapLib={maplibregl}
            mapStyle={MAP_STYLE}
            style={{ borderRadius: "24px" }}
            initialViewState={initialView}
          >
            <Source id="circles-source" type="geojson" data={data}>
              <Layer id="circles" type="circle" paint={circleStyle} />
              <Layer id="accuracy" type="circle" paint={accuracyStyle} />
            </Source>
          </MapComponent>
        </Box>
      </MapProvider>
  );
};
