import { CSSProperties, Children, FC } from "react";
import splitterStyles from "./splitter.module.css";
import { Splitter } from "./splitter";
import React from "react";
import { SplitterItemView } from "../splitter-item/splitter-item-view";
import { SeparatorView } from "../separator/separator-view";
import { SplitterItem } from "../splitter-item/splitter-item";
import { Separator } from "../separator/separator";

export const SplitterView: FC<Splitter> = (splitter) => {
    const className = `${splitterStyles.separator} ${splitter.orientation}`;

    const inlineStyle: CSSProperties = {
        display: "flex",
        flexDirection: splitter.orientation === "horizontal" ? "row" : "column"
    }

    const content: Array<string | JSX.Element> = [];

    if (Array.isArray(splitter.children)) {
        const length: number = splitter.children.length;
        splitter.children.map((child, index) => {
            content.push(
                <SplitterItemView {...new SplitterItem()}>{child}</SplitterItemView>
            );
            if (index !== length - 1) {
                content.push(<SeparatorView {...new Separator()} />)
            }
        })
    } else {
        content.push(splitter.children);
    }
    return (
        <section
            className={`${splitterStyles.splitter} ${className}`}
            style={inlineStyle}
        >
            {content}
        </section>
    );
}