import {nav} from "./nav";

const loadImage = () => import("./img");
import {button} from "./button";

document.body.appendChild(nav);
document.body.appendChild(button);
button.addEventListener('click', event => {
    loadImage().then(m =>
        document.body.appendChild(m.img)
)
    ;
});

