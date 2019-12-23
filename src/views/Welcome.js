import { useHistory } from "react-router-dom"
import * as React from 'react';
import subtitle from '../assets/images/welcome-subtitle.png';

export const Welcome = (props) => {
  const history = useHistory() 

  const toReady = () => {
    history.push('/ready')
  }
  return (
    <div style={styles.welcome} onDoubleClick={toReady}>
      <div style={styles.sup}></div>
      <div style={styles.sub}></div>
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
    width: '80vw',
    height: '15.99vw',
    background: 'url("http://cdn.bgwiki.cn//lottery/welcome-suptitle.png") no-repeat 100% / cover'
  },
  sub: {
    position: 'absolute',
    top: '59.77vh',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '50vw',
    height: '3.60vw',
    background: 'url(' + subtitle + ') no-repeat 100% / cover'
  }
}