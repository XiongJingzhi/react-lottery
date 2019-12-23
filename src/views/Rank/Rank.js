import React from 'react'
import { ws } from '../../utils/socketRequest'
import "./rank.scss"
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

const styleItem = (name, value, avatar) => {
  return {
    name: name,
    value: value,
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
              image: avatar 
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
    }
  }
}

export class Rank extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      remainingTime: 30,
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
        show: false
      },
      yAxis: {
        show: false
      },
      series: [
        {
          name: 'money',
          type: 'bar',
          barWidth: 70,
          itemStyle: {
            normal: {
              barBorderRadius: 35,
              color: '#D93030'
            }
          },
          data: []
        }
      ]
    }
    this.myChart = ''
    this.timer = ''
  }

  componentDidMount() {
    this.myChart = echarts.init(document.getElementById('main'))
    this.myChart.setOption(this.options)
    this.myChart.resize()
    this.timer = setInterval(() => {
      const queryData = JSON.stringify({
        act: 'dump'
      })
      if (ws.ws.readyState === 1) {
        ws.send(queryData)
      }
      this.setState({
        remainingTime: this.state.remainingTime - 1
      })
      if (this.state.remainingTime < 1) {
        clearInterval(this.timer)
      }
    }, 1000)
    ws.onmessage = (message) => {
      const data = JSON.parse(message.data)
      const users = data.data
      if (data.act === 'dump') {
        const rankArr = users.slice(0, 7).map(item => {
          return {
            name: item.userName,
            avatar: item.avatar,
            value: item.money
          }
        })
        const data = rankArr.sort((a, b) => b.value - a.value).map(item => {
          return styleItem(item.name, item.value, item.avatar)
        })
        this.options.series[0].data = data
        this.myChart.setOption(this.options)
        this.myChart.resize()
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
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
