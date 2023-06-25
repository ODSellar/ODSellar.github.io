import { IMercatorTile } from '@/cottno/lib/interfaces/IMercatorTile';
import { ITileData } from './ITileData';

/**
 * A layer to be added to a MercatorMap.
 */
export abstract class MapLayer {
  public id?: number;
  public isInteractive: boolean = false;

  constructor() {}

  abstract getTile(tile: IMercatorTile): Promise<ITileData>;

  public revalidateTile = async (tileKey: number): Promise<void> => {};
}
