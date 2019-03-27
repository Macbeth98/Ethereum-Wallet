/* global chrome */

import React, { Component } from "react";
//import ReactDOM from "react-dom";
import "./registerext.css";
import { Link, goBack } from "route-lite";
import { ethers } from "ethers";
import WelcomeImgMsg from "../welcomeImgMsg/WelcomeImgMsg";
import SHA256 from "crypto-js/sha256";
//import bip39 from "../Bip39/bip39";
import AccountDetailView from "../AccountDetailView/AccountDetailView";
import CryptoJS from "crypto-js";
import bip39 from "bip39";

const ReactCopyButtonWrapper = require("../../../node_modules/react-copy-button-wrapper");

class K extends Component {
  state = {
    copied: true,
    seed: ""
  };

  copied = () => {
    this.setState({
      copied: false
    });
  };

  render() {
    setTimeout(() => {
      this.setState({
        copied: true
      });
    }, 20000);
    return (
      <div>
        <div className="jumbleWord" onClick={this.copied}>
          <ReactCopyButtonWrapper text={this.props.mnemonic}>
            <h5
              aria-label={this.state.copied ? "Click to copy" : "Copied"}
              className="textJumble hint--bottom"
            >
              {this.props.mnemonic}
            </h5>
          </ReactCopyButtonWrapper>
        </div>
      </div>
    );
  }
}

class RegisterEXT extends Component {
  state = {
    mnemonic: "",
    accounts: [],
    acc_names: [],
    extRegPassword: "",
    extRegConfirmPassword: "",
    msg: "",
    next: false,
    btnToggle: true,
    copied: false
  };

  async componentDidMount() {
    await this.setState({
      mnemonic: bip39.generateMnemonic()
    });

    console.log(this.state.mnemonic);
    //console.log(this.state.mnemonic);

    let default_account = ethers.Wallet.fromMnemonic(this.state.mnemonic);

    await this.setState({
      accounts: [...this.state.accounts, default_account.signingKey]
    });

    let names = "Account 1";
    await this.setState({
      acc_names: [...this.state.acc_names, names]
    });
  }

  btntoggle = () => {
    this.setState({
      btnToggle: false
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
  };

  save = async () => {
    let object = {
      mnemonic: this.state.mnemonic,
      accounts: this.state.accounts,
      acc_names: this.state.acc_names,
      path_value: 0
    };

    chrome.storage.local.set(object, function() {
      //       // Notify that we saved.
      //console.log("Settings saved");
      //   });
    });
  };

  register = e => {
    e.preventDefault();

    // let obj = { pwd: SHA256(this.state.extRegPassword).toString() };
    //
    // chrome.storage.local.set(obj, function() {
    //   //       // Notify that we saved.
    //   //console.log("Pwd saved");
    //   //   });
    // });
    let pwd = SHA256(this.state.extRegPassword).toString();

    let accounts = CryptoJS.AES.encrypt(
      JSON.stringify(this.state.accounts),
      pwd
    );

    let mnemonic = CryptoJS.AES.encrypt(this.state.mnemonic, pwd);

    let object = {
      mnemonic: mnemonic,
      accounts: accounts,
      acc_names: this.state.acc_names,
      path_value: 0,
      pwd: pwd
    };

    chrome.storage.local.set(object, function() {
      //       // Notify that we saved.
      //console.log("Settings saved");
      //   });
    });
    const acc = async () => {
      //console.log("In acc after 4 sec...");
      await this.setState({
        msg: "Click Next to view the Default Account...",
        next: true,
        btnToggle: false
      });
      //ReactDOM.render(<AccountDetailView />, document.getElementById("body"));
    };

    setTimeout(acc, 700);
  };

  render() {
    let { extRegPassword, extRegConfirmPassword } = this.state;
    const isEnabled =
      extRegPassword.length > 4 &&
      extRegConfirmPassword.length > 4 &&
      extRegPassword === extRegConfirmPassword;
    const isNext = this.state.next && extRegPassword === extRegConfirmPassword;
    return (
      <div className="registerParent">
        <WelcomeImgMsg
          LgwelMessage="Getting Started"
          LgwelTitle="UnBank the World! "
        />
        <span className="headingCW">Mnemonic Phrase</span>
        <K copy={this.state.copied} mnemonic={this.state.mnemonic} />

        <div className="NvestForm">
          <form onSubmit={this.register}>
            <div className="form-group">
              <label
                htmlFor="Password"
                style={{ color: "#a5a3a3", float: "left" }}
              >
                Password
              </label>
              <input
                required
                className="passwordBox form-control"
                id="extRegPassword"
                type="password"
                pattern=".{4,}"
                autoComplete="off"
                onChange={this.handleChange}
              />
              <br />
              <label
                htmlFor="ConfirmPassword"
                style={{ color: "#a5a3a3", float: "left" }}
              >
                Confirm Password
              </label>
              <input
                required
                className="passwordBox form-control"
                id="extRegConfirmPassword"
                type="password"
                pattern=".{4,}"
                autoComplete="off"
                onChange={this.handleChange}
              />
            </div>
            {this.state.btnToggle ? (
              <button
                className="btn btn-primary customPassBtn"
                onClick={this.register}
                disabled={!isEnabled}
              >
                Register
              </button>
            ) : (
              <Link
                component={AccountDetailView}
                componentProps={{
                  name: this.state.acc_names[0],
                  account: this.state.accounts[0],
                  seed: this.state.mnemonic
                }}
              >
                <button
                  className="btn btn-success customNextBtn"
                  disabled={!isEnabled}
                >
                  Next
                </button>
              </Link>
            )}
          </form>
          <p align="center">
            <b>{this.state.msg}</b>
          </p>
        </div>
        {this.state.extRegPassword.length === 0 ? (
          <p>
            Already have an account? <Link onClick={() => goBack()}>Login</Link>
          </p>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default RegisterEXT;
