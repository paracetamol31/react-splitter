import { FC, useEffect, useRef } from "react";
import splitterStyles from "./splitter.module.css";
import { Splitter } from "./splitter";
import React from "react";
import { SplitterItemView } from "../splitter-item/splitter-item-view";
import { SeparatorView } from "../separator/separator-view";
import { SplitterItem } from "../splitter-item/splitter-item";
import { observer } from "mobx-react";
import { TChildrenJSXElement } from "./types";

export const SplitterView: FC<{ splitter: Splitter, children: TChildrenJSXElement }> = observer(({ splitter, children }) => {
    const splitterRef = useRef<HTMLDivElement>(null);
    splitter.splitterRef = splitterRef;
    const content = useRef<Array<string | JSX.Element>>([]);
    useEffect(() => {
        let listChildWidget: Array<string | JSX.Element | JSX.Element[]> = [];

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
                content.current.push(<SeparatorView splitter={splitter} indexSeparator={index - 1} />);
            }
            content.current.push(
                <SplitterItemView splitterItem={splitterItem}>{child}</SplitterItemView>
            );
        })
        splitter.setInit(true);

    }, [children, splitter, splitter.separatorSize, splitter.setResizing]);

    const cursorStyle = splitter.isResizing ? splitterStyles.resizing : "";

    const className = `${splitterStyles.splitter} ${splitterStyles[splitter.orientation]} ${cursorStyle}`;

    return (
        <section
            className={`${className}`}
            onSelect={() => false}
            ref={splitterRef}
        >
            {splitter.isInit ? content.current : null}
        </section>

    );
});