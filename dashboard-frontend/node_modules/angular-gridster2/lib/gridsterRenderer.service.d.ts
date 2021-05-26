import { Renderer2 } from '@angular/core';
import { GridsterComponentInterface } from './gridster.interface';
import { GridsterItem } from './gridsterItem.interface';
export declare class GridsterRenderer {
    private gridster;
    constructor(gridster: GridsterComponentInterface);
    destroy(): void;
    updateItem(el: any, item: GridsterItem, renderer: Renderer2): void;
    updateGridster(): void;
    getGridColumnStyle(i: number): {
        width: string;
        height: string;
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: string | number | symbol): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: string | number | symbol): boolean;
    };
    getGridRowStyle(i: number): {
        width: string;
        height: string;
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: string | number | symbol): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: string | number | symbol): boolean;
    };
    getLeftPosition(d: number): Object;
    getTopPosition(d: number): Object;
    clearCellPosition(renderer: Renderer2, el: any): void;
    setCellPosition(renderer: Renderer2, el: any, x: number, y: number): void;
    getLeftMargin(): number;
    getTopMargin(): number;
}
