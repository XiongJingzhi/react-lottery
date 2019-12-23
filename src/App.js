import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import './App.css'
import { Welcome } from './views/Welcome'
import { Ready } from './views/Ready/Ready'
import { Countdown } from './views/Countdown/Countdown'
import { Rank } from './views/Rank/Rank'
import { Result } from './views/Result/Result'

const App = () => {
  return (
    <Router>
      <div className="App" style={styles.appStyle}>
        <Switch>
          <Route component={Welcome} path="/welcome" exact />
          <Route component={Ready} path="/ready" exact />
          <Route component={Countdown} path="/countdown" exact />
          <Route component={Rank} path="/rank" exact />
          <Route component={Result} path="/result" exact />
          <Route component={Welcome} path="/" exact />
        </Switch>
      </div>
    </Router>
  )
}

const styles = {
  appStyle: {
    background: `url(http://cdn.bgwiki.cn/lottery/background.png) no-repeat 100% / cover`,
    height: '100vh',
    width: '100vw'
  }
}

export default App
