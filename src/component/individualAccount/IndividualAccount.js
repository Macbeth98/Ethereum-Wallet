import React, { Component } from "react";
import ExtNavBar from "../ExtTopNavbar/ExtNavBar";
import "./indAccount.css";
import IaAccounTabs from "../CreateAccountTabs/IaAccounTabs";

class IndividualAccount extends Component {
  render() {
    return (
      <div>
        <ExtNavBar />
        <div className="secondContainer">
          <h1
            style={{ fontWeight: "900", color: "#1b2443", textAlign: "center" }}
          >
            New Account
          </h1>
          <IaAccounTabs />
        </div>
      </div>
    );
  }
}

export default IndividualAccount;
