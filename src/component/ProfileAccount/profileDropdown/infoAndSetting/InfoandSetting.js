import React, { Component } from 'react';
import '../CreateandimportForm/CreateAccountdrop.css';
import {Link} from 'route-lite';
import InfoandHep from '../../../infoandHelp/InfoandHelp'
import Setting from '../../../Setting/Setting'

class InfoandSetting extends Component {
    render() {
        return (
            <div style={{color:"white"}}>
                    <ul className="listCreation">
                        <li onClick={this.props.toggle}>
                        <Link component={InfoandHep}>
                            <i className="fas fa-info-circle"></i><span style={{marginLeft:"12px"}}>info and Help</span>
                        </Link>
                        </li>
                        <li onClick={this.props.toggle}>
                        <Link component={Setting}>
                            <i className="fas fa-cog"></i><span style={{marginLeft:"12px"}}>Setting</span>
                        </Link>
                        </li>
                    </ul>
            </div>
        );
    }
}

export default InfoandSetting;