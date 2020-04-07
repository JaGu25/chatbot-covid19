import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mapacovid from '../Chat/mapa-covid.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import github from './github-brands.svg'

import './Join.css';

const Join = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');


    return (
        <div>
            <div className="outerContainer2">
                <div className="container containerInicio">
                    <h1 className="heading">
                        developed with  <FontAwesomeIcon icon={faHeart} className="heart" />
                        by <a href="https://github.com/JaGu25" target="_blank" className="link">  <img src={github} alt="" className="git" />  @JaGu25</a> </h1>
                </div>
                <div className="container containerInicio buttonContainer">
                    <Link to='/chat'>
                        <button className="button mt-20" type="button">Empezar ChatBot !</button>
                    </Link>
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


export default Join;