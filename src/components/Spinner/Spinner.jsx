import React from 'react'
import { MDBSpinner } from 'mdb-react-ui-kit'
import './Spinner.css';

const Spinner = () => {
  return (
    <MDBSpinner className='me-2 spin-main'>
        <span className='visually-hidden'> Loading....</span>
    </MDBSpinner>
  )
}

export default Spinner