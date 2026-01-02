/** @jsx hs */
import {  hs } from "../index.js";

export function helloWorld() {
    function handleClick() {
    alert("Hello World!");
}

    return hs('button', {onClick:handleClick}, 'Hello World')
}
