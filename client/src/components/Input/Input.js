import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons'

import './Input.css';


const Input = ({ message, sendMessage, setMessage }) => (

    <form className="form">
        <input className="input" placeholder="Escribe un mensaje..." type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />

        <button className="sendButton" onClick={(event) => sendMessage(event)} >
            <FontAwesomeIcon icon={faPlay} className="icon" />
        </button>
    </form>

)



export default Input;