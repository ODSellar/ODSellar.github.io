import { IMercatorTile } from '@/cottno/lib/interfaces/IMercatorTile';
import { TPoint } from '@/cottno/lib/types/TGeoJson';

type TLayerType = `raster` | `vector`;

export interface ITileData {
  enablePrimaryClick?: boolean;
  enableSecondaryClick?: boolean;
  layerId?: number;
}

export interface IRasterData extends ITileData {
  image: string;

  id?: string;
}

export interface IPointTileData extends ITileData {
  tile: IMercatorTile;
  points: TPoint[];
}

export interface IPointStyle {
  image?: string;
}
