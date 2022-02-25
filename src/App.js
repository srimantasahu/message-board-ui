import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { getMessages, addMessage } from './message-apis.js';


function App() {
  const [ message, setMessage ] = useState({});
  const [ messageList, setMessageList ] = useState([]);

  useEffect(() => {
    if (messageList.length) {
      return;
    }
    getMessages()
          .then(messages => {
              setMessageList(messages);
          });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const newMessage = {
          email: data.get('email'),
          message: data.get('message'),
        };

    addMessage(newMessage)
        .then(key => {
           setMessageList([...messageList, {id: key, email: newMessage.email, message: newMessage.message}]);
        });
  };

  return(
              <div className="row center">
            <h3>Message board</h3>

            <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">
                Email address
              </label>
              <input
                id="email" name="email"/>
              <label htmlFor="message">
                  Your message
                </label>
                <textarea
                  id="message" name="message" defaultValue=""/>
              </div>
              <button className="btn btn-primary">
                POST
              </button>
            </form>

            <h3>Messages</h3>
            <div>
                {messageList.map((step, move) => {
                                           return (
                                             <div key={step.id}>
                                                 <textarea value={step.message} readOnly />
                                             </div>
                                           );
                                         })}
            </div>
          </div>

  )
}

export default App;

