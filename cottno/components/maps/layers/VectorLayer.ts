import { TPoint } from '@/cottno/lib/types/TGeoJson';
import { ITileData, IPointTileData, IPointStyle } from './ITileData';
import { MapLayer } from './MapLayer';
import { IMercatorTile } from '@/cottno/lib/interfaces/IMercatorTile';

export class VectorLayer extends MapLayer {
  getPoints: (tile: IMercatorTile) => Promise<IPointTileData>;

  styleFunc: (point: TPoint) => IPointStyle;

  constructor(
    getData: (tile: IMercatorTile) => Promise<IPointTileData>,
    styleFunc: (point: TPoint) => IPointStyle
  ) {
    super();
    this.getPoints = getData;
    this.styleFunc = styleFunc;
  }

  getTile(tile: IMercatorTile): Promise<IPointTileData> {
    return this.getPoints(tile);
  }
}
