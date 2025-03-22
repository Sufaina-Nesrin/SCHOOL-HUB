import React from 'react';
import './Spinner.css'
import { useLoader } from '../../utils/context/LoaderContext';

function Spinner(props) {
  const {isLoading} = useLoader();
  if(! isLoading ){
    return null
  }
    return (
        <div className="loader">
        <div className="spinner"></div> {/* Customize this as needed */}
      </div>
    );
}

export default Spinner;