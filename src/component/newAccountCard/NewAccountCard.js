import React, { Component } from "react";
import ExtNavBar from "../ExtTopNavbar/ExtNavBar";
import SecondNavbar from "../SecondNavbar/SecondNavbar";
import "./newAccountCard.css";
import NewDetailView from "../newDetailView/NewDetailView";
import NewHistory from "../NewHistory/NewHistory";

class NewAccountCard extends Component {
  render() {
    return (
      <div>
        <ExtNavBar />
        <SecondNavbar name={this.props.name} account={this.props.account} />
        <div className="AccountDetailView">
          <NewDetailView
            name={this.props.name}
            account={this.props.account}
            token={this.props.token}
          />
          <span style={{ paddingLeft: "12px", color: "#888888" }}>History</span>
          <NewHistory
            name={this.props.name}
            account={this.props.account}
            token={this.props.token}
            decimals={this.props.token.decimals.length>0? parseInt(this.props.token.decimals): 0 }
          />
        </div>
      </div>
    );
  }
}

export default NewAccountCard;
