import React from 'react';
import LogoEXT from '../../Image/blueNv.svg';
import './WelcomeImgMsg.css';

const WelcomeImgMsg = ({LgwelMessage,LgwelTitle}) => {
    return (
        <div>
            <div className="Contentimg" style={{textAlign:"center"}}>
                <img src={LogoEXT} alt="ExtLogo" />
            </div>
            <div className="MessageExt">
                <span className="messageext1">{LgwelMessage}</span>
                <span className="messageext2">{LgwelTitle}</span>
            </div>
        </div>
    );
};

export default WelcomeImgMsg;