import React, { Component } from "react";
import "./history.css";
import Ethereum from "../../Image/Ethereum.svg";
//import { ethers } from "ethers";
import axios from "axios";
//import { UncontrolledCollapse, CardBody, Card } from "reactstrap";
import web3 from "../Web3/Web3";
import Arrow from "../../Image/arrow.jpg";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txn: [],
      bool: true
    };
  }

  async componentWillMount() {
    //console.log(this.props.account.address, "In Historyrrrrrrrrrrrr!");
    //try {
    let data = await axios.get(
      `http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${
        this.props.account.address
      }&sort=desc`
    );
    let tx = data.data.result;
    console.log(tx);
    await this.setState({
      txn: tx
    });
    //console.log(this.state.Txn);
    //} catch (e) {}
  }

  async componentDidUpdate() {
    //console.log(this.props.account.address, "In Historyrrrrrrrrrrrr!");
    //try {
    if (this.state.bool) {
      let data = await axios.get(
        `http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${
          this.props.account.address
        }&sort=desc`
      );
      let tx = data.data.result;
      console.log(tx);
      await this.setState({
        txn: tx,
        bool: false
      });
    }
    //console.log(this.state.Txn);
    //} catch (e) {}
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
    console.log(this.state.txn);
    //var i = 0;
    //for (i = 0; i < 2; i++) {
    if ("Error! Invalid address format" == this.state.txn) {
      return <h1>Loading....</h1>;
    } else {
      //try {
      return (
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
                      <span style={{ fontSize: "10px" }} className="text-muted">
                        {this.dd(txn.timeStamp)} {txn.from}
                      </span>
                      <span style={{ fontWeight: "900" }}>
                        {this.message(txn.from, this.props.account.address)}
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
                        href={`https://rinkeby.etherscan.io/tx/${txn.hash}`}
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
      );
      //  } catch (e) {}
    }
  }
  //}
}

export default History;
