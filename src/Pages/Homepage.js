import React, { Component } from 'react'
import NavbarComponent from '../components/NavbarComponent'
import Searchcomponent from '../components/searchcomponent'

export default class Homepage extends Component {
    render() {
        return (
            <div>
                <NavbarComponent />
                <div className = "container">
                    <h3>Welcome!</h3>
                    <span> Food carts is the best solutionfor managing everything you need when it comes to accepting payments with your Food Cart.We support more than 60 + different payment gateways so you can work with your favorite option.Better still, we make it easy to change gateways without losing your customer data!You worry about making the world 's yummiest food and we'
                    ll take care of the payments side.</span>
                </div>
                <Searchcomponent data={this.props} /> 
                {console.log(this.state)}
            </div>
        )
    }
}
