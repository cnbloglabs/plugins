import { useNotationOptions } from '@acnb/options';
import { loadScript } from '../../utils/helpers';
import { getCurrentPage } from '../../utils/cnblog';
import { notationJs } from '../../constants/cdn';

const annotateList = [
  {
    page: 'all',
    selector: '#Header1_HeaderTitle',
    config: {
      type: 'underline',
      color: '#2196F3',
    },
  },
];

/**
 * 构建 annotate group
 * @param {*} annotate
 * @param {*} customList
 */
const buildGroup = (annotate, customList) => {
  const group = [];
  for (const { selector, page, config } of customList) {
    if (page === 'all' || getCurrentPage() === page) {
      const element = document.querySelectorAll(selector);
      if (!element.length) {
        continue;
      }
      if (element.length === 1) {
        group.push(annotate(document.querySelector(selector), config));
      }
      if (element.length > 1) {
        element.forEach((item) => {
          group.push(annotate(item, config));
        });
      }
    }
  }
  return group;
};

/**
 * 构建 notation
 * @param {*} annotate
 * @param {*} annotationGroup
 * @param {*} customList
 */
const buildNotation = (annotate, annotationGroup, customList) => {
  setTimeout(() => {
    const group = buildGroup(annotate, customList);
    const ag = annotationGroup(group);
    ag.show();
  }, 2000);
};

export const notation = (theme, devOptions, customList = annotateList) => {
  if (getCurrentPage() !== 'post') {
    return;
  }
  const { enable } = useNotationOptions(devOptions);
  if (!enable) {
    return;
  }
  if (!customList.length) {
    return;
  }

  loadScript(notationJs, () => {
    const { annotate, annotationGroup } = window.RoughNotation;
    buildNotation(annotate, annotationGroup, customList);
  });
};
