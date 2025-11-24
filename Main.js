/** @jsx hs */
import { element, hs } from "./app.js";

function handleClick() {
    alert("Clicked");
}

let items = ['foo', 'bar', 'baz'];


element("div", null, "Hello!")

element("button", { onClick: handleClick }, "Click Me")
element("ul", null, items.map((item, i) => hs("li", { id: i }, item)))

element("div", null, hs('h1', null, 'Hello World'), hs('p', null, 'This is a paragraph'), hs('button', { onClick: handleClick }, 'Click Me'))





