/** @jsx hs */
import { app, hs , useState} from "./index.js";
import { helloWorld } from "./components/button.js";


function handleClick() {
    alert("Clicked");
}
function Counter(){
    const [count, setCount] = useState
}


app("div", null,
    hs("div",
        {
            class: "header"
        },
        hs(
            "h1",
            null,
            "Hello!"
        ),
        hs('h3', null, "Welcome to FeatherJSX"),
    ),
    hs("div",
        { class: "info-section" },
        hs('div',
            { class: "btn-wrapper" },
            hs('button', { onClick: handleClick }, 'Click Me'),
            helloWorld(),
        ),
        hs('p', {style:{color:'red',marginTop:'50px'}}, 'This is a paragraph'),

    )
)




