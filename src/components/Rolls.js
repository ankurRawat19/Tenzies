import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import die from './../images/dice-solid.svg'
import './../App.css'
export default function Rolls(props){
    const styles = {
        color : props.value < 10 ? "green" : "red"
    }
    return(
        <div className="rolls">
            <h1 style={styles}>Number of <img className="dieimg" style={styles} src={die}/> : {props.value}</h1>
        </div>
    )
}