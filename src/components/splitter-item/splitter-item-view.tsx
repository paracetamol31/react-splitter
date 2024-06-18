import { CSSProperties, FC } from "react";
import splitterItemStyle from "./splitter-item.module.css";
import React from "react";
import { SplitterItem } from "./splitter-item";
import { TChildrenJSXElement } from "../splitter/types";
import { observer } from "mobx-react";

export const SplitterItemView: FC<{ splitterItem: SplitterItem, children: TChildrenJSXElement }> = observer(({ splitterItem, children }) => {
    let style: CSSProperties = {};
    let size: number | null = null;
    if (splitterItem.splitter.orientation === "horizontal") {
        size = splitterItem.splitter.splitterRef?.current?.clientWidth ?? null;
    } else {
        size = splitterItem.splitter.splitterRef?.current?.clientHeight ?? null;
    }

    if (size === null) {
        return null
    }
    let separatorSize: number = Number((splitterItem.splitter.separatorSize / (size / 100) / 100).toFixed(4));

    if (splitterItem.splitter.orientation === "horizontal") {
        style = {
            height: "100%",
            width: `${(100 * splitterItem.ratioSize) - separatorSize}%`
        }
    } else {
        style = {
            width: "100%",
            height: `${(100 * splitterItem.ratioSize) - separatorSize}%`
        }
    }
    console.log("splitter-item", splitterItem.splitter.listSplitterItems.findIndex(item => item === splitterItem));

    return (
        <section
            className={splitterItemStyle.splitterItem}
            style={style}
        >
            {children}
        </section>
    );
});