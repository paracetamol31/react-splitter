import { CSSProperties, FC, useCallback, useRef } from "react";
import separatorStyle from "./separator.module.css";
import React from "react";
import { Splitter } from "../splitter/splitter";

export const SeparatorView: FC<{ splitter: Splitter, indexSeparator: number }> = ({ splitter, indexSeparator }) => {
    const className = `${separatorStyle.separator} ${separatorStyle[splitter.orientation]}`;
    const separatorRef = useRef<HTMLDivElement>(null);

    const onResize = useCallback((event: MouseEvent) => {
        event.preventDefault();
        splitter.onResize(event, separatorRef);
    }, [splitter]);

    const onMouseDown = useCallback<React.MouseEventHandler<HTMLElement>>((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.preventDefault();
        splitter.setResizing(true);
        splitter.currentSeparatorIndex = indexSeparator;
        if (splitter.orientation === "horizontal") {
            splitter.savedPointCurrentSeparator = event.clientX;
        } else {
            splitter.savedPointCurrentSeparator = event.clientY;
        }
        const onMouseUp = () => {
            splitter.setResizing(false);
            window.removeEventListener("mousemove", onResize);
            window.removeEventListener("mouseup", onMouseUp);
        }

        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("mousemove", onResize);
    }, [indexSeparator, onResize, splitter]);

    const onMouseUp = useCallback(() => {
        splitter.setResizing(false);
    }, [splitter]);


    const inlineStyle: CSSProperties = {
        [splitter.orientation === "horizontal" ? "width" : "height"]: `${splitter.separatorSize}px`
    }
    return (
        <section ref={separatorRef} onMouseDown={onMouseDown} onMouseUp={onMouseUp} className={className} style={inlineStyle} />
    )
}