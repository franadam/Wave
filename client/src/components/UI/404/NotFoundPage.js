import React from 'react'
import {FaExclamationCircle} from 'react-icons/all';

const NotFoundPage = () => {
  return (
    <div className="container">
      <div className="not_found_container">
        <FaExclamationCircle />
        <div>
          <h1>!! Oops !!</h1>
          Page not found
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage
