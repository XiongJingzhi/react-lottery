import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import countdownTitle from '../assets/images/countdown-title.png'
import countdown from '../assets/images/countdown.png'
// import countdown5 from '../assets/images/countdown5.png'
// import countdown4 from '../assets/images/countdown4.png'
// import countdown3 from '../assets/images/countdown3.png'
// import countdown2 from '../assets/images/countdown2.png'
// import countdown1 from '../assets/images/countdown1.png'

export const Countdown = (props) => {
  const [img, setImg] = useState(countdown)
  // const count = () => {
    // setInterval(() => {
      // setImg
    // })
  // }
  const history = useHistory() 

  const toRank = () => {
    history.push('/rank')
  }

  return (
    <div style={styles.welcome} onDoubleClick={toRank}>
      <div style={styles.sup}></div>
      <img src={countdown} alt="倒计时" style={styles.sub} />
    </div>
  )
}

const styles = {
  welcome : {
    height: '100vh',
    width: '100vw',
    position: 'relative'
  },
  sup: {
    position: 'absolute',
    top: '19.21vh',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '43.33vw',
    height: '5.208vw',
    background: 'url(' + countdownTitle + ') no-repeat 100% / cover'
  },
  sub: {
    position: 'absolute',
    top: '41.9423vh',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '40.833vw',
    height: '7.86458vw',
  }
}