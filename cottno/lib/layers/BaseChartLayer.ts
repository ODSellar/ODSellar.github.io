import { IContextControls } from '../interfaces/IContextControls';
import { ChartLayer } from './ChartLayer';

/**
 * A base chart layer to add a map to a chart and base functionality.
 */
export abstract class BaseChartLayer extends ChartLayer {
  protected contextControls: IContextControls;
  constructor(chartId: number, contextControls: IContextControls) {
    super(chartId);
    this.contextControls = contextControls;
  }
}
