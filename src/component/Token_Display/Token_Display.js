import React from "react";
import { Link, goBack } from "route-lite";
import Send_Tokens from "../Send_Tokens/Send_Tokens";

class Token_Display extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.name}</p>
        <p>{this.props.account.address}</p>
        <p>{this.props.token.name}</p>
        <p>{this.props.token.symbol}</p>
        <p>{this.props.token.balance}</p>
        <p>{this.props.token.contractAddress}</p>
        <p />
        <Link
          component={Send_Tokens}
          componentProps={{
            account: this.props.account,
            name: this.props.name,
            token: this.props.token
          }}
        >
          <button>Send</button>
        </Link>
        <p />
        <button onClick={() => goBack()}>Go Back!</button>
      </div>
    );
  }
}

export default Token_Display;
