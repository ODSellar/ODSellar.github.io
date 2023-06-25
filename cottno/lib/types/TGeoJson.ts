import { GeoJsonObject, Point } from 'geojson';

export interface IGeoJsonExtension {
  properties: IGeoJsonProperties;
}

export interface IGeoJsonProperties {
  id: string;
}

export type TGeoJsonObject = IGeoJsonExtension & GeoJsonObject;

export type TPoint = IGeoJsonExtension & Point;
