/* global chrome */
import React from "react";
import { Link, goBack } from "route-lite";
import avatar from "../../Image/profile.svg";
import Ethereum from "../../Image/Ethereum.svg";
import web3 from "../Web3/Web3";
import { ethers } from "ethers";
import AccountDetailView from "../AccountDetailView/AccountDetailView";
import CryptoJS from "crypto-js";
import Loader from "react-loader-spinner";
import axios from "axios";
import Luca from "../../Image/luca.png";
import Bubble from "../../Image/bubble.png";
import "./sendETHConfirm.css";
//import ChatBubble from "react-chat-bubble";

class SendTokensConfirm extends React.Component {
  state = {
    txn_hash: "",
    txn_state: "",
    account: "",
    password: "",
    err: "",
    allow: false,
    con_but: true,
    balance: "",
    symbol: "",
    gp: "",
    gas_selected: "",
    gas_display: "",
    luca_msg: "",
    priority_tab: true
  };
  async componentDidMount() {
    if (this.props.txn_data) {
      //let res = await axios.get(`https://blockscout.com/eth/rinkeby/api?module=account&action=tokenbalance&contractaddress=${this.props.tok_address}&address=${this.props.address}`)
      let data = await axios.get(
        `https://blockscout.com/eth/mainnet/api?module=token&action=getToken&contractaddress=${
          this.props.tok_address
        }`
      );
      //console.log(data.data);
      let gasprice = await axios.get(
        "https://www.etherchain.org/api/gasPriceOracle"
      );
      await this.setState({
        gp: gasprice.data,
        gas_selected: gasprice.data.fast,
        gas_display: gasprice.data.fast,
        luca_msg: `Hey my name is Luca, your friendly blockchain bot. After searching the Ethereum network, I have calculated the optimal gas fee for your
        transaction to be ${Math.round(
          gasprice.data.fast * 0.000000001 * 52000 * 100000
        ) / 100000} ETH.`
      });
      //console.log(gasprice.data);
      //console.log(gasprice.data.standard * 1000000000);
      await this.setState({
        //balance: res.data.result,
        symbol: data.data.result.symbol
      });
    }

    let gasprice = await axios.get(
      "https://www.etherchain.org/api/gasPriceOracle"
    );
    await this.setState({
      gp: gasprice.data,
      gas_selected: gasprice.data.fast,
      gas_display: gasprice.data.fast,
      luca_msg: `Hey my name is Luca, your friendly blockchain bot. After searching the Ethereum network, I have calculated the optimal gas fee for your
      transaction to be ${Math.round(
        gasprice.data.fast * 0.000000001 * 52000 * 100000
      ) / 100000} ETH.`
    });
    //console.log(gasprice.data);
    //console.log(gasprice.data.standard * 1000000000);

    chrome.storage.local.get(
      "pwd",
      async function(data) {
        await this.setState({
          password: data.pwd
        });
      }.bind(this)
    );

    chrome.storage.local.get(
      "accounts",
      function(data) {
        ////console.log(data.accounts);
        ////console.log(typeof data.accounts);
        let bytes = CryptoJS.AES.decrypt(data.accounts, this.state.password);
        let accounts = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        ////console.log(accounts);
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
    this.setState({
      priority_tab: false
    });
    e.preventDefault();
    this.setState({
      con_but: false
    });
    let Tdata = web3.eth.abi.encodeFunctionCall(
      {
        name: "transfer",
        type: "function",
        inputs: [
          {
            type: "address",
            name: "myaddr"
          },
          {
            type: "uint256",
            name: "value"
          }
        ]
      },
      [this.props.to, this.props.amt]
    );

    ////console.log(Tdata);
    var ct = await web3.eth.getTransactionCount(this.props.address);
    let privateKey = this.props.priv_key;
    let wallet = new ethers.Wallet(privateKey);
    let txParams;

    if (this.props.txn_data) {
      //console.log(this.props.txn_data + this.props.tok_address);
      txParams = {
        nonce: ct,
        gasPrice: web3.utils.toHex(this.state.gas_selected * 1000000000),
        gasLimit: web3.utils.toHex(100000),
        to: this.props.tok_address,
        data: this.props.txn_data,
        value: web3.utils.toHex(this.props.amt),
        // EIP 155 chainId - mainnet: 1, ropsten: 3
        chainId: 1
      };
    } else {
      txParams = {
        nonce: ct,
        gasPrice: web3.utils.toHex(this.state.gas_selected * 1000000000),
        gasLimit: web3.utils.toHex(100000),
        to: this.props.tok_address,
        data: Tdata,
        // EIP 155 chainId - mainnet: 1, ropsten: 3
        chainId: 1
      };
    }

    wallet.sign(txParams).then(signedTransaction => {
      ////console.log(signedTransaction);

      // This can now be sent to the Ethereum network
      let provider = ethers.getDefaultProvider();
      provider.sendTransaction(signedTransaction).then(tx => {
        ////console.log(tx);
        ////console.log("######" + tx.hash);
        this.setState({
          txn_hash: tx.hash,
          txn_state: "Txn is pending.."
        });

        let txstatus = async () => {
          let st = await web3.eth.getTransactionReceipt(tx.hash);
          //////console.log("above while");

          while (1) {
            //////console.log("inside while");
            st = await web3.eth.getTransactionReceipt(tx.hash);
            if (st != null) {
              //////console.log("breaking!!!");
              //console.log(st);
              break;
            }
          }
          ////console.log(st);
          if (st.status === "0x1") {
            ////console.log("Txn Successful !!!!");
            this.setState({
              txn_state: "Transaction Successful !!!!"
            });
            if (this.props.txn_data) {
              //console.log("sending");
              this.sendmsg(st);
            }
          } else {
            this.setState({
              txn_state: "Transaction Failed!"
            });

            if (this.props.txn_data) {
              this.sendmsg(st);
            }
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
    ////console.log(this.props);
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
            <p className="tokenValueConf">
              {this.props.txn_data ? (
                <span>
                  {web3.utils.fromWei(this.props.amt.toString(), "ether")} ETH
                </span>
              ) : this.props.symbol ? (
                <span>
                  {this.props.amt} {this.props.symbol}
                </span>
              ) : (
                <span>{this.props.amt} ETH</span>
              )}
            </p>
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
                          this.state.gp.fast * 0.000000001 * 52000 * 100000
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
                      height="230px"
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
                <br />
              </div>
            ) : (
              <p />
            )}
            <br />
            {this.spinner()}
            <br />
            <div align="center">
              {this.state.txn_hash.length > 5 ? (
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
                    this.state.gp.standard * 0.000000001 * 52000 * 100000
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
                    this.state.gp.fast * 0.000000001 * 52000 * 100000
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
                    this.state.gp.fastest * 0.000000001 * 52000 * 100000
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

        <br />
        <div className="home">
          <Link
            component={AccountDetailView}
            componentProps={{
              name: "Account 1",
              account: this.state.account
            }}
          >
            <button className=" btn btn-default">Home</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default SendTokensConfirm;
