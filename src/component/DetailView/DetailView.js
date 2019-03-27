import React, { Component } from "react";
import "./detailView.css";
import { Link } from "route-lite";
import web3 from "../Web3/Web3";
import Ethereum from "../../Image/Ethereum.svg";
import Send from "../Sent/Sent";
import Deposit from "../Deposit/Deposit";
import axios from "axios";
import Arrow from "../../Image/arrow.jpg";
import "./history.css";
import Loader from "react-loader-spinner";
import SendETHConfirm from "../sendETHConfirm/sendETHConfirm";

class DetailView extends Component {
  constructor(props) {
    super(props);
    //console.log("In constructpr");
    //console.log(this.props.name, this.props.account.address);
    this.state = {
      seed: "a",
      account: this.props.account,
      default_balance: "",
      priv_key: "",
      usd: "",
      txn: [],
      bool: true
    };
  }

  async componentDidMount() {
    //console.log(this.props.name + "%%" + this.props.account);
    let weibal = await web3.eth.getBalance(this.props.account.address);
    let balance = await web3.utils.fromWei(weibal, "ether");
    balance = Math.round(balance * 10000) / 10000;
    let data = await axios.get(
      `http://api.etherscan.io/api?module=account&action=txlist&address=${
        this.props.account.address
      }&sort=desc`
    );
    let tx = data.data.result.slice(0, 15);
    // console.log(tx);
    // await this.setState({
    //   txn: tx
    // });
    await this.setState({
      default_balance: balance,
      default_addr: this.props.account.address,
      priv_key: this.props.account.privateKey,
      txn: tx
    });
  }

  async componentDidUpdate() {
    let values = async () => {
      //console.log(this.props.name + "%%" + this.props.account);
      if (this.state.bool) {
        let data = await axios.get(
          `http://api.etherscan.io/api?module=account&action=txlist&address=${
            this.props.account.address
          }&sort=desc`
        );
        let tx = data.data.result.slice(0, 15);
        //console.log(tx);
        await this.setState({
          txn: tx,
          bool: false
        });

        let weibal = await web3.eth.getBalance(this.props.account.address);
        let balance = await web3.utils.fromWei(weibal, "ether");
        balance = Math.round(balance * 10000) / 10000;
        var tickers = await axios.get(
          "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,BTC"
        );

        let usd = balance * tickers.data.USD;
        usd = Math.round(usd * 100000) / 100000;
        //console.log(usd);
        await this.setState({
          default_balance: balance,
          default_addr: this.props.account.address,
          priv_key: this.props.account.privateKey,
          usd: usd
        });
      }
    };
    values();
  }

  async shouldComponentUpdate(nextProps, nextState) {
    if (this.props.account !== nextProps.account) {
      await this.setState({
        bool: true
      });
      return this.props.account !== nextProps.account;
    } else {
      return this.props.account === nextProps.account;
    }
  }

  message = (from1, address) => {
    // console.log(from1, address);
    // console.log(this.state.address);
    if (from1.toLowerCase() === address.toLowerCase()) {
      return <span>Sent ETH</span>;
    } else {
      return <span>Received ETH</span>;
    }
  };

  dd = timestamp => {
    //console.log(timestamp);
    var d = new Date(timestamp * 1000);
    //console.log(d);
    var dd = d.toString().slice(0, 33);
    //console.log(dd, typeof(d));
    return dd;
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  render() {
    if ("Error! Invalid address format" == this.state.txn) {
      return (
        <div>
          <h1 align="center">Loading....</h1>
          <div align="center">
            <Loader type="Triangle" color="#182542" height="250" width="250" />
          </div>
        </div>
      );
    } else {
      if (this.props.amt && this.props.to) {
        console.log("In detail view");
        console.log(this.props.amt);
        return (
          <SendETHConfirm
            address={this.props.account.address}
            balance={this.state.default_balance}
            name={this.props.name}
            to={this.props.to}
            amt={this.props.amt}
            priv_key={this.props.account.privateKey}
          />
        );
      } else {
        return (
          <div className="DetailView1">
            <img src={Ethereum} alt="eth" />
            <h4 className="textStyle">{this.state.default_balance} ETH</h4>
            <p className="textStyle">{this.state.usd} USD</p>
            <div className="btn-group">
              <Link
                component={Deposit}
                componentProps={{
                  address: this.state.default_addr,
                  name: this.props.name
                }}
              >
                <button className="btn btn-primary cstmdepoandsndstyle">
                  Deposit
                </button>
              </Link>
              <Link
                component={Send}
                componentProps={{
                  address: this.state.default_addr,
                  balance: this.state.default_balance,
                  name: this.props.name,
                  priv_key: this.state.priv_key,
                  usd: this.state.usd
                }}
              >
                <button className="btn btn-success cstmdepoandsndstyle">
                  {" "}
                  Send
                </button>
              </Link>
            </div>
            <span style={{ paddingLeft: "12px", color: "#888888" }}>
              History
            </span>
            {this.state.txn[0] ? (
              <div className="history">
                {this.state.txn.map(txn => {
                  return (
                    <div className="parentHistory" key={txn.nonce}>
                      <div className="tokenBoxhistory" id={txn.nonce}>
                        <div className="logotoken" style={{ display: "flex" }}>
                          <img
                            src={Ethereum}
                            style={{ height: "46px", marginTop: "6px" }}
                            alt=""
                          />
                          <span className="valuePositioning">
                            <span
                              style={{ fontSize: "10px" }}
                              className="text-muted"
                            >
                              {this.dd(txn.timeStamp)}
                            </span>
                            <span style={{ fontWeight: "900" }}>
                              {this.message(
                                txn.from,
                                this.props.account.address
                              )}
                            </span>
                            <span className="confirmedBox">
                              {txn.confirmations} confirmations
                            </span>
                          </span>
                        </div>
                        <div className="tokenAmount valuePositioning">
                          <span style={{ fontWeight: "900" }}>
                            {web3.utils.fromWei(txn.value, "ether")} ETH
                          </span>
                          {/*<span>{txn.amountUSD} USD</span>*/}
                          <span>
                            {" "}
                            <a
                              href={`https://etherscan.io/tx/${txn.hash}`}
                              target="_blank"
                            >
                              <img
                                src={Arrow}
                                width="20px"
                                height="20px"
                                style={{ float: "right" }}
                                alt="View on Etherscan"
                              />
                            </a>{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <strong> No transactions found! </strong>
              </p>
            )}
          </div>
        );
      }
    }
  }
}

export default DetailView;
