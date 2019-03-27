/* global chrome */

import React, { Component } from "react";
import "./profiledropDown.css";
import Logout from "../../../Image/logout1.svg";
import AccountList from "../../AccountList/AccountList";
import CreateAccountdrop from "./CreateandimportForm/CreateAccountdrop";
import InfoandSetting from "./infoAndSetting/InfoandSetting";
import { Link } from "route-lite";
import WelcomeAndLogin from "../../ContentWrapper/WelcomeAndLogin";

class ProfileDropDown extends Component {
  save = () => {
    let obj = {
      timer: 0
    };
    chrome.storage.local.set(obj, function() {
      //console.log("Timer reset done!!!");
    });
  };
  render() {
    return (
      <div>
        <div className="dropDown">
          <div className="dropdownMyaccount">
            <span style={{ color: "white" }}>My Account</span>
            <span>
              <Link component={WelcomeAndLogin} onClick={this.save}>
                {" "}
                <span style={{ color: "white", cursor: "pointer" }}>
                  {" "}
                  <img
                    style={{ width: "20px" }}
                    src={Logout}
                    alt="logOut"
                  />{" "}
                  Log Out{" "}
                </span>
              </Link>
            </span>
          </div>
          <div className="acountGroup" style={{ overflowY: "auto" }}>
            <div style={{ padding: "12px" }}>
              <AccountList toggle={this.props.toggle} />
            </div>
          </div>
          <div
            className="createAccountForm"
            style={{
              borderTop: "1px solid #dcdcdc",
              marginTop: "12px",
              marginBottom: "12px"
            }}
          >
            <CreateAccountdrop toggle={this.props.toggle} />
          </div>
          <div
            className="createAccountForm"
            style={{
              borderTop: "1px solid #dcdcdc",
              marginTop: "12px",
              marginBottom: "12px"
            }}
          >
            <InfoandSetting toggle={this.props.toggle} />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileDropDown;
