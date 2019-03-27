import React, { Component } from 'react';
import './selectToken.css';

class SelectToken extends Component {
    render() {
        return (
            <span>
                <select className="TokenSelect">
                    <option value="volvo">Main Ethereum Network</option>
                </select>
            </span>
        );
    }
}

export default SelectToken;