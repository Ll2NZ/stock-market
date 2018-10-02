import React         from "react";
import { Component } from "react";
import "./exceededCallLimit.scss";

class ExceededCallLimit extends Component{
    render(){
        return(
            <div className="too-many-calls">
                <div>
                    <strong>Warning!</strong> Can only call 5 stocks per minute. Please wait a few seconds and try again.
                </div>
                <a className="too-many-calls__message--toggler">X</a>
            </div>
        );
    }
}

export default ExceededCallLimit;
