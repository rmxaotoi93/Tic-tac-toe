import React, { Component } from 'react'


export default class Square extends Component {
    
    boxClick= () =>{
        
        
        if(this.props.value === null){
            return this.props.boxClick(this.props.id)
        }
        else{
            return ;
        }
   
    }
   
    render() {
        return (
            <div className="square" onClick={this.boxClick}>
            x{this.props.id}
        <div className="redValue">{this.props.value}</div>
            </div>
        )
    }
}
