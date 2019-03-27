/* global chrome */

import React, { Component } from "react";
import "./App.css";
import WelcomeAndLogin from "./component/ContentWrapper/WelcomeAndLogin";
import AccountDetailView from "./component/AccountDetailView/AccountDetailView";
import CryptoJS from "crypto-js";

class App extends Component {
  state = {
    timer: "",
    account: "",
    password: ""
  };
  componentWillMount() {
    chrome.storage.local.get(
      "pwd",
      async function(data) {
        await this.setState({
          password: data.pwd
        });
      }.bind(this)
    );

    chrome.storage.local.get(
      "timer",
      async function(data) {
        //console.log(data.timer);
        if (
          data.timer !== undefined &&
          data.timer !== 0 &&
          Date.now() < data.timer + 10 * 60 * 1000
        ) {
          //console.log("app");

          chrome.storage.local.get(
            "accounts",
            async function(data) {
              if (data.accounts !== undefined) {
                //console.log(data.accounts);
                //console.log(typeof data.accounts);
                let bytes = CryptoJS.AES.decrypt(
                  data.accounts,
                  this.state.password
                );
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
          //     //console.log(data.accounts);
          //     if (data.accounts !== undefined) {
          //       //console.log("app");
          //       await this.setState({
          //         account: data.accounts[0]
          //       });
          //     }
          //   }.bind(this)
          // );
          await this.setState({
            timer: data.timer
          });
        }
      }.bind(this)
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.account !== nextState.account;
  }
  render() {
    let name = "Account 1";
    if (Date.now() > this.state.timer + 10 * 60 * 1000) {
      return (
        <div className="parentNvestExtension">
          <div className="ExtContentWrapper">
            <WelcomeAndLogin />
          </div>
        </div>
      );
    } else {
      return (
        <div className="parentNvestExtension">
          <AccountDetailView name={name} account={this.state.account} />
        </div>
      );
    }
  }
}

export default App;
