import { action, makeObservable, observable } from "mobx"
import { TOrientation } from "../types"
import { IParamsSplitterConstructor } from "./types"
import { defaultSeparatorSize } from "../separator/types"

export class Splitter {
    separatorSize: number = defaultSeparatorSize;
    proportions: Array<number>;
    orientation: TOrientation = "horizontal";
    isInit: boolean = false;

    isResizing: boolean = false;

    constructor(params?: IParamsSplitterConstructor) {
        if (params) {
            if (params.separatorSize !== undefined) {
                this.separatorSize = params.separatorSize;
            }
            if (params.proportions) {
                this.proportions = params.proportions;
            }
            this.orientation = params.orientation || "horizontal";
        }
        makeObservable(this, {
            isInit: observable,
            isResizing: observable,
            setInit: action,
            setResizing: action
        });
    }

    public setInit = (value: boolean) => {
        this.isInit = value;
    }

    public setResizing = (value: boolean) => {
        this.isResizing = value;
    }
}
