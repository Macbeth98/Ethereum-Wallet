/* global chrome */

import React, { Component } from "react";
import "./importAccounttab.css";
import { ethers } from "ethers";
import { goBack } from "route-lite";
import CryptoJS from "crypto-js";

class ImportAccountTabs extends Component {
  state = {
    pk: "",
    acc_name: "",
    accounts: [],
    acc_names: [],
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
  }
  handleChange = async e => {
    await this.setState({
      [e.target.id]: e.target.value
    });
  };

  acc_pk = async e => {
    e.preventDefault();

    let new_account = new ethers.Wallet(this.state.pk);
    ////console.log(new_account);

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
          accounts: [...this.state.accounts, new_account.signingKey]
        });
      }.bind(this)
    );

    chrome.storage.local.get(
      "acc_names",
      async function(data) {
        //console.log(data.acc_names);
        await this.setState({
          acc_names: [...this.state.acc_names, ...data.acc_names]
        });
        this.save();
      }.bind(this)
    );
  };

  save = async () => {
    let accounts = CryptoJS.AES.encrypt(
      JSON.stringify(this.state.accounts),
      this.state.password
    );

    let object = {
      accounts: accounts,
      acc_names: [...this.state.acc_names, this.state.acc_name]
    };

    //console.log(object);

    await chrome.storage.local.set(object, function() {
      //       // Notify that we saved.
      //console.log("Accounts saved");
      //   });
    });

    chrome.storage.local.get("accounts", function(data) {
      //console.log(data);
    });

    chrome.storage.local.get("acc_names", function(data) {
      //console.log(data);
    });
  };
  render() {
    return (
      <div className="CAform">
        <span className="description">
          Imported accounts will not be associated with your originally created
          MetaMask account seedphrase. Learn more about imported accounts here
        </span>
        <form>
          <div className="centeringform">
            <div className="form-group cstFormGrp">
              <label style={{ color: "#a5a3a3", float: "left" }}>
                Select Type
              </label>
              <select className="form-control customSelectForm">
                <option value="Private Key">Private Key</option>
                <option value="JSON File">JSON File</option>
              </select>
            </div>
            <div className="form-group cstFormGrp">
              <label style={{ color: "#a5a3a3", float: "left" }}>
                Paste your private key string here:
              </label>
              <input
                required
                className="passwordBox form-control"
                id="pk"
                type="text"
                pattern=".{4,}"
                autoComplete="off"
                onChange={this.handleChange}
              />
              <input
                required
                className="passwordBox form-control"
                id="acc_name"
                placeholder="Account name"
                type="text"
                pattern=".{4,}"
                autoComplete="off"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="btngrp">
            <button
              type="button"
              className=" btn btn-danger cancelImpButton"
              onClick={() => goBack()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" btn btn-primary importButton"
              onClick={this.acc_pk}
            >
              Import
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ImportAccountTabs;
