/** @jsx hs */
import { element, hs } from "./index.js";

function handleClick() {
    alert("Clicked");
}



element("div",
    {
        class: "header"
    },
    hs(
        "h1",
        null,
        "Hello!"
    ),
    hs('h3',null,"Welcome to FeatherJSX"),
)



element("div",
    {class:"info-section"},
    hs('div',
        {class:"btn-wrapper"},
        hs('button', { onClick: handleClick }, 'Click Me'),
        hs('button', null, 'Hello World'),
        ),
    hs('p', null, 'This is a paragraph'),
  
)





