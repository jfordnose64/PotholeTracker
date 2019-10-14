import React from 'react'
import './map.css'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className="footer-container">
      <h2 className="footer-header">Follow Me On</h2>
      <section className="footer-icon-container">
        <h3 className="footer-icon">
          <a href="https://www.instagram.com/jford00.php/">
            <FaInstagram />
          </a>
        </h3>
        <h3 className="footer-icon">
          <a href="https://www.linkedin.com/in/jackson-ford-799061188/">
            <FaLinkedin />
          </a>
        </h3>
        <h3 className="footer-icon">
          <a href="https://github.com/jfordnose64">
            <FaGithub />
          </a>
        </h3>
      </section>
      <h5 className="footer-lower">©2019 Jackson Ford</h5>
    </div>
  )
}

export default Footer
