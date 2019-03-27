import React, { Component } from 'react';
import './extNavBar.css';
import LogoEXT from '../../Image/blueNv.svg';
import SelectToken from '../SelectToken/SelectToken';
import ProfileAndAccount from '../ProfileAccount/ProfileAndAccount';

class ExtNavBar extends Component {
    render() {
        return (
            <div className="ExtNavBar">
                <div className="parentExtLogo">
                    <img className="ExtLogo" src={LogoEXT} alt="Nvest Logo" />
                    <SelectToken/>
                    <ProfileAndAccount/>
                </div>
            </div>
        );
    }
}

export default ExtNavBar;