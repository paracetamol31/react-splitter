import { CSSProperties, FC, MouseEventHandler, useCallback, useEffect, useRef } from "react";
import splitterStyles from "./splitter.module.css";
import { Splitter } from "./splitter";
import React from "react";
import { SplitterItemView } from "../splitter-item/splitter-item-view";
import { SeparatorView } from "../separator/separator-view";
import { SplitterItem } from "../splitter-item/splitter-item";
import { observer } from "mobx-react";
import { TChildrenJSXElement } from "./types";

const content: Array<string | JSX.Element> = [];

export const SplitterView: FC<{ splitter: Splitter, children: TChildrenJSXElement }> = observer(({ splitter, children }) => {
    const splitterRef = useRef<HTMLDivElement>(null);

    const onResize = useCallback<MouseEventHandler<HTMLElement>>((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (splitter.isResizing && splitter.seavedPointCurrentSeparator !== null && splitterRef.current && splitter.currentSeparotorIndex !== null) {
            let actualseparatorPoint: number = 0;
            if (splitter.orientation === "horizontal") {
                actualseparatorPoint = event.clientX;
            } else {
                actualseparatorPoint = event.clientY;
            }

            let size: number;
            if (splitter.orientation === "horizontal") {
                size = splitterRef.current.clientWidth;
            } else {
                size = splitterRef.current.clientHeight;
            }
            
            const ofsset: number = splitter.seavedPointCurrentSeparator - actualseparatorPoint;
            let percentageOfsset: number = ofsset / (size / 100) / 100;

            splitter.listSplitterItems[splitter.currentSeparotorIndex].ratioSize -= percentageOfsset;
            splitter.listSplitterItems[splitter.currentSeparotorIndex + 1].ratioSize += percentageOfsset;

            console.log(splitter.seavedPointCurrentSeparator - actualseparatorPoint);

            splitter.seavedPointCurrentSeparator = actualseparatorPoint;
            event.preventDefault();
        }
    }, [splitter.isResizing]);

    useEffect(() => {
        let listChildWidget: Array<string | JSX.Element | JSX.Element[]> = [];

        // let size: number;
        // if (splitter.orientation === "horizontal") {
        //     size = splitterRef.current.clientWidth;
        // } else {
        //     size = splitterRef.current.clientHeight;
        // }

        if (Array.isArray(children)) {
            listChildWidget = children;
        } else {
            listChildWidget = [children];
        }

        let sumProportions: number = listChildWidget.length;
        const isValidProportions: boolean = listChildWidget.length === splitter.proportions.length;
        if (isValidProportions) {
            sumProportions = splitter.proportions.reduce((sum, item) => sum + item, 0);
        }

        listChildWidget.forEach((child, index) => {
            let proportion = 1;
            if (isValidProportions) {
                proportion = splitter.proportions[index];
            }

            let offset: number = splitter.separatorSize;
            if (index === 0 || index === listChildWidget.length - 1) {
                offset = offset / 2;
            }
            debugger
            const ratioSize: number = (proportion / (sumProportions / 100)) / 100;

            const splitterItem: SplitterItem = new SplitterItem({ offset: offset, splitter: splitter, ratioSize: ratioSize });
            splitter.listSplitterItems.push(splitterItem);
            if (index !== 0) {
                content.push(<SeparatorView splitter={splitter} indexSeparator={index - 1} />);
            }
            content.push(
                <SplitterItemView splitterItem={splitterItem}>{child}</SplitterItemView>
            );
        })
        splitter.setInit(true);

    }, [children, splitter, splitter.separatorSize, splitter.setResizing]);

    const className = `${splitterStyles.separator} ${splitter.orientation}`;
    const inlineStyle: CSSProperties = {
        display: "flex",
        flexDirection: splitter.orientation === "horizontal" ? "row" : "column"
    }

    return (
        splitter.isInit
            ? <section
                className={`${splitterStyles.splitter} ${className}`}
                style={inlineStyle}
                ref={splitterRef}
                onMouseMove={onResize}
            >
                {content}
            </section>
            : null
    );
});