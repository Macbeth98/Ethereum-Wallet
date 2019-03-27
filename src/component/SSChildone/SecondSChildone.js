import React, { Component } from "react";
import "./SecondSChildone.css";
import Profile from "../../Image/profile.svg";
const ReactCopyButtonWrapper = require("../../../node_modules/react-copy-button-wrapper");

class SecondSChildone extends Component {
  state={
    copyText: true,
  }
  copyText = () => {
    this.setState({
      copyText: false
    });
  };
  render() {
    setTimeout(() => {
      this.setState({
        copyText: true
      });
    }, 20000);
    return (
      <div className="userAccountSSC">
        <img src={Profile} alt="" />
        <h4 style={{ fontWeight: "900", margin: "0" }}>{this.props.name}</h4>
        {/*<h6 style={{ color: "#007cff", fontWeight: "900" }}>Detail</h6>
        <span className="tokenidSSC">{this.props.account.address}</span>
      */}
        

        <div onClick={this.copyText} style={{wordBreak:"break-all",textAlign:"center"}}>
              <ReactCopyButtonWrapper text={this.props.account.address}>
                <h5
                  aria-label={this.state.copyText ? "Click to copy" : "Copied"}
                  className="hint--bottom"
                >
                {this.props.account.address}
                </h5>
              </ReactCopyButtonWrapper>
            </div>
      </div>
    );
  }
}

export default SecondSChildone;
