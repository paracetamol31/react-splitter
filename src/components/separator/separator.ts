import { makeAutoObservable } from "mobx";
import { IParamsSeparatorConstructor, defaultSeparatorSize } from "./types";
import { SplitterItem } from "../splitter-item/splitter-item";

export class Separator {
    firstSplitterItem: SplitterItem | null = null;
    secondSplitterItem: SplitterItem | null = null;
    orientation: "vertical" | "horizontal" = "horizontal";
    size: number = defaultSeparatorSize;

    constructor(params?: IParamsSeparatorConstructor) {
        if (params) {
            this.orientation = params.orientation || "horizontal";
            this.size = params.size ?? defaultSeparatorSize;
            this.firstSplitterItem = params.firstSplitterItem || null;
            this.secondSplitterItem = params.secondSplitterItem || null

        }
        makeAutoObservable(this);
    }
} 