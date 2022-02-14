import { useToolsOptions } from "@acnb/options";
import toast from "../toast";
import { getCurrentPage, likePost } from "../../utils/cnblog";
import { isPhone } from "../../utils/helpers";
import { __DEV__ } from "../../constants/env";

/**
 * 滚动到评论输入框
 * @param {string} container
 */
function scrollToComment(container) {
    $(container).animate(
        {
            scrollTop: $("#mainContent")[0].scrollHeight,
        },
        300
    );
}

/**
 * 滚动到顶部
 * @param {string} container
 */
function scrollToTop(container) {
    $(container).animate(
        {
            scrollTop: 0,
        },
        200
    );
}

/**
 * 创建 toolbar 容器
 * @returns {object}
 */
function createToolbarContainer() {
    return $('<div class="custom-toolbar">');
}

/**
 * 创建按钮项中的图标
 * @returns {object}
 */
function createIcon(icon) {
    const $icon = $("<i>");
    icon.length > 2 ? $icon.addClass(icon) : $icon.html(icon);
    return $icon;
}

/**
 * 创建按钮项中的工具提示
 * @returns {object}
 */
function createTooltip(text, className) {
    const ele = $(`<div class="tooltip">${text}</div>`);
    if (className) {
        ele.addClass(className);
    }
    return ele;
}

/**
 * 创建 toggle 按钮
 * @param {string} menuIcon  icon
 * @returns {object}
 */
function createToggleItem(menuIcon) {
    const ele = $(`<div class="toolbar-item toolbar-item-toggle"></div>`);
    const icon = createIcon(menuIcon);
    const tooltip = createTooltip("展开", " tooltip-toggle");

    ele.append(icon);
    ele.append(tooltip);

    return ele;
}

/**
 * 创建 toolbar 按钮项
 * @param {object} item
 * @param {number} translateY
 * @param {object} config 合并后的配置对象
 * @returns {object} toolbar 按钮的 jq 对象
 */
function createToolbarItem(item, translateY, finalPluginOptions) {
    const { className, callback, icon, tooltip } = item;

    const $item = $(
        `<div class="toolbar-item" style="transform: translateY(-${translateY}px)">`
    );

    if (className) {
        $item.addClass(className);
    }

    $item.on("click", function (e) {
        callback(finalPluginOptions);
    });

    const $icon = createIcon(icon);
    const $tip = createTooltip(tooltip);

    $item.append($icon);
    $item.append($tip);

    return $item;
}

/**
 * 创建按钮插件
 * @param {Array<Object>} pluginOptions
 */
function createToolbar(finalPluginOptions) {
    const { toolbarItems, scrollContainer } = finalPluginOptions;
    const $toolbar = createToolbarContainer();
    const $toggleItem = createToggleItem(finalPluginOptions.menuIcon);

    const pageCondition = (page) => {
        return page === getCurrentPage() || page === "all";
    };

    let translateY = 0;

    toolbarItems.reverse().forEach((item) => {
        if (!item.enable) return;
        if (pageCondition(item.page)) {
            const $item = createToolbarItem(
                item,
                translateY,
                finalPluginOptions
            );
            translateY += 40;
            $toolbar.append($item);
        }
    });

    $toolbar.append($toggleItem);
    $("body").append($toolbar);
    $(".toolbar-item-toggle").click(handleToggle);
}

/**
 * 处理展开和收起
 */
function handleToggle() {
    $(".toolbar-item-toggle").toggleClass("extend");

    const transformed = (translateY) => {
        let _translateY = translateY;
        $(".toolbar-item:not(.toolbar-item-toggle)").each(function (
            index,
            item
        ) {
            $(item).css({
                transform: `translateY(${_translateY}px)`,
            });
            _translateY += translateY - 40;
        });
    };

    const toggleExtend = (isExtend) => {
        const text = isExtend ? "展开" : "收起";
        const translateY = isExtend ? 90 : -50;
        const getArrow = (isExtend) => {
            const arrow = isExtend ? "down" : "up";
            return arrow;
        };

        $(".toolbar-item-toggle")
            .find("i")
            .removeClass(`fa-angle-${getArrow(isExtend)}`)
            .addClass(`fa-angle-${getArrow(!isExtend)}`);

        $(".tooltip-toggle").text(text);
        transformed(translateY);
    };

    $(".toolbar-item-toggle").hasClass("extend")
        ? toggleExtend(false)
        : toggleExtend(true);
}

export const tools = (theme, devOptions, pluginOptions) => {
    const { enable, initialOpen } = useToolsOptions(devOptions);
    if (!enable) return;

    const pluginDefaultOptions = {
        scrollContainer: "html",
        menuIcon: "➕",
        toolbarItems: [
            {
                enable: true,
                page: "all",
                icon: "🚀",
                tooltip: "回顶",
                callback: (config) => scrollToTop(config.scrollContainer),
            },
            {
                enable: false,
                page: "all",
                icon: "🌜",
                tooltip: "深色",
                className: "mode-change",
                callback() {},
            },
            {
                enable: true,
                page: "post",
                icon: "👍",
                tooltip: "推荐",
                callback() {
                    toast("推荐成功");
                    likePost();
                },
            },
            {
                enable: true,
                page: "post",
                icon: "💗",
                tooltip: "关注",
                callback() {
                    toast("关注成功");
                    if (__DEV__) return;
                    window.follow();
                },
            },
            {
                enable: true,
                page: "post",
                icon: "📌",
                tooltip: "收藏",
                callback() {
                    if (__DEV__) return;
                    window.AddToWz();
                },
            },
            {
                enable: true,
                page: "post",
                icon: "💬",
                tooltip: "评论",
                callback: (config) => scrollToComment(config.scrollContainer),
            },
        ],
    };

    const finalPluginOptions = $.extend(
        true,
        pluginDefaultOptions,
        pluginOptions
    );

    createToolbar(finalPluginOptions);
    if (!isPhone() && initialOpen) handleToggle();
};
