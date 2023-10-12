import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Style.css";

const ErrorMessage = () => {
  const [showToast, setShowToast] = useState(false); // State to control toast
  const [errorMessage, setErrorMessage] = useState("");

  const errorHandler = useSelector((state) => state.cartreducer.errorMessage);

  useEffect(() => {
    setErrorMessage(errorHandler);
    if (errorHandler && errorHandler.length === 0) {
    } else {
      if (errorHandler) {
        setShowToast(true); // Show the toast when errorMessage is updated
        const timeOut = setTimeout(() => {
          setShowToast(false); // Hide the toast after 5000ms delay
        }, 5000);
        return () => clearTimeout(timeOut);
      }
    }
  }, [errorHandler]);

  return (
    <div>
      {showToast && (
        <div
          className="position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 5 }}
        >
          <div
            className="toast show bg-primary text-white"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
            <div className="toast-body">{errorMessage}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
