/* global chrome */

import React, { Component } from "react";
import "./login.css";
import WelcomeImgMsg from "../welcomeImgMsg/WelcomeImgMsg";
import { Link } from "route-lite";
//import Test from "../Test";
import AccountDetailView from "../AccountDetailView/AccountDetailView";
import SHA256 from "crypto-js/sha256";
import Importing from "../Import/Import";
import WelcomeAndLogin from "../ContentWrapper/WelcomeAndLogin";
import CryptoJS from "crypto-js";
//import ReactDOM from "react-dom";

const Verify = props => {
  //console.log("In verify");
  let pwd = SHA256(props.pass).toString();
  if (pwd === props.hash) {
    let obj = {
      timer: Date.now()
    };
    chrome.storage.local.set(obj, function() {
      //console.log("Cookie Saved!!!");
    });
    return <GetAcc password={props.hash} />;
  } else {
    return <WelcomeAndLogin mssg="Wrong Password!!!" />;
  }
};

class GetAcc extends Component {
  state = {
    account: " ",
    set: ""
  };

  async componentWillMount() {
    //console.log("render");
    chrome.storage.local.get(
      "accounts",
      async function(data) {
        if (data.accounts !== undefined) {
          //console.log(data.accounts)
          //console.log(typeof(data.accounts))
          let bytes = CryptoJS.AES.decrypt(data.accounts, this.props.password);
          let accounts = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          //console.log(accounts);
          await this.setState({
            account: accounts[0]
          });
        }
      }.bind(this)
    );

    // chrome.storage.local.get(
    //   "accounts",
    //   async function(data) {
    //     //console.log(data);
    //     await this.setState({
    //       account: data.accounts[0],
    //       set: "Ok"
    //     });
    //   }.bind(this)
    // );
  }
  render() {
    //console.log("Rendering....!");
    let name = "Account 1";
    //if (this.state.set.length > 0) {
    //console.log("pwd matched");
    //console.log(this.state.account);
    return <AccountDetailView name={name} account={this.state.account} />;
    //}
  }
}

class LoginEXT extends Component {
  state = {
    extPassword: "",
    savedpwd: "",
    msg: "",
    account: "",
    hash: ""
  };

  componentDidMount() {
    if (this.props.mssg) {
      //console.log("ooo" + this.props.mssg);
      this.setState({
        msg: this.props.mssg
      });
    }
    chrome.storage.local.get(
      "pwd",
      async function(data) {
        //console.log(data.pwd);
        await this.setState({
          hash: data.pwd
        });
        if (data.pwd) {
          //console.log("cool");
        } else {
          //console.log("No Account");
        }
      }.bind(this)
    );
  }
  handleChange = e => {
    this.setState({
      extPassword: e.target.value
    });
  };
  render() {
    //let extPassword = this.state.extPassword;
    const isEnabled = this.state.extPassword.length > 4;
    return (
      <div>
        <div className="loginParent">
          <div>
            <WelcomeImgMsg
              LgwelMessage="Welcome Back !"
              LgwelTitle="UnBank the world!"
            />

            <div className="NvestForm">
              <form>
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
                    id="extPassword"
                    type="password"
                    pattern=".{4,}"
                    autoComplete="off"
                    onChange={this.handleChange}
                  />
                  {this.state.msg}
                </div>
                <br />
                <Link
                  component={Verify}
                  componentProps={{
                    pass: this.state.extPassword,
                    account: this.state.account,
                    hash: this.state.hash
                  }}
                >
                  <button
                    className="btn btn-primary customPassBtn"
                    disabled={!isEnabled}
                  >
                    Log In
                  </button>
                </Link>
              </form>
            </div>

            <div className="restoreAndPharse">
              <span className="messageext3">Restore account ?</span>
            </div>
          </div>
          <Link component={Importing}>
            <span className="messageext4">
              Import Using account seed phrase
            </span>
          </Link>
        </div>
      </div>
    );
  }
}

export default LoginEXT;
