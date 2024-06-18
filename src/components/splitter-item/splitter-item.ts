import { makeObservable, observable } from "mobx";
import { IParamsSplitterItemConstructor } from "./types";
import { Splitter } from "../splitter/splitter";

export class SplitterItem {
    splitter: Splitter;
    size: number = 100;
    minSize: number = 200;
    offset: number = 0

    ratioSize: number = 0.5;
    ratioMinSize: number | null = null;

    constructor(params: IParamsSplitterItemConstructor) {
        if (params) {
            if (params.minSize) {
                this.minSize = params.minSize;
            }
            this.splitter = params.splitter;
            this.offset = params.offset;
            this.ratioSize = params.ratioSize;
        }
        makeObservable(this, {
            ratioSize: observable
        });
    }
}