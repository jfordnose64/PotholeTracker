import React, { Component } from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Footer from './Footer'
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl'
import Axios from 'axios'
import './map.css'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap'
import { FaMapMarkerAlt, FaGenderless } from 'react-icons/fa'

const TOKEN =
  'pk.eyJ1IjoiamZvcmQwMCIsImEiOiJjazBwYXlyajUwM3hvM2ltdmNweWIwbHc0In0.edXl14jNwhLjY1c-nasHag'

class AllPotholes extends Component {
  state = {
    markers: [
      { title: 'something 1', latitude: 27.87094, longitude: -82.76351, id: 1 }
    ]
  }

  fetchData = async () => {
    const resp = await Axios('https://localhost:5001/api/Pothole')
    console.log(resp.data)
    this.setState({
      markers: resp.data
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    const TOKEN =
      'pk.eyJ1IjoiamZvcmQwMCIsImEiOiJjazBwYXlyajUwM3hvM2ltdmNweWIwbHc0In0.edXl14jNwhLjY1c-nasHag'
    return (
      <div>
        <Header />
        {this.state.markers.length && (
          <section className="map-mapped">
            {this.state.markers
              .filter((f, i) => i < 10)
              .map(marker => {
                return (
                  <div className="mapped">
                    <Card className="map-card">
                      <ReactMapGL
                        mapStyle="mapbox://styles/mapbox/satellite-v9"
                        mapboxApiAccessToken={TOKEN}
                        width={400}
                        height={400}
                        latitude={marker.latitude}
                        longitude={marker.longitude}
                        zoom={15}
                      >
                        <Marker
                          key={marker.id}
                          latitude={marker.latitude}
                          longitude={marker.longitude}
                          className="map"
                        >
                          <FaMapMarkerAlt className="map-marker" />
                        </Marker>
                      </ReactMapGL>
                      <CardText className="lat-map">
                        Latitude: {marker.latitude}
                      </CardText>
                      <CardText>Longitude: {marker.longitude}</CardText>
                      <Link to={`/Pothole/${marker.id}`}>
                        <button>More Info</button>
                      </Link>
                    </Card>
                  </div>
                )
              })}
          </section>
        )}
        <Footer />
      </div>
    )
  }
}

export default AllPotholes
