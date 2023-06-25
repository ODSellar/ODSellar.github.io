import { MapLayer } from '../../components/maps/layers/MapLayer';
import { IMapClickEvent } from '../../components/maps/MercatorMap';

export interface IContextMenuOption {
  label: string;
  onClick: (ev: IMapClickEvent) => void;
}

/**
 * A chart layer to add functionality to a chart.
 */
export abstract class ChartLayer {
  id?: number;
  chartId: number;
  layers: MapLayer[] = [];

  constructor(chartId: number) {
    this.chartId = chartId;
  }

  public handleClick = (ev: IMapClickEvent): void => {};

  public handleContext = (ev: IMapClickEvent): void => {};

  public getContextMenuContent = (): IContextMenuOption[] => {
    return [];
  };

  public getMapLayers = (): MapLayer[] => {
    return this.layers;
  };
}
