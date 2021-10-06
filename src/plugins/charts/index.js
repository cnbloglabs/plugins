import { defineOptions } from '@acnb/core'
import { loadScript } from '../../utils/helpers'

const chartJs = 'https://cdn.jsdelivr.net/npm/chart.js'

export const chartConfig = defineOptions('chart', {
  enable: false,
  labels: ['Vue', 'React', 'Flutter', 'Java', 'NodeJs', 'TypeScript', 'CSS'],
  datasets: [
    {
      label: 'My First Chart',
      data: [65, 59, 90, 81, 56, 55, 40],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'My Second Dataset',
      data: [28, 48, 40, 19, 96, 27, 100],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)',
    },
  ],
})

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
  const { enable, labels, datasets } = chartConfig(devOptions)
  if (!enable) return

  const { mountedNode } = Object.assign(
    {},
    {
      mountedNode: '#sidebar_news',
    },
    pluginOptions
  )

  loadScript(chartJs, () => {
    createChartContainer(mountedNode)
    createChart(labels, datasets)
  })
}
