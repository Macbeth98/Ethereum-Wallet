import React, { Component } from "react";
import ExtNavbar from "../ExtTopNavbar/ExtNavBar";
import avatar from "../../Image/profile.svg";
import { Link, goBack } from "route-lite";
import "./sent.css";
import sendETHConfirm from "../sendETHConfirm/sendETHConfirm";
import axios from "axios";

class Sent extends Component {
  state = {
    eTHValue: "",
    accountValue: "",
    new_usd: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleChangeETH = async e => {
    await this.setState({
      eTHValue: e.target.value
    });
    var tickers = await axios.get(
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,BTC"
    );

    let usd = this.state.eTHValue * tickers.data.USD;
    usd = Math.round(usd * 100000) / 100000;
    this.setState({
      new_usd: usd
    });
  };
  render() {
    const isEnabled =
      this.state.eTHValue.length > 0 && this.state.accountValue.length === 42;
    return (
      <div>
        <ExtNavbar />
        <div className="secondContainerToken">
          <div>
            <h1 style={{ fontWeight: "900", color: "#1b2443" }}>Send ETH</h1>
            <p style={{ textAlign: "justify", color: "#888888" }}>
              Only send ETH to an Ethereum address.
            </p>
          </div>
          <label style={{ color: "#888888" }}>FROM:</label>
          <div className="well" style={{ padding: "8px", borderRadius: "0" }}>
            <div>
              <img
                src={avatar}
                style={{ width: "24px", marginTop: "-6px", marginRight: "8px" }}
                alt="token"
              />
              <p
                style={{
                  fontWeight: "900",
                  marginTop: "2px",
                  display: "inline-block",
                  margin: "0"
                }}
              >
                {this.props.name}
              </p>
            </div>
            <div style={{ marginLeft: "32px" }}>
              <p className="tokenNumberSent">{this.props.address}</p>
              <span style={{ display: "block" }}>{this.props.balance} ETH</span>
              <span style={{ display: "block" }}>{this.props.usd} USD</span>
            </div>
          </div>
          <form>
            <div className="form-group">
              <label style={{ color: "#a5a3a3", float: "left" }}>TO:</label>
              <input
                type="text"
                className="form-control customSelectForm"
                id="accountValue"
                placeholder="To :"
                onChange={this.handleChange}
              />

              {/*
                <select
                className="form-control customSelectForm"
                id="accountValue"
                placeholder="To :"
                onChange={this.handleChangeETH}
              >
                {this.state.selectTokenValue.map(optionValue => {
                  return (
                    <option
                      disabled
                      selected
                      key={optionValue.id}
                      value={optionValue.STvalue}
                    >
                      {optionValue.STvalue}
                    </option>
                  );
                })}
              </select>
              */}

              <div
                className="well"
                style={{
                  padding: "4px",
                  borderRadius: "0",
                  marginTop: "12px",
                  marginBottom: "-8px",
                  backgroundColor: "white"
                }}
              >
                <div style={{ display: "flex" }}>
                  <input
                    type="text"
                    className="form-control customformInput"
                    id="eTHValue"
                    autoComplete="off"
                    placeholder="0 ETH"
                    onChange={this.handleChangeETH}
                  />
                  <p style={{ marginTop: "8px" }}>ETH</p>
                </div>
                <div
                  style={{
                    marginLeft: "12px",
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <p style={{ width: "250px", overflow: "hidden" }}>
                    {this.state.new_usd}
                  </p>
                  <p style={{ marginLeft: "16px" }}>USD</p>
                </div>
              </div>
            </div>

            <div className="btngrp">
              <button
                type="button"
                className=" btn btn-danger cancelImpButton"
                style={{ marginLeft: "0" }}
                onClick={() => goBack()}
              >
                Cancel
              </button>
              <Link
                component={sendETHConfirm}
                componentProps={{
                  address: this.props.address,
                  balance: this.props.balance,
                  name: this.props.name,
                  to: this.state.accountValue,
                  amt: this.state.eTHValue,
                  priv_key: this.props.priv_key
                }}
              >
                <button
                  type="submit"
                  className=" btn btn-primary importButton"
                  style={{ marginRight: "0" }}
                  disabled={!isEnabled}
                >
                  Next
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Sent;
