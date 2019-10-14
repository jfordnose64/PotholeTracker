import React, { Component } from 'react'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap'
import './input.css'
import Axios from 'axios'

export class UserLocation extends Component {
  state = {
    userLocation: {
      lat: 27.8036247,
      long: -82.7163272
    },
    address: '123'
  }

  componentDidMount() {
    this.setLocationState()
    console.log(this.state.userLocation.lat)
  }

  convertLatLong = async () => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.userLocation.lat},${this.state.userLocation.long}&key=AIzaSyCqif8ZjnUKRfHM9S36U5ZnzkCDqbpVzFI`
    const resp = await Axios.get(url)
    this.setState({
      address: resp.data.results[2].formatted_address
    })
    // console.log(resp.data)
  }

  setLocationState = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let setUserLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      }
      this.setState({
        userLocation: setUserLocation
      })
      this.convertLatLong()
    })
  }
  render() {
    return (
      // <div>
      //   <h3>Your Location</h3>
      //   <p>Latitude: {this.state.userLocation.lat}</p>
      //   <p>Longitude: {this.state.userLocation.long}</p>
      // </div>
      <Card className="card">
        <CardTitle>
          <h3>Your Location</h3>
        </CardTitle>
        <CardText>Latitude: {this.state.userLocation.lat}</CardText>
        <CardText>Longitude: {this.state.userLocation.long}</CardText>
        <CardText>Address: {this.state.address}</CardText>
      </Card>
    )
  }
}

export default UserLocation
