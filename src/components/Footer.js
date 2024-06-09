import React from 'react'

const Footer = () => {

    const year = new Date().getFullYear();

  return (
    <div className='footer bg-info'>Copyright {year} developed by Imran Mammadov. All rights reserved.</div>
  )
}

export default Footer;