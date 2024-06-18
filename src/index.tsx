import './index.html';
import ReactDOM from 'react-dom';
import { SplitterView } from './components/splitter/splitter-view';
import React from 'react';
import { Splitter } from './components/splitter/splitter';
import "./styles.css";

const splitterModel: Splitter = new Splitter({ proportions: [50, 50, 200, 100, 100] });
const splitterModel1: Splitter = new Splitter({ proportions: [50, 50, 200], orientation: "vertical" });

ReactDOM.render(
    <SplitterView splitter={splitterModel}>
        <div style={{ display: "flex", width: "100%", height: "100%", backgroundColor: "red" }}></div>
        <div style={{ display: "flex", width: "100%", height: "100%", backgroundColor: "blue" }}></div>
        <div style={{ display: "flex", width: "100%", height: "100%", backgroundColor: "green" }}></div>
        <div style={{ display: "flex", width: "100%", height: "100%", backgroundColor: "yellow" }}></div>
        <div style={{ display: "flex", width: "100%", height: "100%", backgroundColor: "pink" }}>
            <SplitterView splitter={splitterModel1}>
                <div style={{ display: "flex", width: "100%", height: "100%", backgroundColor: "red" }}></div>
                <div style={{ display: "flex", width: "100%", height: "100%", backgroundColor: "blue" }}></div>
                <div style={{ display: "flex", width: "100%", height: "100%", backgroundColor: "green" }}></div>
            </SplitterView>,
        </div>
    </SplitterView>,
    document.querySelector('#root'));