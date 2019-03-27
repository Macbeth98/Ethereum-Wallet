import React, { Component } from "react";
import { QRCode } from "react-qr-svg";
//import QRcode from "../../Image/qrcode.svg";
import Avatar from "../../Image/profile.svg";
import "./Qr.css";
import ExtNavbar from "../ExtTopNavbar/ExtNavBar";
import { goBack } from "route-lite";

class Qrcode extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <ExtNavbar />
        <div className="secondContainer">
          <div className="Qrcenter">
            <img src={Avatar} alt="" />
            <h3>{this.props.name}</h3>
            <QRCode
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              style={{ width: 200 }}
              value={this.props.address}
            />
            <div className="tokenValueone">{this.props.address}</div>
            <br />
            <button
              type="button"
              className=" btn btn-danger cancelImpButton"
              style={{ marginLeft: "0" }}
              onClick={() => goBack()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Qrcode;
