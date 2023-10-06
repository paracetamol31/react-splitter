import { CSSProperties, FC, useCallback, useEffect, useRef } from "react";
import splitterStyles from "./splitter.module.css";
import { Splitter } from "./splitter";
import React from "react";
import { SplitterItemView } from "../splitter-item/splitter-item-view";
import { SeparatorView } from "../separator/separator-view";
import { SplitterItem } from "../splitter-item/splitter-item";
import { Separator } from "../separator/separator";
import { observer } from "mobx-react";
import { TChildrenJSXElement } from "../types";

const listSplitterItems: Array<SplitterItem> = [];
const content: Array<string | JSX.Element> = [];

export const SplitterView: FC<{ splitter: Splitter, children: TChildrenJSXElement }> = observer(({ splitter, children }) => {
    const splitterRef = useRef<HTMLDivElement>(null);

    const onResize = useCallback(() => {
        if (splitter.isResizing) {
            console.log("1111111111")
        }
    }, [splitter.isResizing]);

    useEffect(() => {
        let listChildWidget: Array<string | JSX.Element | JSX.Element[]> = [];

        if (Array.isArray(children)) {
            listChildWidget = children;
        } else {
            listChildWidget = [children]
        }

        let prevSplitterItem: SplitterItem | null = null;

        listChildWidget.forEach((child, index) => {
            let offset: number = splitter.separatorSize;
            if (index === 0 || index === listChildWidget.length - 1) {
                offset = offset / 2;
            }
            const splitterItem: SplitterItem = new SplitterItem({ offset: offset });
            listSplitterItems.push(splitterItem);
            if (index !== 0) {
                content.push(<SeparatorView separator={new Separator({
                    firstSplitterItem: prevSplitterItem,
                    secondSplitterItem: splitterItem,
                    setResizing: splitter.setResizing
                })} />)
            }
            content.push(
                <SplitterItemView {...splitterItem}>{child}</SplitterItemView>
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
                onMouseOver={onResize}
            >
                {content}
            </section>
            : null
    );
});