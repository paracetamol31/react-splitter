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

    useEffect(() => {
        let listChildWidget: Array<string | JSX.Element | JSX.Element[]> = [];

        splitter.splitterRef = splitterRef;

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

    console.log("splitter");
    return (
        splitter.isInit
            ? <section
                className={`${splitterStyles.splitter} ${className}`}
                style={inlineStyle}
                ref={splitterRef}
            >
                {content}
            </section>
            : null
    );
});