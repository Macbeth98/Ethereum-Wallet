import React, { Component } from "react";
import "./secondsidebarcontent.css";
import SecondSChildone from "../SSChildone/SecondSChildone";
import SecondSChildtwo from "../SecondSChildtwo/SecondSChildtwo";
//import SecondSChildthree from "../SecondSChildthree/SecondSChildthree";

class SecondSidebarContent extends Component {
  render() {
    return (
      <div className="SecondSidebarContent">
        <SecondSChildone name={this.props.name} account={this.props.account} />
        <SecondSChildtwo
          secondToggle={this.props.secondToggle}
          name={this.props.name}
          account={this.props.account}
        />
        {/*<SecondSChildthree
          name={this.props.name}
          account={this.props.account}
        />*/}
      </div>
    );
  }
}

export default SecondSidebarContent;
