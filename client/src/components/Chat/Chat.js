import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';


import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

import mapacovid from './mapa-covid.png';
import randomId from 'random-id';
import { getData, getFqa } from './menu';
import './Chat.css';

let socket;

const Chat = () => {

    const [name, setName] = useState('user');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(getData());
    const len = 15;
    const pattern = 'aA0';
    
    const ENDPOINT = 'localhost';

    useEffect(() => {

        socket = io(ENDPOINT);
        const idroom = randomId(len, pattern);
        socket.emit('join', { name: 'user', room: idroom }, (resp) => {

        });
        return () => {
            socket.emit('disconnet');
            socket.off();
        }

    }, [ENDPOINT]);

    useEffect(() => {
        socket.on('message', async (message) => {
            if (message.user === 'admin' && (message.menu || message.fqa)) {

                if (message.menu) {
                    getData().forEach(data => {
                        setMessages(messages => [...messages, data]);
                    });
                }

                if (message.fqa) {
                    getFqa().forEach(data => {
                        setMessages(messages => [...messages, data]);
                    });
                }

            } else {
                setMessages(messages => [...messages, message]);
            }
        });
    }, []);


    const sendMessage = (event) => {

        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => {
                setMessage('');
            });
        }
    }

    return (
        <div>
            <div className="outerContainer">
                <div className="container">
                    <InfoBar room={room}></InfoBar>
                    <Messages messages={messages} name={name}></Messages>
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage}></Input>
                </div>

            </div>
            <div className="container">
                <img src={mapacovid} alt="" className="imgcovid" />
            </div>
            <div className="container black">

            </div>
        </div>

    )
}


export default Chat;