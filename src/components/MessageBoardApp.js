import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.svg';
import { getMessages, addMessage } from '../services/MessageAPIs.js';
import '../css/MessageBoardApp.css';


function MessageBoardApp() {
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
           setMessageList([{id: key, email: newMessage.email, message: newMessage.message}, ...messageList]);
        });
  };

  return(
           <div className="row">
            <h3>Message board</h3>

            <form onSubmit={handleSubmit}>
            <div class="form-group">
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

                  <div >
                      <button className="btn btn-primary btn-sm float-end">
                        POST
                      </button>
                  </div>
              </div>
            </form>

            <h3>Messages</h3>
            <div>
                {
                    messageList
                    .sort((m1, m2) => m2.id - m1.id)
                    .map((step, move) =>
                    {
                       return (
                         <div key={step.id}>
                             <textarea value={step.email + '\n\n' + step.message} readOnly rows="3"/>
                         </div>
                       );
                     })
                }
            </div>
            </div>
  )
}

export default MessageBoardApp;

