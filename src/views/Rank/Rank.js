import React from 'react'
import "./rank.scss"
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export class Rank extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      remainingTime: 120,
    }
    this.options = {
      grid: {
        left: 0,
        right: 0,
        bottom: 40,
        top: 0,
        containLabel: true
      },
      xAxis: {
        show: false,
        data: ['张三', '张三', '张三', '张三', '张三', '张三', '张三']
      },
      yAxis: {
        show: false
      },
      series: [{
        name: '销量',
        type: 'bar',
        barWidth: 70,
        itemStyle: {
          normal: {
            barBorderRadius: 35,
            color: '#D93030'
          }
        },
        label: {
          normal: {
            show: true,
            position: 'top',
            distance: 20,
            formatter: '{a|a\n}{b|{b}\n}{c|{c}}',
            rich: {
              a: {
                width: 46,
                height: 46,
                fontSize: 0,
                align: 'center',
                backgroundColor: {
                  image: 'https://is3-ssl.mzstatic.com/image/thumb/Purple118/v4/a5/79/8b/a5798b6e-d959-6602-e0ec-ae63785da97f/AppIcon-0-1x_U007emarketing-0-0-85-220-0-7.png/246x0w.png'
                },
                borderRadius: 23,
                borderWidth: 2,
                borderColor: '#D93030',
                lineHeight: 60
              },
              b: {
                height: 27,
                align: 'center',
                color: '#000000',
                fontSize: 27,
                lineHeight: 50
              },
              c: {
                height: 22,
                align: 'center',
                color: '#FFD200',
                fontSize: 24,
                fontWeight: 'bold'
              }
            }
          }
        },
        data: [1001, 800, 700, 600, 500, 400, 300]
      }]
    }
    this.myChart = ''
  }

  mockData = () => {
    const mockItem = () => {
      const item = {
        value: []
      } 
      for (let i = 0; i < 38; i++) {
        item.value.push({
          id: i,
          label: "test" + (i + 1),
          value: i * 100 + (10 * Math.random()).toFixed(0)
        })
      }
      return item
    }
    this.setState((state, props) => ({
      data: this.state.data.concat(mockItem())
    }))
  }

  componentDidMount() {
    this.myChart = echarts.init(document.getElementById('main'))
    this.myChart.setOption(this.options)
    this.myChart.resize()
  }

  toResult = () => {
    this.props.history.push('/result')
  }

  render() {
    return (
      <div className="rank-container"  onDoubleClick={this.toResult}>
        <div className="rank-title">距离结束剩余时间{this.state.remainingTime}秒,加油呀！</div>
        <div id="main" className="main"></div>
      </div>
    )
  } 
}
