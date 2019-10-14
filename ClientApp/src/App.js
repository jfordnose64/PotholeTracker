import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import MoreAddressInfo from './components/MoreAddressInfo'
import HomePage from './components/HomePage'
import MapPage from './components/MapPage'
import AllPotholes from './components/AllPotholes'

class App extends Component {
  render() {
    return (
      <Router>
        <section>
          <Switch>
            <Route
              exact
              path="/Pothole/:selectedAddress"
              component={MoreAddressInfo}
            />
            <Route exact path="/map" component={MapPage} />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/all" component={AllPotholes} />
          </Switch>
        </section>
      </Router>
    )
  }
}

export default App
