import { CSSProperties, FC, MouseEventHandler, useCallback, useRef } from "react";
import separatorStyle from "./separator.module.css";
import React from "react";
import { Splitter } from "../splitter/splitter";

export const SeparatorView: FC<{ splitter: Splitter, indexSeparator: number }> = ({ splitter, indexSeparator }) => {
    const className = `${separatorStyle.separator} ${separatorStyle[splitter.orientation]}`;
    const separatorRef = useRef<HTMLDivElement>(null);

    const onResize = (event: MouseEvent) => {
        event.preventDefault();
        if (splitter.isResizing
            && splitter.seavedPointCurrentSeparator !== null
            && splitter.splitterRef
            && splitter.splitterRef.current
            && splitter.currentSeparotorIndex !== null
            && separatorRef.current) {
            let actualseparatorPoint: number = 0;
            if (splitter.orientation === "horizontal") {
                actualseparatorPoint = event.clientX;
            } else {
                actualseparatorPoint = event.clientY;
            }

            let size: number;
            if (splitter.orientation === "horizontal") {
                size = splitter.splitterRef.current.clientWidth;
            } else {
                size = splitter.splitterRef.current.clientHeight;
            }

            const ofsset: number = splitter.seavedPointCurrentSeparator - actualseparatorPoint;
            let percentageOfsset: number = ofsset / (size / 100) / 100;

            let ratioSizeLeftItem: number = splitter.listSplitterItems[splitter.currentSeparotorIndex].ratioSize - percentageOfsset;
            let ratioSizeRightItem: number = splitter.listSplitterItems[splitter.currentSeparotorIndex + 1].ratioSize + percentageOfsset;


            if (percentageOfsset > 0) {
                if (splitter.orientation === "horizontal") {
                    const clientRect: DOMRect = separatorRef.current.getBoundingClientRect();
                    const centralSeparatorPoint: number = clientRect.x + (clientRect.width / 2)
                    if (centralSeparatorPoint < event.clientX) {
                        splitter.seavedPointCurrentSeparator = actualseparatorPoint;
                        return;
                    }
                } else {
                    const clientRect: DOMRect = separatorRef.current.getBoundingClientRect();
                    const centralSeparatorPoint: number = clientRect.y + (clientRect.height / 2)
                    if (centralSeparatorPoint < event.clientY) {
                        splitter.seavedPointCurrentSeparator = actualseparatorPoint;
                        return;
                    }
                }

                const minRatioSizeLeftItem = splitter.listSplitterItems[splitter.currentSeparotorIndex].minSize / (size / 100) / 100;
                if (ratioSizeLeftItem < minRatioSizeLeftItem) {
                    splitter.listSplitterItems[splitter.currentSeparotorIndex].ratioSize -= (Math.abs(percentageOfsset) - (minRatioSizeLeftItem - ratioSizeLeftItem));
                    splitter.listSplitterItems[splitter.currentSeparotorIndex + 1].ratioSize += (Math.abs(percentageOfsset) - (minRatioSizeLeftItem - ratioSizeLeftItem));
                } else {
                    splitter.listSplitterItems[splitter.currentSeparotorIndex].ratioSize -= percentageOfsset;
                    splitter.listSplitterItems[splitter.currentSeparotorIndex + 1].ratioSize += percentageOfsset;
                }
            } else {
                if (splitter.orientation === "horizontal") {
                    const clientRect: DOMRect = separatorRef.current.getBoundingClientRect();
                    const centralSeparatorPoint: number = clientRect.x + (clientRect.width / 2)
                    if (centralSeparatorPoint > event.clientX) {
                        splitter.seavedPointCurrentSeparator = actualseparatorPoint;
                        return;
                    }
                } else {
                    const clientRect: DOMRect = separatorRef.current.getBoundingClientRect();
                    const centralSeparatorPoint: number = clientRect.y + (clientRect.height / 2)
                    if (centralSeparatorPoint > event.clientY) {
                        splitter.seavedPointCurrentSeparator = actualseparatorPoint;
                        return;
                    }
                }

                const minRatioSizeRightItem = splitter.listSplitterItems[splitter.currentSeparotorIndex].minSize / (size / 100) / 100;
                if (ratioSizeRightItem < minRatioSizeRightItem) {
                    splitter.listSplitterItems[splitter.currentSeparotorIndex].ratioSize += (Math.abs(percentageOfsset) - (minRatioSizeRightItem - ratioSizeRightItem));
                    splitter.listSplitterItems[splitter.currentSeparotorIndex + 1].ratioSize -= (Math.abs(percentageOfsset) - (minRatioSizeRightItem - ratioSizeRightItem));
                } else {
                    splitter.listSplitterItems[splitter.currentSeparotorIndex].ratioSize -= percentageOfsset;
                    splitter.listSplitterItems[splitter.currentSeparotorIndex + 1].ratioSize += percentageOfsset;
                }
            }


            splitter.seavedPointCurrentSeparator = actualseparatorPoint;

        }
    };

    const onMouseDown = useCallback<React.MouseEventHandler<HTMLElement>>((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        splitter.setResizing(true);
        splitter.currentSeparotorIndex = indexSeparator;
        if (splitter.orientation === "horizontal") {
            splitter.seavedPointCurrentSeparator = event.clientX;
        } else {
            splitter.seavedPointCurrentSeparator = event.clientY;
        }
        const onMouseUp = (event: MouseEvent) => {
            splitter.setResizing(false);
            window.removeEventListener("mousemove", onResize);
            window.removeEventListener("mouseup", onMouseUp);
        }

        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("mousemove", onResize);
    }, [splitter]);

    const onMouseUp = useCallback(() => {
        splitter.setResizing(false);
    }, [splitter]);





    const inlineStyle: CSSProperties = {
        [splitter.orientation === "horizontal" ? "width" : "height"]: `${splitter.separatorSize}px`
    }
    console.log("separator");
    return (
        <section ref={separatorRef} onMouseDown={onMouseDown} onMouseUp={onMouseUp} className={className} style={inlineStyle} />
    )
}