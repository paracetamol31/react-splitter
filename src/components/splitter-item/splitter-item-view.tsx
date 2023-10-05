import { FC } from "react";
import splitterItemStyle from "./splitter-item.module.css";
import React from "react";
import { SplitterItem } from "./splitter-item";

export const SplitterItemView: FC<SplitterItem> = (splitterItem) => {
    return (
        <section
            className={splitterItemStyle.splitterItem}
            style={{
                width: "100%",
                height: "100%"
            }}
        >
            {splitterItem.children}
        </section>
    );
}