import { CSSProperties, FC, useCallback, useRef } from "react";
import separatorStyle from "./separator.module.css";
import React from "react";
import { Splitter } from "../splitter/splitter";

export const SeparatorView: FC<{ splitter: Splitter, indexSeparator: number }> = ({ splitter, indexSeparator }) => {
    const className = `${separatorStyle.separator} ${separatorStyle[splitter.orientation]}`;
    const separatorRef = useRef<HTMLDivElement>(null);

    const onResize = useCallback((event: MouseEvent) => {
        event.preventDefault();
        if (splitter.isResizing
            && splitter.savedPointCurrentSeparator !== null
            && splitter.splitterRef
            && splitter.splitterRef.current
            && splitter.currentSeparatorIndex !== null
            && separatorRef.current) {
            let actualSeparatorPoint: number = 0;
            if (splitter.orientation === "horizontal") {
                actualSeparatorPoint = event.clientX;
            } else {
                actualSeparatorPoint = event.clientY;
            }

            let size: number;
            if (splitter.orientation === "horizontal") {
                size = splitter.splitterRef.current.clientWidth;
            } else {
                size = splitter.splitterRef.current.clientHeight;
            }

            const offset: number = splitter.savedPointCurrentSeparator - actualSeparatorPoint;
            let percentageOffset: number = Number((offset / (size / 100) / 100).toFixed(4));




            if (percentageOffset > 0) {
                if (splitter.orientation === "horizontal") {
                    const clientRect: DOMRect = separatorRef.current.getBoundingClientRect();
                    const centralSeparatorPoint: number = clientRect.x + (clientRect.width / 2)
                    if (centralSeparatorPoint < event.clientX) {
                        splitter.savedPointCurrentSeparator = actualSeparatorPoint;
                        return;
                    }
                } else {
                    const clientRect: DOMRect = separatorRef.current.getBoundingClientRect();
                    const centralSeparatorPoint: number = clientRect.y + (clientRect.height / 2)
                    if (centralSeparatorPoint < event.clientY) {
                        splitter.savedPointCurrentSeparator = actualSeparatorPoint;
                        return;
                    }
                }

                for (let i: number = splitter.currentSeparatorIndex; i >= 0; i--) {
                    const minRatioSizeLeftItem = splitter.listSplitterItems[i].minSize / (size / 100) / 100;

                    if (splitter.listSplitterItems[i].ratioSize <= minRatioSizeLeftItem) {
                        continue;
                    }

                    const ratioSizeLeftItem: number = splitter.listSplitterItems[i].ratioSize - percentageOffset;

                    if (ratioSizeLeftItem < minRatioSizeLeftItem) {
                        splitter.listSplitterItems[i].ratioSize -= (Math.abs(percentageOffset) - (minRatioSizeLeftItem - ratioSizeLeftItem));
                        splitter.listSplitterItems[splitter.currentSeparatorIndex + 1].ratioSize += (Math.abs(percentageOffset) - (minRatioSizeLeftItem - ratioSizeLeftItem));
                    } else {
                        splitter.listSplitterItems[i].ratioSize -= percentageOffset;
                        splitter.listSplitterItems[splitter.currentSeparatorIndex + 1].ratioSize += percentageOffset;
                    }
                    break;
                }
            } else {
                if (splitter.orientation === "horizontal") {
                    const clientRect: DOMRect = separatorRef.current.getBoundingClientRect();
                    const centralSeparatorPoint: number = clientRect.x + (clientRect.width / 2)
                    if (centralSeparatorPoint > event.clientX) {
                        splitter.savedPointCurrentSeparator = actualSeparatorPoint;
                        return;
                    }
                } else {
                    const clientRect: DOMRect = separatorRef.current.getBoundingClientRect();
                    const centralSeparatorPoint: number = clientRect.y + (clientRect.height / 2)
                    if (centralSeparatorPoint > event.clientY) {
                        splitter.savedPointCurrentSeparator = actualSeparatorPoint;
                        return;
                    }
                }

                for (let i: number = splitter.currentSeparatorIndex + 1; i < splitter.listSplitterItems.length; i++) {
                    const minRatioSizeRightItem = splitter.listSplitterItems[i].minSize / (size / 100) / 100;

                    if (splitter.listSplitterItems[i].ratioSize <= minRatioSizeRightItem) {
                        continue;
                    }

                    const ratioSizeRightItem: number = splitter.listSplitterItems[i].ratioSize + percentageOffset;

                    if (ratioSizeRightItem < minRatioSizeRightItem) {
                        splitter.listSplitterItems[splitter.currentSeparatorIndex].ratioSize += (Math.abs(percentageOffset) - (minRatioSizeRightItem - ratioSizeRightItem));
                        splitter.listSplitterItems[i].ratioSize -= (Math.abs(percentageOffset) - (minRatioSizeRightItem - ratioSizeRightItem));
                    } else {
                        splitter.listSplitterItems[splitter.currentSeparatorIndex].ratioSize -= percentageOffset;
                        splitter.listSplitterItems[i].ratioSize += percentageOffset;
                    }
                    break;
                }
            }

            // let sum = 0;
            // for (let i = 0; i < splitter.listSplitterItems.length; i++) {
            //     sum += splitter.listSplitterItems[i].ratioSize;
            // }
            // console.log("sum", sum);
            // splitter.seavedPointCurrentSeparator = actualseparatorPoint;

        }
    }, [splitter]);

    const onMouseDown = useCallback<React.MouseEventHandler<HTMLElement>>((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.preventDefault();
        splitter.setResizing(true);
        splitter.currentSeparatorIndex = indexSeparator;
        if (splitter.orientation === "horizontal") {
            splitter.savedPointCurrentSeparator = event.clientX;
        } else {
            splitter.savedPointCurrentSeparator = event.clientY;
        }
        const onMouseUp = () => {
            splitter.setResizing(false);
            window.removeEventListener("mousemove", onResize);
            window.removeEventListener("mouseup", onMouseUp);
        }

        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("mousemove", onResize);
    }, [indexSeparator, onResize, splitter]);

    const onMouseUp = useCallback(() => {
        splitter.setResizing(false);
    }, [splitter]);


    const inlineStyle: CSSProperties = {
        [splitter.orientation === "horizontal" ? "width" : "height"]: `${splitter.separatorSize}px`
    }
    return (
        <section ref={separatorRef} onMouseDown={onMouseDown} onMouseUp={onMouseUp} className={className} style={inlineStyle} />
    )
}