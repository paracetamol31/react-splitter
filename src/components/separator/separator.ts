import { makeAutoObservable } from "mobx";
import { IParamsSeparatorConstructor, defaultSeparatorSize } from "./types";

export class Separator {
    orientation: "vertical" | "horizontal" = "horizontal";
    size: number = defaultSeparatorSize;

    constructor(params?: IParamsSeparatorConstructor) {
        if (params) {
            this.orientation = params.orientation;
            this.size = params.size ?? defaultSeparatorSize;
        }
        makeAutoObservable(this);
    }
} 