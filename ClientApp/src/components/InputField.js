import React, { useState } from 'react'
import Axios from 'axios'
import './input.css'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

const InputField = () => {
  const [latitude, setNewLatitude] = useState('')
  const [longitude, setNewLongitude] = useState('')
  const [damage, setNewDamage] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    console.log(latitude)
    console.log(longitude)
    console.log(damage)
    postData()
  }

  const postData = async () => {
    const resp = await Axios.post('https://localhost:5001/api/Pothole', {
      latitude,
      longitude,
      damage
    })
    console.log('submitted')
  }

  const refreshPage = () => {
    window.location.reload(false)
  }

  return (
    <Form onSubmit={handleSubmit} className="form">
      <h3>Report a Pothole</h3>
      <section className="form-section">
        <FormGroup>
          <Input
            type="double"
            step="any"
            max="90"
            min="-90"
            placeholder="Latitude"
            value={latitude}
            onChange={e => {
              setNewLatitude(e.target.value)
            }}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="double"
            step="any"
            max="180"
            min="-180"
            placeholder="Longitude"
            value={longitude}
            onChange={e => {
              setNewLongitude(e.target.value)
            }}
          />
        </FormGroup>
      </section>
      <Button onClick={refreshPage}>Submit</Button>
    </Form>
  )
}

export default InputField
