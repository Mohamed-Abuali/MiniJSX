/** @jsx hs */
import { app, hs , useState} from "./index.js";
import { helloWorld } from "./components/button.js";


function handleClick() {
    alert("Clicked");
}
function Counter(){
    const [count, setCount] = useState(0)
    return hs('div',{ class:"container"},
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
    ),
        hs("h1",{class:"counter"},count),
        hs('div',{class:'btn-wrapper'},
            hs('button',{onClick: () => setCount(count + 1)} , '+'),
            hs('button',{onClick:() => setCount(count - 1)}, '-')
        )
    )
}

app(Counter)




