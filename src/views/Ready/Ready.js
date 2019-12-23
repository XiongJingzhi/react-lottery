import  React, { useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import './ready.scss'
import { ws } from '../../utils/socketRequest'

const DisplayUser = ({avatar, name }) => {
  return (
    <div className="user-container">
      <img className="avatar" src={avatar} alt="头像"></img>
      <div className="name">{name}</div>
    </div>
  )
}


const ScrollRow = ({height, rowData}) => {
  const [first, second] = rowData
  return (
    <div className="ready-row" style={{height: height}}>
      <DisplayUser avatar={first.avatar} name={first.name} />
      {
        second && <DisplayUser avatar={second.avatar} name={second.name} />
      }
    </div>
  )
}

class ScrollArea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animate: false,
      moveTop: 0 
    }
  }

  scrollInterval = ''

  scrollUp = e =>{
    if (this.props.data.length === 0) {
      return
    }
    if (Number(this.props.totalHeight.slice(0, -2)) >= Number(this.props.rowHeight.slice(0, -2)) * this.props.data.length) {
      return
    }
    this.props.data.push(this.props.data[0])
    const element = document.querySelector('#scroll-list').querySelector('div')
    let height = element ? element.scrollHeight : 0
    this.setState({ 
      animate: true,
      moveTop: "-" + height + "px",
    })
    setTimeout(() => { 
      this.props.data.shift()
      this.setState({ 
        animate: false,
        moveTop: 0,
      })
      this.forceUpdate()
    }, 2000)
  }

  startScrollUp = e => {
    this.endScroll()
    this.scrollUp()
    this.scrollInterval = setInterval(this.scrollUp, 3000)
  }

  endScroll = e => {
    clearInterval(this.scrollInterval)
  }

  componentDidMount() {
    this.startScrollUp()
  }

  componentWillUnmount() {
    this.endScroll()
  } 

  render() {
    const { rowHeight, totalHeight, data} = this.props
    return (
      <div style={{height: totalHeight, overflow: 'hidden'}} >
        <div className={this.state.animate ? 'animate' : ''}  style={{transform: `translate3d(0, ${this.state.moveTop}, 0)`}} id="scroll-list">
          {
           data.map((item, i) => ( 
              <div className="row-conatiner" key={'row' + i}>
                <ScrollRow height={rowHeight} rowData={item} />
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

function group(array, subGroupLength) {
  let index = 0
  const newArray = []
  while (index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength))
  }
  return newArray
}

export const Ready = (props) => {
  const [number, setNumber] = useState(0)
  const [listData, setListData] = useState([])
  const history = useHistory()

  useEffect(() => {
    const timer = setInterval(() => {
      const queryData = JSON.stringify({
        act: 'dump'
      })
      if (ws.ws.readyState === 1) {
        ws.send(queryData)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  ws.onmessage = function(message) {
    const data = JSON.parse(message.data)
    if (data.act === 'dump') {
      setNumber(data.data.length)
      const list = data.data.map(item => {
        return {
          name: item.user_name,
          avatar: item.avatar
        }
      })
      setListData(group(list, 2))
    }
  }

  const toCountDown = () => {
    history.push('/countdown')
  }

  return (
    <div className="ready" onDoubleClick={toCountDown} >
      <div className="ready-left">
        <div className="ready-title"></div>
        <div className="qrcode"></div>
      </div>
      <div className="ready-right">
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1.5vw'}}>
          <div style={{color: '#FFD52C', fontSize: '30px', fontWeight: 'bold'}}>抽大奖，等你来</div>
          <div style={{color: '#FFFFFF', fontSize: '30px'}}>总人数：{number}</div>
        </div>
        <div style={{width: '84%' }}>
          <ScrollArea data={listData} totalHeight="24vw" rowHeight="4vw"></ScrollArea>
        </div>
      </div>
    </div>
  )
}
