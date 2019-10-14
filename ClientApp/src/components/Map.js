import React, { Component, setState } from 'react'
import { Link } from 'react-router-dom'
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl'
import Axios from 'axios'
import { FaMapMarkerAlt, FaGenderless } from 'react-icons/fa'
import { thisTypeAnnotation } from '@babel/types'
import './map.css'

const TOKEN =
  'pk.eyJ1IjoiamZvcmQwMCIsImEiOiJjazBwYXlyajUwM3hvM2ltdmNweWIwbHc0In0.edXl14jNwhLjY1c-nasHag'
const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
}

export class Map extends Component {
  state = {
    viewport: {
      latitude: 27.77,
      longitude: -82.7,
      zoom: 11.5,
      bearing: 0,
      pitch: 0,
      width: 800,
      height: 800
    },
    showPopUp: true,
    showMarker: false,
    event: {},
    markerDraggable: {
      latitude: 27.7,
      longitude: -82.777
    },
    userLocation: {
      lat: 12,
      long: 34
    },
    selectedAddress: null,
    addedMarker: null,
    markers: [
      { title: 'something 1', latitude: 27.87094, longitude: -82.76351, id: 1 }
    ]
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
    })
  }

  componentDidMount() {
    this.fetchData()
    this.setLocationState()
  }

  setSelectedAddress = object => {
    this.setState({
      selectedAddress: object
    })
  }
  setAddedMarker = object => {
    this.setState({
      addedMarker: object
    })
  }

  setMarker = event => {
    this.setState({
      showMarker: true,
      markerDraggable: {
        latitude: event.lngLat[1],
        longitude: event.lngLat[0]
      }
    })
    event.preventDefault()
    console.log(event.lngLat[1])
    console.log(event.lngLat[0])
    console.log('right clicked')
  }

  closePopup = () => {
    this.setState({
      selectedAddress: null,
      addedMarker: null
    })
  }

  addMarker = () => {
    console.log('clicked')
  }

  fetchData = async () => {
    const resp = await Axios('https://localhost:5001/api/Pothole')
    this.setState({
      markers: resp.data
    })
    console.log(resp.data)
  }
  postData = async () => {
    const resp = await Axios.post('https://localhost:5001/api/Pothole', {
      latitude: this.state.markerDraggable.latitude,
      longitude: this.state.markerDraggable.longitude
    })
    console.log('submitted')
  }
  refreshPage = () => {
    window.location.reload(false)
  }

  render() {
    const viewport = this.state.viewport
    return (
      <div className="map">
        <ReactMapGL
          {...viewport}
          onViewportChange={viewport => {
            this.setState({ viewport })
          }}
          mapStyle="mapbox://styles/mapbox/satellite-v9"
          mapboxApiAccessToken={TOKEN}
          onContextMenu={this.setMarker}
        >
          {this.state.markers.map(marker => {
            return (
              <Marker
                key={marker.id}
                latitude={marker.latitude}
                longitude={marker.longitude}
                className="map"
              >
                <FaMapMarkerAlt
                  className="map-marker"
                  onClick={() => {
                    this.setSelectedAddress(marker)
                  }}
                />
              </Marker>
            )
          })}
          {this.state.selectedAddress !== null ? (
            <Popup
              latitude={parseFloat(this.state.selectedAddress.latitude)}
              longitude={parseFloat(this.state.selectedAddress.longitude)}
              onClose={this.closePopup}
              onRequestClose={this.closePopup}
            >
              <article>
                <h5>
                  <p>Latitude:</p>
                  {this.state.selectedAddress.latitude}
                </h5>
                <h5>
                  <p>Longitude:</p>
                  {this.state.selectedAddress.longitude}
                </h5>
                <Link to={`/Pothole/${this.state.selectedAddress.id}`}>
                  <button>More Info</button>
                </Link>
              </article>
            </Popup>
          ) : null}
          <div className="nav" style={navStyle}>
            <NavigationControl />
            <Marker
              latitude={this.state.userLocation.lat}
              longitude={this.state.userLocation.long}
              offsetLeft={0}
              offsetTop={0}
            >
              <FaGenderless />
            </Marker>
            {this.state.showMarker === true ? (
              <Marker
                longitude={this.state.markerDraggable.longitude}
                latitude={this.state.markerDraggable.latitude}
                offsetTop={0}
                offsetLeft={0}
              >
                <FaMapMarkerAlt
                  onClick={() => {
                    this.setAddedMarker(this.state.markerDraggable)
                  }}
                />
              </Marker>
            ) : null}
            {this.state.addedMarker != null ? (
              <Popup
                latitude={this.state.markerDraggable.latitude}
                longitude={this.state.markerDraggable.longitude}
                onClose={this.closePopup}
                onRequestClose={this.closePopup}
              >
                <article>
                  <h3>
                    <p>Latitude:</p>
                    {this.state.addedMarker.latitude}
                  </h3>
                  <h3>
                    <p>Longitude:</p>
                    {this.state.addedMarker.longitude}
                  </h3>
                  <button
                    onClick={() => {
                      this.postData()
                      this.refreshPage()
                    }}
                  >
                    Add Marker
                  </button>
                </article>
              </Popup>
            ) : null}
          </div>
        </ReactMapGL>
      </div>
    )
  }
}

export default Map
