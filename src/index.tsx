import './index.html';
import ReactDOM from 'react-dom';
import { SplitterView } from './components/splitter/splitter-view';
import React from 'react';
import { Splitter } from './components/splitter/splitter';
import "./styles.css";

const splitterModel: Splitter = new Splitter({proportions: [50, 50, 100, 100]});


ReactDOM.render(
    <SplitterView splitter={splitterModel}>
        <div style={{ display: "flex", width: "100%", height: "100%", backgroundColor: "red" }}>111</div>
        <div style={{ display: "flex", width: "100%", height: "100%", backgroundColor: "blue" }}>222</div>
        <div style={{ display: "flex", width: "100%", height: "100%", backgroundColor: "green" }}>333</div>
        <div style={{ display: "flex", width: "100%", height: "100%", backgroundColor: "yellow" }}>444</div>
    </SplitterView>,
    document.querySelector('#root'));