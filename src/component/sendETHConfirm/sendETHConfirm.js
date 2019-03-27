/* global chrome */

import React, { Component } from "react";
import "./sendETHConfirm.css";
import web3 from "../Web3/Web3";
import { ethers } from "ethers";
import axios from "axios";
import avatar from "../../Image/profile.svg";
import Ethereum from "../../Image/Ethereum.svg";
import AccountDetailView from "../AccountDetailView/AccountDetailView";
import { Link, goBack } from "route-lite";
import CryptoJS from "crypto-js";
import Loader from "react-loader-spinner";
import Luca from "../../Image/luca.png";
import Bubble from "../../Image/bubble.png";

class sendETHConfirm extends Component {
  state = {
    usd: "",
    txn_hash: "",
    txn_state: "",
    mnemonic: "",
    account: "",
    password: "",
    err: "",
    allow: false,
    con_but: true,
    gp: "",
    gas_selected: "",
    gas_display: "",
    luca_msg: "",
    priority_tab: true
  };
  async componentDidMount() {
    console.log("inside sendethconfirm");
    chrome.storage.local.get(
      "pwd",
      async function(data) {
        await this.setState({
          password: data.pwd
        });
      }.bind(this)
    );
    var tickers = await axios.get(
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,BTC"
    );

    let usd = this.props.amt * tickers.data.USD;
    //console.log(usd);

    await this.setState({
      usd: usd
    });

    let gasprice = await axios.get(
      "https://www.etherchain.org/api/gasPriceOracle"
    );
    await this.setState({
      gp: gasprice.data,
      gas_selected: gasprice.data.fast,
      gas_display: gasprice.data.fast,
      luca_msg: `Hey my name is Luca, your friendly blockchain bot. After searching the Ethereum network, I have calculated the optimal gas fee for your
      transaction to be ${Math.round(
        gasprice.data.fast * 0.000000001 * 22000 * 100000
      ) / 100000} ETH.`
    });

    chrome.storage.local.get(
      "accounts",
      function(data) {
        //console.log(data.accounts);
        //console.log(typeof data.accounts);
        let bytes = CryptoJS.AES.decrypt(data.accounts, this.state.password);
        let accounts = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        //console.log(accounts);
        this.setState({
          account: accounts[0]
        });
      }.bind(this)
    );
  }

  sendmsg = st => {
    chrome.tabs.query(
      {
        active: true
      },
      tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {
          id: "2aeae6e6715b2ccc1996aa28cc19f062",
          data: st
        });
      }
    );
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({
      con_but: false
    });
    this.setState({
      priority_tab: false
    });

    let privateKey = this.props.priv_key;
    let wallet = new ethers.Wallet(privateKey);
    var ct = await web3.eth.getTransactionCount(this.props.address);

    //console.log(wallet.address);
    // "0x7357589f8e367c2C31F51242fB77B350A11830F3"

    // All properties are optional
    let transaction = {
      nonce: ct,
      gasLimit: web3.utils.toHex(22000),
      gasPrice: web3.utils.toHex(this.state.gas_selected * 1000000000),
      to: this.props.to,
      // ... or supports ENS names
      // to: "ricmoo.firefly.eth",
      value: web3.utils.toHex(web3.utils.toWei(this.props.amt, "ether")),
      // This ensures the transaction cannot be replayed on different networks
      chainId: 1
    };

    wallet.sign(transaction).then(async signedTransaction => {
      //console.log(signedTransaction);

      // This can now be sent to the Ethereum network

      let provider = ethers.getDefaultProvider();
      provider.sendTransaction(signedTransaction).then(tx => {
        console.log(tx);
        //console.log("######" + tx.hash);
        this.setState({
          txn_hash: tx.hash,
          txn_state: "Txn is pending..",
          allow: true,
          err: ""
        });

        let txstatus = async () => {
          let st = await web3.eth.getTransactionReceipt(tx.hash);
          ////console.log("above while");

          while (1) {
            ////console.log("inside while");
            st = await web3.eth.getTransactionReceipt(tx.hash);
            if (st != null) {
              ////console.log("breaking!!!");
              break;
            }
          }
          //console.log(st);
          if (st.status === "0x1") {
            //console.log("Txn Successful !!!!");
            this.setState({
              txn_state: "Transaction Successful !!!!"
            });
            //this.sendmsg(st);
          } else {
            this.setState({
              txn_state: "Transaction Failed !!!!"
            });
            //this.sendmsg(st);
          }
        };

        txstatus();
      });
    });
    let errmsg = () => {
      this.setState({
        err: "Error: Insufficeint funds or the provided address is wrong!!"
      });
    };
    setTimeout(errmsg, 1000);
  };

  spinner = () => {
    if (this.state.txn_state == "Txn is pending..") {
      return (
        <div align="center">
          <br />
          <h4>
            <b>{this.state.txn_state}</b>
          </h4>
          <br />
          <Loader type="Triangle" color="#182542" height="100" width="100" />
        </div>
      );
    } else {
      return (
        <div align="center">
          <br />
          <h4>
            <b>{this.state.txn_state}</b>
          </h4>
          <br />
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <div className="secondContainer">
          <div className="confirmone">
            <p
              className="onePara"
              style={{ cursor: "pointer" }}
              onClick={() => goBack()}
            >
              {" "}
              <i class="fas fa-arrow-alt-circle-left" /> Edit
            </p>
            <p className="onePara" style={{ fontWeight: "900" }}>
              Main Ethereum Network
            </p>
          </div>
          <div className="confirmone" style={{ padding: "4px" }}>
            <img src={avatar} alt="logo" />{" "}
            <p className="contoken">{this.props.address}</p>
            <i style={{ marginTop: "10px" }} className="fas fa-arrow-right" />
            <img src={avatar} alt="logo" />{" "}
            <p className="contoken">{this.props.to}</p>
          </div>
          <div className="confirmtwo">
            <label style={{ color: "#888888" }}>Confirm</label>
            <br />
            <br />
            <img
              style={{ width: "30px", marginTop: "-8px" }}
              src={Ethereum}
              alt="Eth"
            />
            <p className="tokenValueConf">{this.props.amt} ETH</p>
            <p style={{ marginLeft: "32px" }}>$ {this.state.usd}</p>
          </div>

          <div className="btngrp">
            {this.state.con_but ? (
              <div>
                <div align="center">
                  <div>
                    <img
                      onClick={() => {
                        this.setState({
                          gas_selected: this.state.gp.fast,
                          gas_display: this.state.gp.fast,
                          luca_msg: `Hey my name is Luca, your friendly blockchain bot. After searching the Ethereum network, I have calculated the optimal gas fee for your
                    transaction to be  ${Math.round(
                      this.state.gp.fast * 0.000000001 * 22000 * 100000
                    ) / 100000} ETH.`
                        });
                      }}
                      className="luca"
                      src={Luca}
                      alt="Luca"
                    />

                    <img
                      className="text_box_image"
                      src={Bubble}
                      width="232px"
                      height="226px"
                    />
                    <span className="text_in_box">{this.state.luca_msg}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className=" btn btn-danger cancelImpButton"
                  onClick={() => goBack()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={this.handleSubmit}
                  className=" btn btn-primary importButton"
                >
                  Confirm
                </button>
              </div>
            ) : (
              <p />
            )}
            <br />

            {this.spinner()}
            <br />
            <div align="center">
              {this.state.txn_hash.length > 5 && this.state.allow ? (
                <a
                  href={`https://etherscan.io/tx/${this.state.txn_hash}`}
                  target="_blank"
                >
                  <button className="btn btn-primary">
                    {" "}
                    View on Etherscan
                  </button>
                </a>
              ) : (
                <h5 style={{ color: "red" }}>{this.state.err}</h5>
              )}
            </div>
            <hr />
          </div>
        </div>

        {this.state.priority_tab ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="gas"
              onClick={() => {
                this.setState({
                  gas_selected: this.state.gp.standard,
                  gas_display: this.state.gp.standard,
                  luca_msg: `So I just got back from negotiating your terms with the miners. After much cyber yelling, I was able to bring them down to a gas fee of ${Math.round(
                    this.state.gp.standard * 0.000000001 * 22000 * 100000
                  ) / 100000} ETH.`
                });
              }}
            >
              Prioritize Cost
            </button>
            <button
              className="gas"
              onClick={() => {
                this.setState({
                  gas_selected: this.state.gp.fast,
                  gas_display: this.state.gp.fast,
                  luca_msg: `After searching the Ethereum network again, I have calculated the optimal gas fee for your transaction to be ${Math.round(
                    this.state.gp.fast * 0.000000001 * 22000 * 100000
                  ) / 100000} ETH.`
                });
              }}
            >
              Luca's Suggestion
            </button>
            <button
              className="gas"
              onClick={() => {
                this.setState({
                  gas_selected: this.state.gp.fastest,
                  gas_display: this.state.gp.fastest,
                  luca_msg: `It seems that you are in a rush. After re-examining the Ethereum network, I found that the optimal gas fee for an expidited transaction would be ${Math.round(
                    this.state.gp.fastest * 0.000000001 * 22000 * 100000
                  ) / 100000} ETH.`
                });
              }}
            >
              Prioritize Speed
            </button>
          </div>
        ) : (
          ""
        )}

        <div className="home">
          <Link
            component={AccountDetailView}
            componentProps={{
              name: "Account 1",
              account: this.state.account,
              seed: this.state.mnemonic
            }}
          >
            <button className=" btn btn-default">Home</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default sendETHConfirm;

// <div className="confirmThree">
//   <div>
//     <span style={{ fontWeight: "900" }}>Gas</span>
//   </div>
//   <div>
//     <img
//       style={{ width: "20px", marginTop: "-8px" }}
//       src={Ethereum}
//       alt="Eth"
//     />
//     <p className="tokenValueConf">0.000126 ETH</p>
//     <br />
//     <p style={{ marginLeft: "24px", float: "right" }}>$ 0.12</p>
//   </div>
// </div>
// <div className="confirmThree">
//   <div>
//     <span style={{ fontWeight: "900" }}>Total</span>
//   </div>
//   <div>
//     <p className="fee">Amount + Gas fee</p>
//     <br />
//     <img
//       style={{ width: "20px", marginTop: "-8px" }}
//       src={Ethereum}
//       alt="Eth"
//     />
//     <p className="tokenValueConf" style={{ color: "#4db7ff" }}>
//       0.0571 ETH
//     </p>
//     <br />
//     <p style={{ marginLeft: "24px", float: "right" }}>$ 0.12</p>
//   </div>
// </div>
