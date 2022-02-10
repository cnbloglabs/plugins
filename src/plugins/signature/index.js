// 个性签名
import { useSignatureOptions } from "@acnb/options";
import { loadScript } from "../../utils/helpers";
import { typedJs } from "../../constants/cdn";

/**
 * 构建容器
 * @param {*} selector
 */
function build(selector) {
  const el = `<div class='custom-signature'><span></span></div>`;
  $(selector).append(el);
}

/**
 * 构建打字机效果
 * @param {*} contents
 */
function typed(contents) {
  loadScript(typedJs, () => {
    new Typed(".custom-signature span", {
      strings: contents,
      typeSpeed: 70,
    });
  });
}

export const signature = (theme, devOptions, pluginOptions) => {
  const { enable, contents } = useSignatureOptions(devOptions);
  if (!enable) return;

  let pluginConfig = {
    selector: "#sidebar_news",
  };

  if (pluginOptions) {
    pluginConfig = Object.assign({}, pluginConfig, pluginOptions);
  }

  const { selector } = pluginConfig;

  build(selector);
  typed(contents);
};
