import { IMercatorTile } from '@/cottno/lib/interfaces/IMercatorTile';
import { IRasterData } from './ITileData';
import { MapLayer } from './MapLayer';

export class RasterLayer extends MapLayer {
  urlTemplate: string;

  constructor(urlTemplate: string) {
    super();
    this.urlTemplate = urlTemplate;
  }

  async getTile(tile: IMercatorTile): Promise<IRasterData> {
    const image = this.urlTemplate
      .replace(`{x}`, tile.x.toString())
      .replace(`{y}`, tile.y.toString())
      .replace(`{z}`, tile.z.toString());

    const tileData: IRasterData = {
      image,
      enablePrimaryClick: this.isInteractive,
      id: `${tile.x}/${tile.y}/${tile.x}`,
      layerId: this.id,
    };

    return tileData;
  }
}
