import React, { Component } from "react";
import ExtNavBar from "../ExtTopNavbar/ExtNavBar";
import Ethereum from "../../Image/Ethereum.svg";
import "./deposit.css";
import { Link, goBack } from "route-lite";
import QRcode from "../QRcode/Qrcode";

class Deposit extends Component {
  render() {
    return (
      <div>
        <ExtNavBar />
        <div className="secondContainer">
          <h1 style={{ fontWeight: "900", color: "#1b2443" }}>Deposit Ether</h1>
          <p style={{ textAlign: "justify", color: "#888888" }}>
            To interact with decentralized applications using MetaMask, you’ll
            need Ether in your wallet.
          </p>
          <div className="tAlignment">
            <img src={Ethereum} alt="text" />

            <p style={{ marginTop: "10px", textAlign: "center" }}>
              If you already have some Ether, the quickest way to get Ether in
              your new wallet by direct deposit.
            </p>
          </div>
          <div className="btngrp">
            <button
              type="button"
              className=" btn btn-danger cancelImpButton"
              style={{ marginLeft: "38px" }}
              onClick={() => goBack()}
            >
              Cancel
            </button>
            <Link
              component={QRcode}
              componentProps={{ address: this.props.address, name: this.props.name }}
            >
              <button
                className="btn btn-primary"
                style={{ borderRadius: "0" }}
                onClick={this.toggle}
              >
                View Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Deposit;
