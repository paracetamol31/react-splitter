import { makeAutoObservable } from "mobx";
import { IParamsSplitterItemConstructor } from "./types";

export class SplitterItem {
    children: string | JSX.Element | JSX.Element[];
    size: string;
    minSize: number = 200;

    constructor(params?: IParamsSplitterItemConstructor) {
        if (params) {
            if (params.size) {
                this.size = params.size;
            }
            if (params.minSize) {
                this.minSize = params.minSize;
            }
        }
        makeAutoObservable(this);
    }
}