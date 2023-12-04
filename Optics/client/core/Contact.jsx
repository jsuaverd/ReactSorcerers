import React, { useState, useRef } from 'react';

function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();


    // Reset the form fields
    nameRef.current.value = '';
    phoneRef.current.value = '';
    emailRef.current.value = '';
    messageRef.current.value = '';

    // Set formSubmitted to true after successful form submission
    setFormSubmitted(true);

    // Show an alert
    window.alert('Form submitted successfully!');
  };

  return (
    <div className="main">
      <div className="contact">
        <h1 className="htag">Request a Call Back</h1>

        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="form-container">
              <div>
                <input type="text" placeholder="Name" ref={nameRef} />
              </div>
              <div>
                <input type="text" placeholder="Phone Number" ref={phoneRef} />
              </div>
              <div>
                <input type="email" placeholder="Email" ref={emailRef} />
              </div>
              <div>
                <input type="text" placeholder="Message" className="message_input" ref={messageRef} />
              </div>
              <div className="form-button">
                <button type="submit">SEND</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;


