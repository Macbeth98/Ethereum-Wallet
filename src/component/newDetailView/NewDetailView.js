import React, { Component } from "react";
import { Link } from "route-lite";
import Ethereum from "../../Image/Ethereum.svg";
import Send_Tokens from "../Send_Tokens/Send_Tokens";
import SendTokensConfirm from "../SendTokensConfirm/SendTokensConfirm";

class NewDetailView extends Component {
  render() {
    if (this.props.data) {
      return (
        <div>
          <SendTokensConfirm
            address={this.props.account.address}
            name={this.props.name}
            to={this.props.to}
            amt={this.props.value}
            priv_key={this.props.account.privateKey}
            tok_address={this.props.tok_address}
            txn_data={this.props.data}
          />
        </div>
      );
    } else {
      const {token} = this.props;
      return (
        <div className="DetailView">
          <h4 className="textStyle">{this.props.token.name}</h4>
          <img src={Ethereum} alt="eth" />
          <h4 className="textStyle">
            {token.decimals.length>0? (this.props.token.balance/(10 ** parseInt(token.decimals))).toFixed(3): token.balance} {this.props.token.symbol}
          </h4>
          <div className="btn-group">
            <Link
              component={Send_Tokens}
              componentProps={{
                account: this.props.account,
                name: this.props.name,
                token: this.props.token,
                decimals: token.decimals.length>0? parseInt(token.decimals): 0
              }}
            >
              <button className="btn btn-success cstmdepoandsndstyle">
                {" "}
                Send
              </button>
            </Link>
          </div>
        </div>
      );
    }
  }
}

export default NewDetailView;
