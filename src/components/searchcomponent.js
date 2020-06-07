import React, { useState } from 'react'


const Searchcomponent = (props) => {
    const [cartName, setCartName] = useState('');


    const onSubmit = (event) => {
        event.preventDefault();
        console.log(cartName);
        props.data.history.push({
            pathname: '/cart',
            state: {
                cartName
            }
        })
    }


    return (
        <div className ="container">
            <form onSubmit= {onSubmit}>
                <label><h5>Create a account</h5></label>
                <div className ="container">
                    <label>
                        Cart Name 
                         <input
                            type="text"
                            value={cartName}
                            onChange ={event => setCartName(event.target.value)}
                        />
                    </label>
                    
                    <br />
                    <br/>
                    <input type="submit" />
                </div>
            </form>
        </div>
    )
}

export default Searchcomponent;
