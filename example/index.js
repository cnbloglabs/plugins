import { createTheme } from "@acnb/core";
import { codeTrafficLight, codeHighlight, codeLinenumbers } from "../src/index";
import "../src/plugins/codeTrafficLight/index.scss";
import "../src/plugins/codeHighlight/index.scss";
import "../src/plugins/codeLinenumbers/index.scss";

const theme = createTheme();

theme
    .use(codeTrafficLight, { enable: true })
    .use(codeHighlight, { enable: true })
    .use(codeLinenumbers, { enable: true });
