/* global chrome */

import React, { Component } from "react";
import ExtNavBar from "../ExtTopNavbar/ExtNavBar";
import { Link, goBack } from "route-lite";
import "./readSeedWord.css";
import SHA256 from "crypto-js/sha256";
import SeedPhraseReveal from "../SeedPhraseRevel/SeedPhraseReveal";

const Verify = props => {
  let pwd = SHA256(props.pass).toString();
  if (pwd === props.hash) {
    return <SeedPhraseReveal password={props.hash}/>;
  } else {
    return <ReadSeedWords mssg="Wrong Password!!!" />;
  }
};

// class Verify extends Component {
//   state = {
//     seed: " ",
//     set: ""
//   };
//
//   componentDidMount() {
//     let pwd = SHA256(this.props.pass).toString();
//     if (pwd === this.props.hash) {
//       chrome.storage.local.get(
//         "mnemonic",
//         async function(data) {
//           console.log(data.mnemonic);
//           await this.setState({
//             seed: data.mnemonic,
//             set: "Ok"
//           });
//         }.bind(this)
//       );
//     }
//   }
//   render() {
//     if (this.state.set.length > 0) {
//       console.log("pwd matched");
//       return <SeedPhraseReveal seed={this.state.seed} />;
//     } else {
//       console.log("Wrong!!");
//       return <ReadSeedWords mssg="Wrong Password!!!" />;
//     }
//   }
// }

class ReadSeedWords extends Component {
  state = {
    extPassword: "",
    hash: "",
    msg: ""
  };

  async componentDidMount() {
    if (this.props.mssg) {
      console.log("ooo" + this.props.mssg);
      this.setState({
        msg: this.props.mssg
      });
    }
    chrome.storage.local.get(
      "pwd",
      async function(data) {
        console.log(data.pwd);
        await this.setState({
          hash: data.pwd
        });
      }.bind(this)
    );
  }
  handleChange = e => {
    this.setState({
      extPassword: e.target.value
    });
  };
  render() {
    const isEnabled = this.state.extPassword.length > 4;
    return (
      <div>
        <ExtNavBar />
        <div className="secondContainer">
          <h1 style={{ fontWeight: "900", color: "#1b2443" }}>Seed Phrase</h1>
          <div className="settingContainer">
            <p style={{ textAlign: "justify" }}>
              If you ever change browsers or move computers, you will need this
              seed phrase to access your accounts. Save them somewhere safe and
              secret.
            </p>
            <hr style={{ height: "1px", backgroundColor: "#b7b7b7" }} />
            <p style={{ textAlign: "justify", fontWeight: "900" }}>
              <i
                style={{ color: "red", fontSize: "24px" }}
                className="fas fa-exclamation-triangle"
              />{" "}
              DO NOT share this phrase with anyone!
            </p>
            <p style={{ textAlign: "justify" }}>
              These words can be used to steal all your accounts.
            </p>
            <br />
            <form>
              <div className="centeringform">
                <div className="form-group cstFormGrp">
                  <label style={{ color: "#a5a3a3", float: "left" }}>
                    Enter password to continue
                  </label>
                  <input
                    required
                    className="passwordBox form-control"
                    id="extPassword"
                    type="password"
                    pattern=".{4,}"
                    autoComplete="off"
                    onChange={this.handleChange}
                  />
                  {this.state.msg}
                </div>
              </div>
              <div className="btngrp">
                <button
                  type="button"
                  className=" btn btn-danger cancelImpButton"
                  onClick={() => goBack()}
                >
                  Cancel
                </button>
                <Link
                  component={Verify}
                  componentProps={{
                    pass: this.state.extPassword,
                    hash: this.state.hash
                  }}
                >
                  <button
                    type="submit"
                    disabled={!isEnabled}
                    className=" btn btn-primary importButton"
                  >
                    Next
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ReadSeedWords;
