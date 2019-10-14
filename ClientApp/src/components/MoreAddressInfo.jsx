import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Header from './Header'
import Footer from './Footer'
import Map from './Map'
import Axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
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

const MoreAddressInfo = props => {
  const [latitude, newLatitude] = useState('')
  const [longitude, newLongitude] = useState('')
  const [dateReported, setDateReported] = useState('')
  const [address, setAddress] = useState('')
  const [convertedDate, setConvertDate] = useState('')

  const convertLatLong = async () => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCqif8ZjnUKRfHM9S36U5ZnzkCDqbpVzFI`
    const resp = await Axios.get(url)
    setAddress(resp.data.results[2].formatted_address)
    // console.log(resp.data)
  }

  useEffect(() => {
    if (latitude && longitude) {
      convertLatLong()
    }
  }, [latitude, longitude])

  useEffect(() => {
    setDate()
  }, [dateReported])

  const fetchAddressInfo = async () => {
    const resp = await Axios.get(
      `https://localhost:5001/api/Pothole/${props.match.params.selectedAddress}`
    )
    console.log(resp.data)
    newLatitude(resp.data.latitude)
    newLongitude(resp.data.longitude)
    setDateReported(resp.data.dateReported)
    convertLatLong()
  }

  const deletePothole = async () => {
    const resp = await Axios.delete(
      `https://localhost:5001/api/Pothole/${props.match.params.selectedAddress}`
    )
    console.log('deleted')
    refreshPage()
  }

  const setDate = () => {
    console.log({ dateReported })
    let now = moment(dateReported).format('MMMM Do YYYY, h:mm:ss a')
    setConvertDate(now)
    console.log(convertedDate)
    console.log('converted')
  }

  const refreshPage = () => {
    deletePothole()
    window.location.reload(false)
  }

  useEffect(() => {
    fetchAddressInfo()
  }, [])

  const dateToFormat = dateReported

  return (
    <div>
      <Header />
      <section>
        <Map />
        <Card className="card">
          <CardTitle>
            <h3>Pothole Information</h3>
          </CardTitle>
          <CardText> Latitude: {latitude}</CardText>
          <CardText>Longitude: {longitude}</CardText>
          <CardText>Address: {address}</CardText>
          <CardSubtitle>Date Reported: {convertedDate}</CardSubtitle>
          <section className="card-buttons">
            <Button
              type="button"
              onClick={refreshPage}
              className="delete-button"
            >
              Delete
            </Button>
            <Button color="link" className="home-button">
              <Link to="/" className="button-link">
                To Home
              </Link>
            </Button>
          </section>
        </Card>
      </section>
      <Footer />
    </div>
  )
}

export default MoreAddressInfo
