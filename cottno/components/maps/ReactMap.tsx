import React, { FC, useRef, useState } from 'react';
import { IMapClickEvent, IMapOptions, IPosition, MercatorMap } from './MercatorMap';
import { MapLayer } from './layers/MapLayer';
import { usePixiMap } from './usePixiMap';

interface IProps {
  layers: MapLayer[];
  position?: IPosition;
  revalidateTile?: number;
  mapOptions?: IMapOptions;
  onClick?: (ev: IMapClickEvent) => void;
  onContext?: (ev: IMapClickEvent) => void;
  onMapMove?: (ev: IPosition) => void;
}

/**
 * Wraps a Mercator map for use in React component.
 *
 * @param layers Layers to add to the map.
 * @param mapOptions Options for the map.
 * @returns ReactElement containing the map.
 */
const ReactMap: FC<IProps> = ({
  layers,
  mapOptions,
  position,
  revalidateTile,
  onClick,
  onContext,
  onMapMove,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [prevPosition, setPrevPosition] = useState(position);
  const [prevRevalidateTile, setPrevRevalidateTile] = useState<number | undefined>(revalidateTile);
  const [prevOnMapMove, setPrevOnMapMove] = useState<(ev: IPosition) => void>();

  const pixiMap = usePixiMap(
    mapContainerRef.current,
    layers,
    position,
    mapOptions,
    onClick,
    onContext,
    onMapMove
  );

  if (position !== prevPosition && position) {
    pixiMap?.setPosition(position);
    setPrevPosition(position);
  }

  if (revalidateTile !== prevRevalidateTile && revalidateTile) {
    pixiMap?.revalidateTile(revalidateTile);
    setPrevRevalidateTile(revalidateTile);
  }

  if (prevOnMapMove !== onMapMove) {
    if (pixiMap) {
      pixiMap.onMapMove = onMapMove;
    }
    setPrevOnMapMove(() => onMapMove);
  }

  return (
    <div className="w-full h-full flex-grow select-none overflow-hidden" ref={mapContainerRef} />
  );
};

export default ReactMap;
