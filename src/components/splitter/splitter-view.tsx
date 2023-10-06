import { CSSProperties, Children, FC, useCallback, useRef } from "react";
import splitterStyles from "./splitter.module.css";
import { Splitter } from "./splitter";
import React from "react";
import { SplitterItemView } from "../splitter-item/splitter-item-view";
import { SeparatorView } from "../separator/separator-view";
import { SplitterItem } from "../splitter-item/splitter-item";
import { Separator } from "../separator/separator";

export const SplitterView: FC<Splitter> = (splitter) => {
    const splitterRef = useRef<HTMLDivElement>(null);
    let listChildWidget: Array<string | JSX.Element | JSX.Element[]> = [];

    if (Array.isArray(splitter.children)) {
        listChildWidget = splitter.children;
    } else {
        listChildWidget = [splitter.children]
    }

    const onResize = useCallback(() => {

    }, []);

    const listSplitterItems: Array<SplitterItem> = [];

    const className = `${splitterStyles.separator} ${splitter.orientation}`;

    const inlineStyle: CSSProperties = {
        display: "flex",
        flexDirection: splitter.orientation === "horizontal" ? "row" : "column"
    }

    const content: Array<string | JSX.Element> = [];

    let prevSplitterItem: SplitterItem | null = null;

    listChildWidget.map((child, index) => {
        let offset: number = splitter.separatorSize;
        if (index === 0 || index === length - 1) {
            offset = offset / 2;
        }
        const splitterItem: SplitterItem = new SplitterItem({ offset: offset });
        listSplitterItems.push(splitterItem);
        if (index !== 0) {
            content.push(<SeparatorView {...new Separator({
                firstSplitterItem: prevSplitterItem,
                secondSplitterItem: splitterItem
            })} />)
        }
        content.push(
            <SplitterItemView {...splitterItem}>{child}</SplitterItemView>
        );
    })

    return (
        <section
            className={`${splitterStyles.splitter} ${className}`}
            style={inlineStyle}
            ref={splitterRef}
        >
            {content}
        </section>
    );
}