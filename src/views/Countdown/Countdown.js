import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ws } from '../../utils/socketRequest'
import './countdown.scss'
import countdown from '../../assets/images/countdown.png'
import countdown5 from '../../assets/images/countdown5.png'
import countdown4 from '../../assets/images/countdown4.png'
import countdown3 from '../../assets/images/countdown3.png'
import countdown2 from '../../assets/images/countdown2.png'
import countdown1 from '../../assets/images/countdown1.png'

const countdowns = [countdown1, countdown2, countdown3, countdown4, countdown5]

export const Countdown = (props) => {
  const [img, setImg] = useState(countdown)
  const [style, setStyle] = useState()
  const history = useHistory() 

  const downCountClick = () => {
    let time = 5
    const timer = setInterval(() => {
      if (time < 1) {
        clearInterval(timer)
        return toRank()
      }
      if (time === 5) {
        const startData = JSON.stringify({
          act: 'ready4start'
        })
        if (ws.ws.readyState === 1) {
          ws.send(startData)
        }
        setStyle({
          width: '15.833vw',
          height: 'auto'
        })
      }
      setImg(countdowns[time - 1])
      time = time - 1
    }, 1000)
  }

  const toRank = () => {
    history.push('/rank')
  }

  return (
    <div className="countdown-welcome" onDoubleClick={downCountClick}>
      <div className="countdown-sup"></div>
      <img src={img} alt="倒计时" style={style} className="countdown-sub" />
    </div>
  )
}

