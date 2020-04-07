import React from 'react';


import './InfoBar.css';
import covid from './covid.png';


import onlineIcon from '../../icons/onlineIcon.png';


const InfoBar = ({ room }) => (

    <div className="infoBar">
        <div className="leftInnerContainer">
            <img src={onlineIcon} alt="online" className="onlineIcon" />
            <h3>Covibot</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="#"><img src={covid} alt="close" className="covid" /></a>
        </div>
    </div>

)



export default InfoBar;