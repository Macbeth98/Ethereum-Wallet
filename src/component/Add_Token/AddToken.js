import React, { Component } from "react";
import ExtNavBar from "../ExtTopNavbar/ExtNavBar";
import { Link, goBack } from "route-lite";
import ImportAddToken from "./InsertAddToken/InserAddToken";
import axios from "axios";

class AddToken extends Component {
  state = {
    tokenAddress: "",
    tokenSymbol: "",
    decimalPrecision: "",
    tokens: []
  };

  handleChange = async e => {
    await this.setState({
      [e.target.id]: e.target.value
    });

    if (this.state.tokenAddress.length === 42) {
      let x = await axios.get(
        `http://api.ethplorer.io/getTokenInfo/${
          this.state.tokenAddress
        }?apiKey=freekey`
      );
      console.log(x);
      await this.setState({
        tokenSymbol: x.data.symbol,
        decimalPrecision: x.data.decimals
      });
    }
  };

  save = async e => {
    e.preventDefault();
  };

  render() {
    let { tokenAddress } = this.state;
    const isEnabled = tokenAddress.length === 42;
    return (
      <div>
        <ExtNavBar />
        <div className="secondContainer">
          <h1 style={{ fontWeight: "900", color: "#1b2443" }}>Add Token</h1>
          <p style={{ textAlign: "justify", color: "#888888" }}>
            Add accounts will not be associated with your originally created
            MetaMask account seedphrase. Learn more about imported accounts here
          </p>
          <form>
            <div className="centeringform NvestForm">
              <div className="form-group cstFormGrp">
                <label style={{ color: "#a5a3a3", float: "left" }}>
                  Token Address:
                </label>
                <input
                  required
                  className="passwordBox form-control"
                  id="tokenAddress"
                  type="text"
                  pattern=".{15,}"
                  autoComplete="off"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="centeringform NvestForm">
              <div className="form-group cstFormGrp">
                <label style={{ color: "#a5a3a3", float: "left" }}>
                  Token Symbol:
                </label>
                <input
                  required
                  className="passwordBox form-control"
                  id="tokenSymbol"
                  type="text"
                  value={this.state.tokenSymbol}
                  pattern=".{2,}"
                  autoComplete="off"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="centeringform NvestForm">
              <div className="form-group cstFormGrp">
                <label style={{ color: "#a5a3a3", float: "left" }}>
                  Decimals of Precision:
                </label>
                <input
                  required
                  className="passwordBox form-control"
                  id="decimalPrecision"
                  type="number"
                  value={this.state.decimalPrecision}
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
                disabled={!isEnabled}
                className=" btn btn-primary importButton"
                onClick={this.save}
              >
                Add
              </button>
            </div>
          </form>
          <Link
            component={ImportAddToken}
            componentProps={{
              token_addr: this.state.tokenAddress,
              symbol: this.state.tokenSymbol,
              name: this.props.name,
              account: this.props.account
            }}
          >
            <button
              type="submit"
              disabled={!isEnabled}
              className=" btn btn-primary importButton"
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default AddToken;
