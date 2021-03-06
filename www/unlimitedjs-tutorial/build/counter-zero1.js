import { T, world } from "../../lib/timeline-monad/code/dist/timeline-monad.js";
import { h, patch } from "../../lib/superfine/src/index.js";
//============
const main = () => {
    const counterNodeTL = T(self => {
        const countTL = T(self => self.now = 0);
        const timeline = countTL.sync(count => self.now = (h("div", null,
            h("p", null,
                "You clicked ",
                count,
                " times"),
            h("button", { onclick: () => countTL.now = count + 1 }, "Click me"))));
        world.now = countTL;
    });
    const topNodeTL = counterNodeTL;
    const viewNodeTL = topNodeTL.sync(node => patch(document.getElementById("app"), node));
    world.now = counterNodeTL;
};
export { main };
