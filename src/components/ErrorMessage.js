import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Style.css';
const ErrorMessage = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const errorHandler = useSelector((state) => state.cartreducer.errorMessage);

  useEffect(() => {
    setErrorMessage(errorHandler);
  }, [errorHandler]); 

  useEffect(() => {
    const interval = setInterval(() => {
      setErrorMessage(''); 
    }, 10000); 

    return () => {
      clearInterval(interval);
    };
  }, [errorHandler]); // 

  return (
    <div>
    {errorMessage && (
      <div className="error-overlay">
        <div className="error-message">
          {errorMessage}
        </div>
      </div>
    )}
    </div>
  );
};

export default ErrorMessage;

