import { createTheme } from "@acnb/core";
import { codeTrafficLight, codeHighlight, codeLinenumbers, tools } from "../src/index";
import "./index.scss"
import "../src/plugins/codeTrafficLight/index.scss";
import "../src/plugins/codeHighlight/index.scss";
import "../src/plugins/codeLinenumbers/index.scss";
import "../src/plugins/tools/index.scss"

const theme = createTheme();

theme
    .use(codeTrafficLight, { enable: true })
    .use(codeHighlight, { enable: true })
    .use(codeLinenumbers, { enable: true })
    .use(
        tools,
        { enable: true },
        {
            menuIconType: 'className',
            menuIcon: "fa-angle-up",
            menuActiveIcon: 'fa-angle-down',
            scrollContainer: 'html',
            toolbarItems: [
                {
                    icon: 'fa-rocket rocket-rotate',
                    iconType: 'className',
                },
                {
                    enable: true,
                    icon: 'fa-moon',
                    iconType: 'className',
                },
                {
                    icon: 'fa-thumbs-up',
                    iconType: 'className',
                },
                {
                    icon: 'fa-heart',
                    iconType: 'className',
                },
                {
                    icon: 'fa-star',
                    iconType: 'className',
                },
                {
                    icon: 'fa-comment-dots',
                    iconType: 'className',
                },
            ],
        }
    )
