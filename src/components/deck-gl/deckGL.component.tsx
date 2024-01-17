import React, { useState, useEffect, useRef } from 'react';
import DeckGL from '@deck.gl/react/typed';
import { Map, View } from 'ol';
import { Tile as TileLayer, Layer } from 'ol/layer';
import { OSM } from 'ol/source';
import { GeoJsonLayer, ArcLayer } from '@deck.gl/layers/typed';
import {fromLonLat, toLonLat} from 'ol/proj';
import { ILayerData } from '../../models/Layer-model';
import { BaseLayer } from './deckGL.styles';

interface IProps {
  layerData: ILayerData;
}
const DeckGLMap = (props: IProps) => {
  const [map, setMap] = useState<Map>();
  const [canvasStyle, setCanvasStyle] = useState<{}>()
  const [deckViewState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 0,
  });
  const deckRef: any = useRef();
  
  useEffect(() => {
    // INIT DECK GL LAYER
    const deckLayer = new Layer({
      // @ts-ignore
      render({size, viewState}) {
        const [width, height] = size;
        const [longitude, latitude] = toLonLat(viewState.center);
        const zoom = viewState.zoom - 1;
        const bearing = (-viewState.rotation * 180) / Math.PI;
        const deckViewState = {bearing, longitude, latitude, zoom};
        deckRef?.current?.deck?.setProps(
            {
              width, 
              height,
              viewState: deckViewState
            }
          );
        deckRef?.current?.deck?.redraw();
      }
    });

    // Initialize OpenLayers map
    const olMap = new Map({
      layers: [
        new TileLayer({
          source: new OSM(), // OpenStreetMap as the default basemap
        }),
        deckLayer
      ],
      target: 'ol-map',
      view: new View({center: fromLonLat([0, 0]), zoom: 0}),
    });
    const el = document?.getElementById('ol-map') as HTMLElement;
    const layerBoundaries = el?.getBoundingClientRect();
    setCanvasStyle({ 
      height: layerBoundaries?.height,
      width: layerBoundaries?.width,
      top: window.pageYOffset + layerBoundaries?.top,
      left: window.pageXOffset + layerBoundaries?.left 
    })
    setMap(olMap);
    // Clean up function (component will unmount)
    return () => {
      olMap.setTarget(undefined);
    };
  }, []);

  const layers = [
    new GeoJsonLayer({
      id: 'airports',
      data: props.layerData,
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 2000,
      getPointRadius: f => 11 - f?.properties?.scalerank,
      getFillColor: [200, 0, 80, 180],
      pickable: true,
      autoHighlight: true,
      onClick: info =>
        info.object && alert(`${info.object.properties.name} (${info.object.properties.abbrev})`)
    }),
    new ArcLayer({
      id: 'arcs',
      // @ts-ignore
      data: props.layerData,
      // @ts-ignore
      dataTransform: d => d?.features?.filter((f: { properties: { scalerank: number; }; }) => f?.properties?.scalerank < 4),
      // Styles
      getSourcePosition: f => [-0.4531566, 51.4709959], // London
      getTargetPosition: f => f.geometry.coordinates,
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
      getWidth: 1
    })
  ]

  return (
    <div>
      <BaseLayer id="ol-map" />
      {map && (
        <DeckGL
          ref={deckRef}
          layers={layers}
          // @ts-ignore
          parent={document.getElementById('ol-map')}
          initialViewState={deckViewState}
          controller={false}
          style={{pointerEvents: 'none', ...canvasStyle, zIndex: '1'}}
        >
        </DeckGL>
      )}
    </div>
  );
};

export default DeckGLMap;
