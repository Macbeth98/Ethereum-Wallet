import React, { Component } from 'react';
import ExtNavBar from './ExtTopNavbar/ExtNavBar';
import { goBack } from 'route-lite';

class Test extends Component {
    render() {
        return (
            <div>
                <ExtNavBar />
                <div style={{overflowY:"scroll",height:"550px"}}>

                    <span style={{marginTop:"50px"}} onClick={() => goBack()}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Nesciunt, labore temporibus nisi architecto minus exercitationem 
                    autem officiis obcaecati odit dolore sequi itaque vitae iusto, 
                    ducimus qui voluptatibus natus eligendi pariatur?</p>
                </span>
                </div>
            </div>

        );
    }
}

export default Test;