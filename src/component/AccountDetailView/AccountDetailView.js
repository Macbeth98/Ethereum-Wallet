/* global chrome */

import React, { Component } from "react";
import ExtNavBar from "../ExtTopNavbar/ExtNavBar";
import SecondNavbar from "../SecondNavbar/SecondNavbar";
import DetailView from "../DetailView/DetailView";
import "./AccountDetailView.css";
import sendETHConfirm from "../sendETHConfirm/sendETHConfirm";
import NewDetailView from "../newDetailView/NewDetailView";
//import History from "../history/History";

class AccountDetailView extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    account: "",
    message: ""
  };
  async componentWillMount() {
    await this.setState({
      account: this.props.account
    });

    chrome.runtime.sendMessage({ name: "from_extension" });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log(message.data);
      this.setState({
        message: message.data
      });
      sendResponse({ reply: "got data" });
    });
  }

  // rep = () => {
  //   var i = 0;
  //   for (i = 0; i < 1000001; i++) {
  //     if (i === 1000000) {
  //       return <History account={this.state.account} />;
  //     }
  //   }
  // };
  render() {
    if (this.state.message.name === "send_eth") {
      console.log("In acc detail view");
      return (
        <div>
          <DetailView
            name={this.props.name}
            account={this.props.account}
            amt={this.state.message.value}
            to={this.state.message.to}
          />
        </div>
      );
    } else if (this.state.message.name === "token_interaction") {
      return (
        <div>
          <NewDetailView
            data={this.state.message.data}
            to={this.state.message.to}
            value={this.state.message.value}
            account={this.props.account}
            name={this.props.name}
            tok_address={this.state.message.token_address}
          />
        </div>
      );
    } else {
      return (
        <div>
          <ExtNavBar />
          <SecondNavbar name={this.props.name} account={this.props.account} />
          <div className="AccountDetailView">
            <DetailView name={this.props.name} account={this.props.account} />
            {/*<span style={{ paddingLeft: "12px", color: "#888888" }}>History</span>
              <History account={this.props.account} />*/}
          </div>
        </div>
      );
    }
  }
}

export default AccountDetailView;
