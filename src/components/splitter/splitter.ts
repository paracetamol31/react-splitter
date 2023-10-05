import { makeAutoObservable } from "mobx"
import { TOrientation } from "../types"
import { IParamsSplitterConstructor } from "./types"

export class Splitter {
    children: string | JSX.Element | JSX.Element[]
    separatorSize: number
    proportions: Array<number>
    orientation: TOrientation = "horizontal"

    constructor(params?: IParamsSplitterConstructor) {
        if (params) {
            if (params.separatorSize !== undefined) {
                this.separatorSize = params.separatorSize;
            }
            if (params.proportions) {
                this.proportions = params.proportions;
            }
            this.orientation = params.orientation || "horizontal";
            if (params.children) {
                this.children = params.children
            }
        }
        makeAutoObservable(this);
    }
}
