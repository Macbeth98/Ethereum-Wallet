import React from "react";
import ExtNavbar from "../ExtTopNavbar/ExtNavBar";
import "./sent.css";
import { Link, goBack } from "route-lite";
import avatar from "../../Image/profile.svg";
import SendTokensConfirm from "../SendTokensConfirm/SendTokensConfirm";
import web3 from "../Web3/Web3";

class Send_Tokens extends React.Component {
  state = {
    tokenValue: "",
    to: "",
    msg: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleETHChange = (e)=>{
    this.setState({to: e.target.value});
    let valid = web3.utils.isAddress(e.target.value);
    if(valid) this.setState({msg: ""})
    else this.setState({msg: "Not a Valid Ethereum Address"})
  }
  render() {
    const {decimals} = this.props;
    let place = `0 ${this.props.token.symbol}`;
    return (
      <div>
        <ExtNavbar />
        <div className="secondContainerToken">
          <div>
            <h1 style={{ fontWeight: "900", color: "#1b2443" }}>
              Send {this.props.token.symbol}
            </h1>
            <p style={{ textAlign: "justify", color: "#888888" }}>
              Only send {this.props.token.symbol} to an Ethereum address.
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
              <span style={{ display: "block" }}>
                {this.props.account.address}
              </span>
              <span style={{ display: "block" }}>
                {(this.props.token.balance/(10 ** decimals))} {this.props.token.symbol}
              </span>
              <span style={{ display: "block" }}>0 TIME</span>
            </div>
          </div>
          <form>
            <div className="form-group">
              <label style={{ color: "#a5a3a3", float: "left" }}>TO:</label>
              <input
                type="text"
                className="form-control customSelectForm"
                id="to"
                placeholder="To :"
                onChange={this.handleETHChange}
              /> <br/>
            <span style={{color: "red"}}>{this.props.msg}</span>
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
                    id="tokenValue"
                    autoComplete="off"
                    placeholder={place}
                    onChange={this.handleChange}
                  />
                  <p style={{ marginTop: "8px" }}>{this.props.token.symbol}</p>
                </div>
                <div
                  style={{
                    marginLeft: "12px",
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <p style={{ width: "250px", overflow: "hidden" }}>0</p>
                  <p style={{ marginLeft: "16px" }}>TIME</p>
                </div>
              </div>
            </div>
            <div
              className="wellee"
              style={{
                borderRadius: "0",
                marginTop: "4px",
                display: "flex",
                backgroundColor: "white"
              }}
            >
              {/*<input type="radio" value="0.000105" name="radio" id="radio1" />
              <label className="btn widthSeparation" for="radio1">
                <p style={{ fontWeight: "900", margin: "0" }}>Fastest</p>
                <p className="custmparag">0.000076666010</p>
                <p className="custmparage">ETH</p>
                <p style={{ fontSize: "10px", margin: "0" }}>0.011</p>
              </label>
              <input type="radio" value="0.0000105" name="radio" id="radio2" />
              <label className="btn widthSeparation" for="radio2">
                <p style={{ fontWeight: "900", margin: "0" }}>Fast</p>
                <p className="custmparag">0.000076666010</p>
                <p className="custmparage">ETH</p>
                <p style={{ fontSize: "10px", margin: "0" }}>0.011</p>
              </label>
              <input type="radio" value="0.0000105" name="radio" id="radio3" />
              <label className="btn widthSeparation" for="radio3">
                <p style={{ fontWeight: "900", margin: "0" }}>Slow</p>
                <p className="custmparag">0.000076666010</p>
                <p className="custmparage">ETH</p>
                <p style={{ fontSize: "10px", margin: "0" }}>0.011</p>
              </label>*/}
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
                component={SendTokensConfirm}
                componentProps={{
                  address: this.props.account.address,
                  balance: this.props.token.balance,
                  name: this.props.name,
                  symbol: this.props.token.symbol,
                  to: this.state.to,
                  amt: this.state.tokenValue,
                  priv_key: this.props.account.privateKey,
                  tok_address: this.props.token.contractAddress,
                  decimals: this.props.decimals
                }}
              >
                <button
                  type="submit"
                  className=" btn btn-primary importButton"
                  style={{ marginRight: "0" }}
                  disabled={this.state.msg.length>0? true: false}
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

export default Send_Tokens;
