import React, { Component } from 'react';
import './CreateAccountdrop.css';
import { Link } from 'route-lite';
import IndivAccount from '../../../individualAccount/IndividualAccount';
import ImportAccount from '../../../importAccount/ImportAccount'


class CreateAccountdrop extends Component {
    render() {
        console.log(this.props.toggle);
        return (
            <div style={{ color: "white" }}>
                <ul className="listCreation">
                    <li onClick={this.props.toggle}>
                        <Link component={IndivAccount}>
                            <i className="fas fa-plus"></i><span style={{ marginLeft: "12px" }}>Create Account</span>
                        </Link>
                    </li>
                    <li onClick={this.props.toggle}>
                        <Link component={ImportAccount}>
                            <i className="fas fa-upload"></i><span style={{ marginLeft: "12px" }}>Import Account</span>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default CreateAccountdrop;