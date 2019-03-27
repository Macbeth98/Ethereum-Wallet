import React, { Component } from 'react';
import './profileAccount.css';
import ProfileDropDown from './profileDropdown/ProfileDropDown'

class ProfileAndAccount extends Component {
    state={
        dropDownVis:false
    }

    toggleDropDown=()=>{
        this.setState({
            dropDownVis: !this.state.dropDownVis
        })
    }
    render() {
        return (
            <span>
                <span onClick={this.toggleDropDown} className="profileImage">

                </span>
                {this.state.dropDownVis?<ProfileDropDown toggle={this.toggleDropDown}/>:""}
            </span>
        );
    }
}

export default ProfileAndAccount;