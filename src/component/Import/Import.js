/* global chrome */
import React, { Component } from "react";
//import ExtNavbar from "../ExtTopNavbar/ExtNavBar";
import WelcomeImgMsg from "../welcomeImgMsg/WelcomeImgMsg";
import "./home.css";
//import Createwallet from "../Createwallet/Createwallet";
import AccountDetailView from "../AccountDetailView/AccountDetailView";
import { Link } from "route-lite";
import { ethers } from "ethers";
// import NextSVG from "../../images/next.svg";
// import RegisterEXT from "../register/RegisterEXT";
// import CryptoJS from "crypto-js";
import WelcomeAndLogin from "../ContentWrapper/WelcomeAndLogin";
import CryptoJS from "crypto-js";
import SHA256 from "crypto-js/sha256";

class Importing extends Component {
  state = {
    imported_phrase: "sdsgdfdbd",
    accounts: [],
    acc_names: [],
    extRegPassword: "",
    extRegConfirmPassword: "",
    nextallow: false,
    btnToggle: true,
    btntoggleImport:true
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
    let default_account = ethers.Wallet.fromMnemonic(
      this.state.imported_phrase
    );
    // console.log(JSON.stringify(default_account.signingKey));
    await this.setState({
      btntoggleImport:false,
      accounts: [...this.state.accounts, default_account.signingKey]
    });

    //  console.log(this.state.accounts);

    // console.log("$$$$$$$$$$$$" + this.state.imported_phrase);
    //
    // console.log(this.state.acc_names);
  };

  register = async () => {
    // let obj = { pwd: SHA256(this.state.extRegPassword).toString() };

    // chrome.storage.local.set(obj, function() {
    //   //       // Notify that we saved.
    //   console.log("Pwd saved");
    //   //   });
    // });

    let names = "Account 1";
    await this.setState({
      acc_names: [...this.state.acc_names, names],
      btnToggle: false
    });

    let password = SHA256(this.state.extRegPassword).toString();
    let mnemonic = CryptoJS.AES.encrypt(this.state.imported_phrase, password);

    let accounts = CryptoJS.AES.encrypt(
      JSON.stringify(this.state.accounts),
      password
    );

    //console.log("%%%%%%%%%%%%" + accounts);

    let object = {
      mnemonic: mnemonic,
      accounts: accounts,
      acc_names: this.state.acc_names,
      path_value: 0,
      pwd: password
    };

    // let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(object), `${this.state.extRegConfirmPassword}`);
    // console.log(ciphertext);

    chrome.storage.local.set(object, function() {
      //       // Notify that we saved.
      // console.log(typeof object.accounts);
      // console.log(accounts);
      // console.log("Account and password saved");
      //   });
    });

    await this.setState({
      nextallow: true
    });
  };

  render() {
    let { extRegPassword, extRegConfirmPassword } = this.state;
    const isEnabled =
      extRegPassword.length > 4 &&
      extRegConfirmPassword.length > 4 &&
      extRegConfirmPassword === extRegPassword;
    const isNext =
      this.state.nextallow && extRegConfirmPassword === extRegPassword;
    const isImport = this.state.imported_phrase.length > 40;

    return (
      <div>
        <div className="HomeParent" style={{marginTop:"0"}}>
          <WelcomeImgMsg
            LgwelMessage="Welcome Back !"
            LgwelTitle="UnBank the World!"
          />
          <div className="box">
            {this.state.btntoggleImport?<div className="form-group shadow-textarea">
            <div className="textandSave" style={{ marginTop: "8px" }}>
              
              <p style={{ margin: "0" }}>Import Wallet From Seed Phrase</p>
            </div>
            <textarea
              onChange={e => {
                this.setState({ imported_phrase: e.target.value });
              }}
              className="form-control z-depth-1"
              id="exampleFormControlTextarea6"
              rows="3"
              placeholder="Paste your seed phrase here"
            />

            <div
              className="contentImport" style={{width:"264px"}}
            >
              <br />
              <span className="customHomeImport">
                <button
                  className="btn btn-primary customPassBtn"
                  onClick={this.save}
                  disabled={!isImport}
                >
                  {" "}
                  Import
                </button>
              </span>
            </div>
          </div>:<div align="center">
          <div className="registerParent">
            <div className="NvestForm">
              <form onSubmit={this.handleSubmit}>
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
                      account: this.state.accounts[0]
                    }}
                  >
                    <button
                      className="btn btn-success customNextBtn"
                      disabled={!isNext}
                    >
                      Next
                    </button>
                  </Link>
                )}
              </form>
              <p
                style={{
                  textAlign: "center",
                  marginLeft: "0",
                  paddingTop: "8px"
                }}
              >
                Have an account ?{" "}
                <Link component={WelcomeAndLogin}>
                  <span className="cAccount">Login</span>
                </Link>
              </p>
            </div>
          </div>
        </div>}

            
          </div>
        </div>
      </div>
    );
  }
}
export default Importing;
