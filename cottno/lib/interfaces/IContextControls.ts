import { IMapClickEvent } from '@/cottno/components/maps/MercatorMap';
import { Vector2 } from '@/cottno/components/maps/Vector2';
import { ReactElement } from 'react';

export interface IContextControls {
  setMenu: (menu: ReactElement[] | null) => void;
  setMenuPosition: (point: Vector2) => void;
  composeContextMenuContent: (ev: IMapClickEvent, closeMenu: () => void) => ReactElement[];
}
