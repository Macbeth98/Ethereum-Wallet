import React, { Component } from 'react';
import ExtNavBar from '../../ExtTopNavbar/ExtNavBar';
import './insertAddtoken.css';
import avatar from '../../../Image/profile.svg';
import { goBack, Link } from 'route-lite';
import AccountDetailView from '../../AccountDetailView/AccountDetailView'

class InserAddToken extends Component {
    render() {
        return (
            <div>
                <ExtNavBar />
                <div className="secondContainer" style={{ padding: "0" }}>
                    <div style={{ padding: "12px" }}>
                        <h1 style={{ fontWeight: "900", color: "#1b2443" }}>Add Token</h1>
                        <p style={{ textAlign: "justify", color: "#888888" }}>
                            Would you like to add these token
                    </p>
                    </div>
                    <div className="insertTokenCard">
                        <p className="titleLabel">Token</p>
                        <p className="titleLabel">Balance</p>
                    </div>
                    <div className="tableToken">
                        <div style={{ display: "flex" }}>
                            <img style={{ width: "44px" }} src={avatar} alt="img" />
                            <p style={{ marginTop: "24px" }}>121</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <p style={{ marginTop: "24px" }}>0121</p>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="btngrp" style={{position:"relative",bottom:"-112px"}}>
                        <button type="button" className=" btn btn-danger cancelImpButton" onClick={() => goBack()}>Back</button>
                        <Link component={AccountDetailView}>
                            <button type="submit" className=" btn btn-primary importButton">Add Token</button>
                        </Link>

                    </div>
                </div>
            </div>
        );
    }
}
export default InserAddToken;

