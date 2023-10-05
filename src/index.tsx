import './index.html';
import './style.scss';
import code  from "./img/img1.jpg";
import { App } from './App';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

ReactDOM.render(<App />, document.querySelector('#root'));

const imgWrap = document.querySelector('.img');
const img = new Image();
img.src = code;
img.width = 300;
imgWrap.append(img);

const mult = (a: number, b: number) => a + b;
console.log(mult(2, 3));