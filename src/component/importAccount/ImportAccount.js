import React, { Component } from "react";
import ExtNavBar from "../ExtTopNavbar/ExtNavBar";
import ImportAccountTabs from "../ImportAccountTabs/ImportAccountTabs";

class ImportAccount extends Component {
  render() {
    return (
      <div>
        <ExtNavBar />
        <div className="secondContainer">
          <h1 style={{ fontWeight: "900", color: "#1b2443" }}>
            Import Account
          </h1>
          <ImportAccountTabs />
        </div>
      </div>
    );
  }
}

export default ImportAccount;
