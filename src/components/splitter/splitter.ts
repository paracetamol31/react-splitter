import { action, makeObservable, observable } from "mobx"
import { IParamsSplitterConstructor, TOrientation } from "./types"
import { defaultSeparatorSize } from "../separator/types"
import { SplitterItem } from "../splitter-item/splitter-item";
import { RefObject } from "react";

export class Splitter {
    separatorSize: number = defaultSeparatorSize;
    proportions: Array<number> = [];
    orientation: TOrientation = "horizontal";
    currentSeparatorIndex: number | null = null;
    listSplitterItems: Array<SplitterItem> = []
    splitterRef: RefObject<HTMLDivElement> | null = null;

    savedPointCurrentSeparator: number | null = null;
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

    public onResize(event: MouseEvent, separatorRef: React.RefObject<HTMLDivElement>) {
        if (!(this.isResizing
            && this.savedPointCurrentSeparator !== null
            && this.splitterRef
            && this.splitterRef.current
            && this.currentSeparatorIndex !== null
            && separatorRef.current)) {
            return
        }
        let actualSeparatorPoint: number = 0;
        if (this.orientation === "horizontal") {
            actualSeparatorPoint = event.clientX;
        } else {
            actualSeparatorPoint = event.clientY;
        }

        let size: number;
        if (this.orientation === "horizontal") {
            size = this.splitterRef.current.clientWidth;
        } else {
            size = this.splitterRef.current.clientHeight;
        }

        const offset: number = this.savedPointCurrentSeparator - actualSeparatorPoint;
        let percentageOffset: number = Number((offset / (size / 100) / 100).toFixed(4));

        if (percentageOffset > 0) {
            if (this.orientation === "horizontal") {
                const clientRect: DOMRect = separatorRef.current.getBoundingClientRect();
                const centralSeparatorPoint: number = clientRect.x + (clientRect.width / 2)
                if (centralSeparatorPoint < event.clientX) {
                    this.savedPointCurrentSeparator = actualSeparatorPoint;
                    return;
                }
            } else {
                const clientRect: DOMRect = separatorRef.current.getBoundingClientRect();
                const centralSeparatorPoint: number = clientRect.y + (clientRect.height / 2)
                if (centralSeparatorPoint < event.clientY) {
                    this.savedPointCurrentSeparator = actualSeparatorPoint;
                    return;
                }
            }

            for (let i: number = this.currentSeparatorIndex; i >= 0; i--) {
                const minRatioSizeLeftItem = this.listSplitterItems[i].minSize / (size / 100) / 100;

                if (this.listSplitterItems[i].ratioSize <= minRatioSizeLeftItem) {
                    continue;
                }

                const ratioSizeLeftItem: number = this.listSplitterItems[i].ratioSize - percentageOffset;

                if (ratioSizeLeftItem < minRatioSizeLeftItem) {
                    this.listSplitterItems[i].ratioSize -= (Math.abs(percentageOffset) - (minRatioSizeLeftItem - ratioSizeLeftItem));
                    this.listSplitterItems[this.currentSeparatorIndex + 1].ratioSize += (Math.abs(percentageOffset) - (minRatioSizeLeftItem - ratioSizeLeftItem));
                } else {
                    this.listSplitterItems[i].ratioSize -= percentageOffset;
                    this.listSplitterItems[this.currentSeparatorIndex + 1].ratioSize += percentageOffset;
                }
                break;
            }
        } else {
            if (this.orientation === "horizontal") {
                const clientRect: DOMRect = separatorRef.current.getBoundingClientRect();
                const centralSeparatorPoint: number = clientRect.x + (clientRect.width / 2)
                if (centralSeparatorPoint > event.clientX) {
                    this.savedPointCurrentSeparator = actualSeparatorPoint;
                    return;
                }
            } else {
                const clientRect: DOMRect = separatorRef.current.getBoundingClientRect();
                const centralSeparatorPoint: number = clientRect.y + (clientRect.height / 2)
                if (centralSeparatorPoint > event.clientY) {
                    this.savedPointCurrentSeparator = actualSeparatorPoint;
                    return;
                }
            }

            for (let i: number = this.currentSeparatorIndex + 1; i < this.listSplitterItems.length; i++) {
                const minRatioSizeRightItem = this.listSplitterItems[i].minSize / (size / 100) / 100;

                if (this.listSplitterItems[i].ratioSize <= minRatioSizeRightItem) {
                    continue;
                }

                const ratioSizeRightItem: number = this.listSplitterItems[i].ratioSize + percentageOffset;

                if (ratioSizeRightItem < minRatioSizeRightItem) {
                    this.listSplitterItems[this.currentSeparatorIndex].ratioSize += (Math.abs(percentageOffset) - (minRatioSizeRightItem - ratioSizeRightItem));
                    this.listSplitterItems[i].ratioSize -= (Math.abs(percentageOffset) - (minRatioSizeRightItem - ratioSizeRightItem));
                } else {
                    this.listSplitterItems[this.currentSeparatorIndex].ratioSize -= percentageOffset;
                    this.listSplitterItems[i].ratioSize += percentageOffset;
                }
                break;
            }
        }

        // let sum = 0;
        // for (let i = 0; i < this.listSplitterItems.length; i++) {
        //     console.log("this.listSplitterItems[i].ratioSize", this.listSplitterItems[i].ratioSize);
        //     sum += this.listSplitterItems[i].ratioSize;
        // }
        // console.log("sum", sum);
        this.savedPointCurrentSeparator = actualSeparatorPoint;
    }
}
