/* global chrome */

import React, { Component } from "react";
import "./IaAccounTabs.css";
import { Link, goBack } from "route-lite";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";
import AccountDetailView from "../AccountDetailView/AccountDetailView";

class IaAccounTabs extends Component {
  state = {
    accounts: [],
    acc_names: [],
    acc_name: "",
    new_path_value: 0,
    mnemonic: "",
    acc: ""
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
      "path_value",
      async function(data) {
        //  console.log(data.path_value);
        let new_path_value = data.path_value + 1;
        await this.setState({
          new_path_value: new_path_value
        });
        let path = `m/44'/60'/0'/0/${new_path_value}`;
        //  console.log(path);
        let new_account;
        //  console.log(this.state.password);
        chrome.storage.local.get(
          "mnemonic",
          async function(data) {
            //  console.log(data.mnemonic)
            var mnemonic = CryptoJS.AES.decrypt(
              data.mnemonic,
              this.state.password
            ).toString(CryptoJS.enc.Utf8);
            //  console.log(mnemonic);
            await this.setState({
              mnemonic: mnemonic
            });
            //  console.log(this.state.mnemonic);
            let new_acc = ethers.Wallet.fromMnemonic(mnemonic, path);
            new_account = new_acc;
            //    console.log(new_account);
          }.bind(this)
        );

        //  console.log(this.props.mnemonic);

        chrome.storage.local.get(
          "accounts",
          async function(data) {
            let accounts = JSON.parse(
              CryptoJS.AES.decrypt(data.accounts, this.state.password).toString(
                CryptoJS.enc.Utf8
              )
            );
            await this.setState({
              accounts: [...this.state.accounts, ...accounts]
            });

            await this.setState({
              accounts: [...this.state.accounts, new_account.signingKey],
              acc: new_account.signingKey
            });
          }.bind(this)
        );
        chrome.storage.local.get(
          "acc_names",
          async function(data) {
            //  console.log(data.acc_names);
            await this.setState({
              acc_names: [...this.state.acc_names, ...data.acc_names]
            });
          }.bind(this)
        );
      }.bind(this)
    );
  }

  create = async () => {
    //  console.log(this.state.accounts);
    let accounts = CryptoJS.AES.encrypt(
      JSON.stringify(this.state.accounts),
      this.state.password
    );

    let object = {
      accounts: accounts,
      path_value: this.state.new_path_value,
      acc_names: [...this.state.acc_names, this.state.acc_name]
    };

    //console.log(object);

    await chrome.storage.local.set(object, function() {
      //       // Notify that we saved.
      //  console.log("Accounts saved");
      //   });
    });

    chrome.storage.local.get("accounts", function(data) {
      //  console.log(data);
    });

    chrome.storage.local.get("acc_names", function(data) {
      //  console.log(data);
    });
  };

  handleChange = e => {
    this.setState({
      acc_name: e.target.value
    });
  };

  render() {
    return (
      <div className="CAform">
        <form>
          <div className="form-group">
            <label
              htmlFor="Password"
              style={{ color: "#a5a3a3", float: "left" }}
            >
              Account Name
            </label>
            <input
              required
              className="passwordBox form-control"
              id="acc_name"
              type="text"
              pattern=".{4,}"
              autoComplete="off"
              onChange={this.handleChange}
            />
            <Link
              component={AccountDetailView}
              componentProps={{
                name: this.state.acc_name,
                account: this.state.acc,
                seed: this.state.mnemonic
              }}
            >
              <button
                className="btn btn-primary CreateButton"
                onClick={this.create}
              >
                Create
              </button>
            </Link>
          </div>
        </form>
        <br />

        <button
          className=" btn btn-danger cancelButton"
          onClick={() => goBack()}
        >
          Cancel
        </button>
      </div>
    );
  }
}

export default IaAccounTabs;
