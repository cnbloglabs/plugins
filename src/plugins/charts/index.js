import { useChartsOptions } from '@acnb/options'
import { loadScript } from '../../utils/helpers'
import { chartJs } from '../../constants/cdn'
import { poll } from '../../utils/helpers'

/**
 * 构建图表容器
 */
function createChartContainer(mountedNode) {
    const container = $('<div id="chart"></div>')
    const el = '<canvas id="myChart"></canvas>'
    container.append(el)
    $(mountedNode).append(container)
}

function createChart(labels, datasets) {
    const _Chart = window.Chart

    _Chart.defaults.color = '#999'

    const config = {
        type: 'radar',
        data: {
            labels,
            datasets,
        },
        options: {
            elements: {
                line: {
                    borderWidth: 1,
                },
            },
            plugins: {
                // legend: {
                //     labels: {
                //         color: '#f00',
                //     },
                // },
            },
        },
    }
    new _Chart(document.getElementById('myChart'), config)
}

export const charts = (theme, devOptions, pluginOptions) => {
    const { enable, labels, datasets } = useChartsOptions(devOptions)
    if (!enable) return

    const { mountedNode } = Object.assign(
        {},
        {
            mountedNode: '#sidebar_news',
        },
        pluginOptions
    )

    loadScript(chartJs, () => {
        poll(
            () => $('#home #profile_block>a').length,
            () => {
                createChartContainer(mountedNode)
                createChart(labels, datasets)
            }
        )
    })
}
