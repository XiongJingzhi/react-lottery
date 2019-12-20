import  React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import qrcpde from '../assets/images/qrcode.png'
import readyTitle from '../assets/images/ready-title.png'

const DisplayUser = ({avatar, name }) => {
  return (
    <div style={userStyle.displayUser}>
      <img style={userStyle.avatar} src={avatar} alt="头像"></img>
      <div style={userStyle.name}>{name}</div>
    </div>
  )
}
const userStyle = {
  displayUser: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    display: 'block',
    width: '2.6vw',
    height: '2.6vw',
    borderRadius: '50%',
    border: '2px solid #FFFFFF'
  },
  name: {
    fontSize: '1.40vw',
    color: '#FFFFFF',
    marginLeft: '1vw'
  }
}

const ScrollRow = ({height, rowData}) => {
  const [first, second] = rowData
  return (
    <div style={{display: 'flex', height: height, alignItems: 'center', justifyContent: 'space-between' }}>
      <DisplayUser avatar={first.avatar} name={first.name} />
      {
        second && <DisplayUser avatar={second.avatar} name={second.name} />
      }
    </div>
  )
}

function group(array, subGroupLength) {
  let index = 0
  const newArray = []
  while (index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength))
  }
  return newArray
}

let scrollInterval = ''
class ScrollArea extends React.Component {
  constructor(props) {
    super(props)
    this.totalHeight = props.totalHeight 
    this.state = {
      data: group(props.data, 2),
      animate: false,
      listMarginTop: 0 
    }
  }

  scrollUp = e =>{
    this.state.data.push(this.state.data[0])
    let height=document.querySelector("#scroll-list").querySelector("div").scrollHeight + 1
    console.log('height', height)
    this.setState({ 
      animate: true,
      listMarginTop: "-" + height + "px",
    })
    console.log('this', this.state)
    setTimeout(() => { 
      this.state.data.shift()
      this.setState({ 
        animate: false,
        listMarginTop: "0",
      })
      this.forceUpdate()
    }, 2000)
  }

  startScrollUp = e => {
    this.endScroll()
    this.scrollUp()
    scrollInterval = setInterval(this.scrollUp, 3000)
  }

  endScroll = e => {
    clearInterval(scrollInterval)
  }

  componentDidMount() {
    this.scrollUp()
  }

  render() {
    return ( 
      <div style={{height: this.totalHeight, overflow: 'hidden'}} >
        <div className={this.state.animate ? 'anim' : ''}  style={{marginTop:this.state.listMarginTop}} id="scroll-list">
          {
            this.state.data.map((item, i) => ( 
              <div className="row-conatiner" key={'row' + i}>
                <ScrollRow height="4vw" rowData={item} />
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export const Ready = (props) => {
  const [number, setNumber] = useState(0)
  const history = useHistory()
  const listData = [
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"},
    {avatar: "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg", name:"徐玲玉"}
  ]
  const sum = 38
  const toCountDown = () => {
    history.push('/countdown')
  }

  return (
    <div style={styles.ready} onDoubleClick={toCountDown} >
      <div style={styles.readyLeft}>
        <div style={styles.readyTitle}></div>
        <div style={styles.qrcode}></div>
      </div>
      <div style={styles.right}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1vw'}}>
          <div style={{color: '#FFD52C', fontSize: '1.56vw', fontWeight: 'bold'}}>抽大奖，等你来</div>
          <div style={{color: '#FFFFFF', fontSize: '1.56vw'}}>总人数：{number}/{sum}</div>
        </div>
        <div style={{width: '84%' }}>
          <ScrollArea data={listData} totalHeight="24vw" rowHeight="4.2vw"></ScrollArea>
        </div>
      </div>
    </div>
  )
}

const styles = {
  ready: {
    height: '100vh',
    width: '100vw',
    position: 'relative'
  },
  readyLeft: {
    position: 'absolute',
  },
  readyTitle: {
    position: 'absolute',
    top: '17.4vh',
    left: '12.29vw',
    width: '32.13541vw',
    height: '3.177vw',
    background: 'url(' + readyTitle + ') no-repeat 100% / cover'
  },
  qrcode: {
    position: 'absolute',
    top: '30.73vh',
    left: '7.916vw',
    width: '40.73vw',
    height: '24.1666vw',
    background: 'url(' + qrcpde + ') no-repeat 100% / cover'
  },
  right: {
    position: 'absolute',
    top: '18.396vh',
    right: '13.02vw',
    width: '32vw'
  }
}