/* global chrome */

import React, { Component } from "react";
import web3 from "../Web3/Web3";
import { Link } from "route-lite";
import AccountDetailView from "../AccountDetailView/AccountDetailView";
import "./accountList.css";
import CryptoJS from "crypto-js";
//import Profile from "../../Image/profile.svg";

class AccountList extends Component {
  state = {
    accounts: [],
    acc_names: [],
    ary: [],
    balances: [],
    password: ""
  };

  async componentWillMount() {
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
      async function(data) {
        //  console.log(data.accounts)
        //console.log(typeof (data.accounts))
        let bytes = CryptoJS.AES.decrypt(data.accounts, this.state.password);
        let accounts = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        //  console.log(accounts);

        await this.setState({
          accounts: [...this.state.accounts, ...accounts]
        });
        //  console.log(this.state.accounts);

        let weibal;
        let balance;
        for (let i = 0; i < this.state.accounts.length; i++) {
          //  console.log(i);
          weibal = await web3.eth.getBalance(this.state.accounts[i].address);
          balance = await web3.utils.fromWei(weibal, "ether");
          balance = Math.round(balance * 10000) / 10000;

          await this.setState({
            balances: [...this.state.balances, balance]
          });
        }
      }.bind(this)
    );

    chrome.storage.local.get(
      "acc_names",
      async function(data) {
        //  console.log(data);
        await this.setState({
          acc_names: [...this.state.acc_names, ...data.acc_names]
        });
        //  console.log(this.state.acc_names);
      }.bind(this)
    );
  }

  render() {
    const { acc_names, accounts, balances } = this.state;
    return (
      <div className="AccountList">
        {accounts.map((val, index) => {
          return (
            <Link
              component={AccountDetailView}
              componentProps={{
                name: acc_names[index],
                account: val
              }}
            >
              <div
                className="userAccount"
                style={{ color: "white" }}
                onClick={this.props.toggle}
              >
                <div className="userName">
                  <span style={{ display: "block", fontWeight: "bold" }}>
                    {acc_names[index]}
                  </span>
                  <span>{balances[index]} ETH</span> <br />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default AccountList;

// state = {
//   // userAccountDetail: [
//   //   { id: "1", name: "shorupan", amount: "100", avatar: Profile },
//   //   { id: "2", name: "sushil", amount: "0", avatar: Profile }
//   //   // { id: "3", name: "Kishore", amount: "0", avatar:Profile },
//   //   // { id: "4", name: "chiranjeevi", amount: "0", avatar:Profile },
//   //   // { id: "5", name: "shudanshu", amount: "0", avatar:Profile },
//   // ]
// };

// {this.state.userAccountDetail.map(user => {
//   return (
//     <div
//       className="userAccount"
//       style={{ color: "white" }}
//       key={user.id}
//     >
//       <img
//         style={{ width: "30px", marginLeft: "10px" }}
//         src={user.avatar}
//         alt=""
//       />
//       <div className="userName">
//         <span style={{ display: "block", fontWeight: "bold" }}>
//           {user.name}
//         </span>
//         <span>{user.amount} ETH</span>
//       </div>
//     </div>
//   );
// })
//
// <img
//   style={{ width: "30px", marginLeft: "10px" }}
//   src={user.avatar}
//   alt=""
// />
