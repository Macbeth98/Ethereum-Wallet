import React, { Component } from "react";
import Ethereum from "../../Image/Ethereum.svg";
//import { UncontrolledCollapse, CardBody, Card } from "reactstrap";
import axios from "axios";
//import web3 from "../Web3/Web3";
import Arrow from "../../Image/arrow.jpg";

class NewHistory extends Component {
  state = {
    token: [],
    address: "",
    bool: true
  };

  async componentWillMount() {
    let res = await axios.get(
      `https://blockscout.com/eth/mainnet/api?module=account&action=tokentx&address=${
        this.props.account.address
      }&contractaddress=${this.props.token.contractAddress}&sort=desc`
    );
    //console.log(res.data.result);
    await this.setState({
      token: res.data.result
    });
    //console.log(this.state.token);
  }

  async componentDidUpdate() {
    if (this.state.bool) {
      let res = await axios.get(
        `https://blockscout.com/eth/mainnet/api?module=account&action=tokentx&address=${
          this.props.account.address
        }&contractaddress=${this.props.token.address}&sort=desc`
      );
      //console.log(res.data.result);
      await this.setState({
        token: res.data.result,
        bool: false
      });
      //console.log(this.state.token);
    }
  }

  async shouldComponentUpdate(nextProps, nextState) {
    if (this.props.token !== nextProps.token) {
      await this.setState({
        bool: true
      });
      return this.props.token !== nextProps.token;
    } else {
      return true;
    }
  }
  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  message = (from1, address) => {
    // //console.log(from1, address);
    // //console.log(this.state.address);
    if (from1.toLowerCase() === address.toLowerCase()) {
      return <span>Sent Tokens</span>;
    } else {
      return <span>Received Tokens</span>;
    }
  };

  dd = timestamp => {
    ////console.log(timestamp);
    var d = new Date(timestamp * 1000);
    ////console.log(d);
    var dd = d.toString().slice(0, 33);
    ////console.log(dd, typeof(d));
    return dd;
  };

  render() {
    const {decimals} = this.props;
    return (this.state.token && this.state.token.length>0) ? (
      <div className="history">
        {this.state.token.map(tokenDetail => {
          return (
            <div className="parentHistory" key={tokenDetail.nonce}>
              <div className="tokenBoxhistory" id={tokenDetail.nonce}>
                <div className="logotoken" style={{ display: "flex" }}>
                  <img
                    src={Ethereum}
                    style={{ height: "46px", marginTop: "6px" }}
                    alt=""
                  />
                  <span className="valuePositioning">
                    <span style={{ fontSize: "10px" }} className="text-muted">
                      {this.dd(tokenDetail.timeStamp)}
                    </span>
                    <span style={{ fontWeight: "900" }}>
                      {this.message(
                        tokenDetail.from,
                        this.props.account.address
                      )}
                    </span>
                    <span className="confirmedBox">
                      {tokenDetail.confirmations} confirmations
                    </span>
                  </span>
                </div>
                <div className="tokenAmount valuePositioning">
                  <span style={{ fontWeight: "900" }}>
                    {(tokenDetail.value/(10 ** decimals)).toFixed(3)} {tokenDetail.tokenSymbol}
                  </span>
                  {/*<span>{tokenDetail.amountUSD} USD</span>*/}
                  <span>
                    {" "}
                    <a
                      href={`https://etherscan.io/tx/${tokenDetail.hash}`}
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
              {/* <UncontrolledCollapse toggler={tokenDetail.nonce}>
                        <Card>
                            <CardBody className="cstmbdycrd">
                            <div>
                            <p className="text-muted">Details</p>
                            <div className="FromTo" style={{ display: "flex" }}>
                                From : <div className="Fromone">{tokenDetail.from}</div> > To : <div className="totwo">{tokenDetail.to}</div>
                            </div>
                            <div className="transactionLabel">
                                <p className="text-muted">Transaction</p>
                            </div>
                            <div className="trnsactionItem">
                                <span>Amount</span>
                                <span style={{fontWeight:"bold"}}>{tokenDetail.value} {tokenDetail.tokenSymbol}</span>
                            </div>
                            <div className="trnsactionItem">
                                <span>Gas Limit (Units)</span>
                                <span style={{fontWeight:"bold"}}>{tokenDetail.gas} ETH</span>
                            </div>
                            <div className="trnsactionItem">
                                <span>Gas Used (Units)</span>
                                <span style={{fontWeight:"bold"}}>{tokenDetail.gasUsed} ETH</span>
                            </div>
                            <div className="trnsactionItem">
                                <span>Gas Price (GWEI)</span>
                                <span style={{fontWeight:"bold"}}>{tokenDetail.gasPrice} ETH</span>
                            </div>
                            <div className="trnsactionItem">
                                <span>Total</span>
                                <span style={{fontWeight:"bold"}}>{tokenDetail.gas} ETH</span>
                            </div>
                            <div className="trnsactionItem" style={{border:"none"}}>
                                <span></span>
                                <span style={{fontWeight:"bold"}}>$0.01 USD</span>
                            </div>
                            <div className="transactionLabel" style={{borderBottom:"1px solid #dcdcdc"}}>
                                <p className="text-muted">Activity Log</p>
                            </div>
                            <div className="stylingTimeline"><div><i className="fas fa-check-circle paddingleft"></i></div><div style={{marginLeft:"12px"}}>Transaction created with a value of 0 ETH at 23:28 on 1/22/2019 </div></div>
                            <div className="stylingTimeline"><div><i className="fas fa-arrow-circle-right paddingleft"></i></div><div style={{marginLeft:"12px"}}>Transaction created with a value of 0 ETH at 23:28 on 1/22/2019 </div></div>
                            <div className="stylingTimeline"><div><i className="fas fa-check-circle paddingleft"></i></div><div style={{marginLeft:"12px"}}>Transaction confirmed at 23:29 on 1/22/2019</div></div>
                        </div>
                            </CardBody>
                        </Card>
                    </UncontrolledCollapse>
                    */}
            </div>
          );
        })}
      </div>
    ) : (
      <p align="center">
        <br />
        <br />
        <br />
        <br />
        <br />
        <strong> No transactions found! </strong>
      </p>
    );
  }
}

export default NewHistory;
