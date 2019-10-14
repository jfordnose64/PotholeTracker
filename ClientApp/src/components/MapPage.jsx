import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import Map from './Map'
import InputField from './InputField'
import UserLocation from './UserLocation'

class HomePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <section>
          <Map />
          <article>
            <InputField />
            <UserLocation />
          </article>
        </section>
        <Footer />
      </div>
    )
  }
}

export default HomePage
