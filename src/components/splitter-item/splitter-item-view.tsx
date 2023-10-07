import { CSSProperties, FC } from "react";
import splitterItemStyle from "./splitter-item.module.css";
import React from "react";
import { SplitterItem } from "./splitter-item";
import { TChildrenJSXElement } from "../splitter/types";
import { observer } from "mobx-react";

export const SplitterItemView: FC<{ splitterItem: SplitterItem, children: TChildrenJSXElement }> = observer(({ splitterItem, children }) => {
    let style: CSSProperties = {};
    if (splitterItem.splitter.orientation === "horizontal") {
        style = {
            height: "100%",
            width: `calc(${100 * splitterItem.ratioSize}% - ${splitterItem.offset}px)`
        }
    } else {
        style = {
            width: "100%",
            height: `calc(${100 * splitterItem.ratioSize}% - ${splitterItem.offset}px)`
        }
    }
    console.log("splitter-item");
    
    return (
        <section
            className={splitterItemStyle.splitterItem}
            style={style}
        >
            {children}
        </section>
    );
});