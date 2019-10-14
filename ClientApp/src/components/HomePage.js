import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import Map from './Map'
import './map.css'

class HomePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <section className="home-title">
          <h1>Welcome to the Pothole Tracker!</h1>
        </section>
        <article className="map">
          <Map />
        </article>
        <Footer />
      </div>
    )
  }
}

export default HomePage
