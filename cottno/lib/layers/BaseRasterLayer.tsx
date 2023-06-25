import { RasterLayer } from '../../components/maps/layers/RasterLayer';
import { BaseChartLayer } from './BaseChartLayer';
import { Vector2 } from '../../components/maps/Vector2';
import { IMapClickEvent } from '../../components/maps/MercatorMap';
import { IContextControls } from '../interfaces/IContextControls';

/**
 * Creates a base raster layer which displays a map and adds functionality to the base map such as click handeling.
 */
export class BaseRasterLayer extends BaseChartLayer {
  constructor(chartId: number, contextControls: IContextControls) {
    super(chartId, contextControls);

    // The url is hardcoded here with the api key for demo purposes, in a production website I would hide this proxying requests through the back end.
    const mapLayer = new RasterLayer(
      `https://cdn.lima-labs.com/{z}/{x}/{y}.png?api=7324MSk4UfgMTGAsc875NCasdfuKWweaoA01`
    );

    mapLayer.isInteractive = true;

    this.layers = [mapLayer];
  }

  public handleContext = (ev: IMapClickEvent): void => {
    this.contextControls.setMenuPosition(new Vector2(ev.clientX, ev.clientY));

    const menuContent = this.contextControls.composeContextMenuContent(ev, () =>
      this.contextControls.setMenu(null)
    );

    this.contextControls.setMenu(menuContent);
  };

  public destroy() {}
}
