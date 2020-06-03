import React, { Component } from 'react'


export default class Square extends Component {

    boxClick = () => {


        if (this.props.value === null) {
            return this.props.boxClick(this.props.id)
        }
        else {
            return
        }

    }

    render() {

        if (this.props.value === 'x') {
            return <div className="redValue"><img width="100" height="100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS4A4RzV8EcCjyvRwNaZ1WHPdSXmJqtKxqFNa9cOZClbBMnFQ4i&usqp=CAU"></img></div>
        }
        else if (this.props.value === 'o') {
            return <div><img width="100" height="100" src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/shape_circle.png"></img></div>
        }
        return (

            <div className="square" onClick={this.boxClick}>
                {this.props.id}
                <div className="redValue">{this.props.value}</div>
            </div>
        )
    }
}
