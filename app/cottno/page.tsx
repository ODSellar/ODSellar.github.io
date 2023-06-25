'use client';

import { IMapOptions } from '@/cottno/components/maps/MercatorMap';
import ReactMap from '@/cottno/components/maps/ReactMap';
import { Vector2 } from '@/cottno/components/maps/Vector2';
import { MapLayer } from '@/cottno/components/maps/layers/MapLayer';
import { IContextControls } from '@/cottno/lib/interfaces/IContextControls';
import { BaseRasterLayer } from '@/cottno/lib/layers/BaseRasterLayer';
import { ReactElement, useEffect, useState } from 'react';

interface IParams {
  chartName: string;
}

interface IProps {
  params: IParams;
}

export default function ChartPage({ params }: IProps): ReactElement {
  const [mapLayers, setMapLayers] = useState<MapLayer[]>([]);
  const [menu, setMenu] = useState<ReactElement[] | null>(null);
  const [menuPosition, setMenuPosition] = useState<Vector2>();

  useEffect(() => {
    const contextControls: IContextControls = {
      setMenu,
      setMenuPosition,
      composeContextMenuContent: (ev, closeMenu) => [],
    };

    const layer = new BaseRasterLayer(1, contextControls);

    setMapLayers(layer.getMapLayers());
  }, []);

  const mapOptions: IMapOptions = {
    tileSize: 512,
    minScale: 0.7,
    maxScale: 1.4,
    maxZoom: 19,
  };

  return (
    <ReactMap
      layers={mapLayers}
      position={{ lat: 55, long: -2, zoom: 5 }}
      mapOptions={mapOptions}
    />
  );
}
