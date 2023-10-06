import { makeAutoObservable } from "mobx";
import { IParamsSplitterItemConstructor } from "./types";

export class SplitterItem {
    children: string | JSX.Element | JSX.Element[];
    size: number = 100;
    minSize: number = 200;
    offset: number = 0
    isResizing: boolean = false;

    constructor(params: IParamsSplitterItemConstructor) {
        if (params) {
            if (params.size !== undefined) {
                this.size = params.size;
            }
            if (params.minSize) {
                this.minSize = params.minSize;
            }
            this.offset = params.offset;
        }
        makeAutoObservable(this);
    }
}