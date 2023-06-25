import { useEffect, useRef } from 'react';
import { MapLayer } from './layers/MapLayer';
import { MapController } from './MapController';
import { IMapClickEvent, IMapOptions, IPosition, MercatorMap } from './MercatorMap';
import { PixiMap } from './PixiMap';

const defaultMapOptions: IMapOptions = {
  tileSize: 512,
  minScale: 0.7,
  maxScale: 1.4,
  maxZoom: 19,
};

export const usePixiMap = (
  container: HTMLDivElement | null,
  layers: MapLayer[] = [],
  position: IPosition = { lat: 0, long: 0, zoom: 3 },
  mapOptions: IMapOptions = defaultMapOptions,
  onClick?: (ev: IMapClickEvent) => void,
  onContext?: (ev: IMapClickEvent) => void,
  onMapMove?: (ev: IPosition) => void
): MercatorMap | undefined => {
  const mapRef = useRef<MercatorMap>();

  useEffect(() => {
    let init: boolean;
    let pixiMap: PixiMap;
    let controller: MapController;

    if (container) {
      init = true;

      pixiMap = new PixiMap(
        container,
        mapOptions ?? defaultMapOptions,
        position,
        onClick,
        onContext,
        onMapMove
      );

      mapRef.current = pixiMap;

      layers.forEach((layer) => pixiMap.addLayer(layer));

      controller = new MapController(pixiMap);
    }

    return () => {
      if (init) {
        controller.dispose();
        pixiMap.destroy();
      }
    };
  }, [container]);

  return mapRef.current;
};
