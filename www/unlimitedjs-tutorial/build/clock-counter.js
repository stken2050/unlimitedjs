import { T, world } from "../../lib/timeline-monad/code/dist/timeline-monad.js";
import { h, patch } from "../../lib/superfine/src/index.js";
//============
const main = () => {
    const clockNodeTL = T(self => {
        const clockTL = T(self => {
            const f = () => self.now = new Date().toLocaleTimeString();
            setInterval(f, 1000);
        });
        const timeline = clockTL.sync(clock => self.now = h("div", null, clock));
        world.now = clockTL;
    });
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
    const mergeTL = (TLs => T(self => TLs.map(TL => TL.sync(() => self.now = TLs.map(TL => TL.now)))))([clockNodeTL, counterNodeTL]);
    const topNodeTL = T(self => mergeTL.sync(([clockNode, counterNode]) => self.now = h("div", null,
        h("h3", null, clockNode),
        counterNode)));
    const viewNodeTL = topNodeTL.sync(node => patch(document.getElementById("app"), node));
    world.now = topNodeTL;
    world.now = mergeTL;
    world.now = clockNodeTL;
    world.now = counterNodeTL;
};
export { main };
