import React, { Component } from 'react'
import NavbarComponent from '../components/NavbarComponent'
import Axios from 'axios';
export default class Setuppage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.location.state,
            selectMenu: ' ',
            form: '',
            inputsTillnow: [],
            payments: [],
            companyName: '',
            AuthType : ''
        }
        this.dropdownRef = React.createRef();
        this.secondDropdownRef = React.createRef();
    }
    async componentDidMount() {
        await Axios.get("/cart")
            .then(res => {
                this.setState({payments : res.data.body})
            })
    }
    goback = () => {
        this.props.history.push('/')
    }
    
    onChangegetValue = () => {
        this.setState({inputsTillnow : [] ,companyName : ''})
        var index = parseInt(this.dropdownRef.current.selectedIndex) -1;
        var datatobeRendered = this.state.payments[index];
        this.renderOptions(datatobeRendered);
        this.setState({companyName : datatobeRendered.company_name})
    }

    handleInput = (e) => {
        var inputsTillnow = this.state.inputsTillnow;
        inputsTillnow.push(e.target.name)
        const to_state = Array.from(new Set(inputsTillnow))
        this.setState({[e.target.name] : e.target.value , inputsTillnow : to_state})
    }

    onSubmit = (event) => {
        event.preventDefault();
        var items = {
            AuthType: this.state.AuthType,
            companyName : this.state.companyName,
        };
        const { inputsTillnow } = this.state;
        inputsTillnow.map((item, key) => {
            return (
                items[item] = JSON.stringify(this.state[item])
            )
        })
        const payload = {
            body: items,
        }
        Axios.post('/cart' , payload)
            .then(res=>alert("Congrats you did it!  "))
    }

    clickFrom = () => {
        this.setState({inputsTillnow : [] , AuthType : ''})
        var index = parseInt(this.secondDropdownRef.current.selectedIndex) - 1;
        var index_outter = parseInt(this.dropdownRef.current.selectedIndex) - 1;
        var datatobeRendered = this.state.payments[index_outter].auth_modes[index];
        this.setState({AuthType : datatobeRendered.name})
        if (datatobeRendered) {
            const form = 
            <form onSubmit ={this.onSubmit}>
                {datatobeRendered.credentials.map((item, key) => {
                    return (
                        <div key = {key}>
                            <label>
                                <span>{item.label}</span>
                                <br/>
                                <input
                                    {...item.safe === true ? {type : "text"} : {type : "password"} }
                                    name = {item.name}
                                    value={this.state.name}
                                    onChange={this.handleInput}
                                    ref = {this.inputRef}
                                />
                            </label>
                        </div>
                        
                    )
                })}
                <input type = "submit" title ="save"/>
            </form>
        this.setState({form})
        }
    }

    renderOptions = (datatobeRendered) => {
        this.setState({selectMenu : '' , form : ''})
        if (datatobeRendered.auth_modes) {
            if (datatobeRendered.auth_modes.length > 1) {
                const selectMenu = 
                    <label>
                        Authorization mode : 
                         <select
                            onClick={() => this.clickFrom()}
                            ref = {this.secondDropdownRef}
                        >
                        <option selected={true} disabled="disabled">select</option>
                        {datatobeRendered.auth_modes.map((item, key) => {
                            return (
                                <option
                                    key ={key}
                                    value={item.auth_mode_type}
                                >
                                    {item.auth_mode_type}
                                </option>
                            )
                        })}
                    </select>
                     </label>
                this.setState({selectMenu})
            } else {
                this.displaySingle(datatobeRendered)
            }
        }
    }

    displaySingle = (val) => {
        const form = 
            <form onSubmit ={this.onSubmit}>
                {val.auth_modes[0].credentials.map((item, key) => {
                    return (
                        <div key = {key}>
                            <label>
                                <span>{item.label}</span>
                                <br/>
                                <input
                                    {...item.safe === true ? {type : "text"} : {type : "password"} }
                                    name = {item.name}
                                    onChange={this.handleInput}
                                    ref = {this.inputRef}
                                />
                            </label>
                        </div>
                        
                    )
                })}
                <input type = "submit"/>
            </form>
        this.setState({form})
    }

    
    render() { 
        return (
            <div>
                <NavbarComponent />
                <div className ="container">
                    {this.state.data === undefined ? this.goback() : <h2>{this.state.data.cartName}</h2>}
                    <span>To begin accepting payments, we need to set up your payment gateway. Select your payment gateway from the drop down menu below. Each gateway has it's own variation on what you need to enter to go live but it's usually two or three different fields. If you're not sure where to find this information it's usually in the account manager area of your payment gateway."</span>
                    <br/>
                    <br/>
                    
                    <select
                        // onClick ={ () => this.onChangegetValue("Aman")}
                        onChange={() => this.onChangegetValue()}
                        ref = {this.dropdownRef}
                    >
                        
                        <option value =" " >select</option>
                        {this.state.payments.map((key, item) => {
                            return (
                                <option
                                    key = {key.gateway_type}
                                    value={key.name}
                                >{key.name}
                                </option>
                            )
                        })}
                    </select>
                    <br />
                    <br />
                    {this.state.selectMenu}
                    {this.state.form}
                </div>
            </div>
        )
    }
}