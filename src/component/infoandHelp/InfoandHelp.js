import React, { Component } from 'react';
import ExtNavBar from '../ExtTopNavbar/ExtNavBar';
import WelcomeImgMsg from '../welcomeImgMsg/WelcomeImgMsg';
import karthik from './karthik.png'
import mani from './mani.png'
import sushil from './sushil.png'
import './infoandHelp.css'

class InfoandHelp extends Component {
    render() {
        return (
            <div>
                <div style={{position:"fixed"}}>
                    <ExtNavBar />
                </div>
                <div className="secondContainer">
                    <div className="infoandhelp" style={{marginTop:"64px",marginBottom:"64px"}}>
                        <WelcomeImgMsg LgwelMessage="Nvest Bank" LgwelTitle="The decentralized web awaits" />
                        <div className="contentInfo" style={{ textAlign: "center" }}>
                            <p>Version 1.0</p>
                            <br />
                            In case of error's kindly report to the given mail id <br />
                                <strong>extension@nvestportal.com</strong>
                            
                            <h4><strong>Built by</strong></h4>

                            <div > <img src={karthik} width='100px' height='100px' /><br /> <b>Karthik Puranam</b><br /><b>Backend Developer</b></div>
                            <div ><img src={mani} width='100px' height='100px' /> <br /> <b>Mani Chandra Teja</b><br /><b>Backend Developer</b></div> 
                            <div ><img src={sushil} width='100px' height='100px' /> <br /> <b>Sushil Sharma</b><br /><b>UI/UX Developer </b></div>
                            
                        </div>
                    
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoandHelp;