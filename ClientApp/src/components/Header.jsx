import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from '../App'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap'
import './Header.css'

class Header extends Component {
  constructor(props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = {
      collapsed: true
    }
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    return (
      <Container className="header-container">
        <Navbar color="faded" light>
          <NavbarBrand className="text-dark">Pothole Tracker</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem className="text-dark">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </NavItem>
              <NavItem className="text-dark">
                <Link to="/map" className="nav-link">
                  Map
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/all" className="nav-link">
                  All Potholes
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    )
  }
}

export default Header
