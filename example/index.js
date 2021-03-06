import { createTheme } from "@acnb/core";
import "./index.scss";
import {
    codeTrafficLight,
    codeHighlight,
    codeLinenumbers,
    tools,
    darkMode,
    license,
    emoji
} from "../src/index";

const theme = createTheme();

theme
    .use(emoji, { enable: true })
    .use(license, { enable: true })
    .use(darkMode, { enable: true })
    .use(codeTrafficLight, { enable: true })
    .use(codeHighlight, { enable: true })
    .use(codeLinenumbers, { enable: true })
    .use(
        tools,
        { enable: true },
        {
            menuIconType: "className",
            menuIcon: "fa-angle-up",
            menuActiveIcon: "fa-angle-down",
            scrollContainer: "html",
            toolbarItems: [
                {
                    icon: "fa-rocket rocket-rotate",
                    iconType: "className",
                },
                {
                    enable: true,
                    icon: "fa-moon",
                    iconType: "className",
                },
                {
                    icon: "fa-thumbs-up",
                    iconType: "className",
                },
                {
                    icon: "fa-heart",
                    iconType: "className",
                },
                {
                    icon: "fa-star",
                    iconType: "className",
                },
                {
                    icon: "fa-comment-dots",
                    iconType: "className",
                },
            ],
        }
    );
