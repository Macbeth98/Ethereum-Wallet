import React, { Component } from "react";
import "./SecondSChildtwo.css";
import axios from "axios";
import { Link } from "route-lite";
//import Token_Display from "../Token_Display/Token_Display";
import NewAccountCard from "../newAccountCard/NewAccountCard";

//http://api.ethplorer.io/getAddressInfo/0xa969c1D98e4754Eff010A6daE217dC5c4a9c24aA?apiKey=freekey

class SecondSChildtwo extends Component {
  state = {
    tokens: [],
    bool: true
  };

  async componentDidUpdate() {
    if (this.state.bool) {
      //console.log(this.props.account.address);
      // let res = await axios.get(
      //   `https://blockscout.com/eth/mainnet/api?module=account&action=tokenlist&address=${
      //     this.props.account.address
      //   }`
      // );
      //

      let res = await axios({
        method: "get",
        url: `https://web3api.io/api/v1/addresses/${
          this.props.account.address
        }/tokens`,
        headers: { "x-api-key": "UAKa847d22b077024a71df262511733a446" }
      });
      if (res.data.status) {
        await this.setState({
          tokens: res.data.payload ? res.data.payload.records : [],
          bool: false
        });
      }
    }
  }

  change = async () => {
    //console.log("In Change");
    // let res = await axios.get(
    //   `https://blockscout.com/eth/rinkeby/api?module=account&action=tokenlist&address=${
    //     this.props.account.address
    //   }`
    // );
    // //console.log(res.data);
    await this.setState({
      bool: true
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    //console.log("Should Update");
    if (this.props.account.address !== nextProps.account.address) {
      //console.log("Go to Chnage");
      this.change();
      //console.log("back from chnage");
      return this.props.account.address !== nextProps.account.address;
    } else {
      return true;
    }
  }

  render() {
    return (
      <div className="SecondSChildtwo">
        {this.state.tokens.map(token => {
          return (
            <div
              className="tokenSSCParent"
              onClick={this.props.secondToggle}
              key={token.id}
            >
              <Link
                component={NewAccountCard}
                componentProps={{
                  token: token,
                  name: this.props.name,
                  account: this.props.account
                }}
              >
                <div className="tokenValue">
                  <h4>
                    {(token.decimals.length &&
                      token.address !==
                        "0xb552c78e84f684fd3cd8dd97d73ff9d006d991a0") > 0
                      ? (token.amount / 10 ** parseInt(token.decimals)).toFixed(
                          3
                        )
                      : token.amount}{" "}
                    {token.symbol}
                  </h4>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default SecondSChildtwo;

// state = {
//     tokenValue: [
//         { id: 1, tokenName: "ETH", tokenAmount: 7235, tokenTime: 56, tokenAvatar: Profile },
//         { id: 2, tokenName: "STH", tokenAmount: 75, tokenTime: 16, tokenAvatar: Profile },
//         { id: 3, tokenName: "STH", tokenAmount: 75, tokenTime: 16, tokenAvatar: Profile },
//         { id: 4, tokenName: "STH", tokenAmount: 75, tokenTime: 16, tokenAvatar: Profile },
//         { id: 5, tokenName: "STH", tokenAmount: 75, tokenTime: 16, tokenAvatar: Profile },
//     ]
// }
