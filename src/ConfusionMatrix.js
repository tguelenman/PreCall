import React, {Component} from 'react'
import {ConfusionUtil} from "./ConfusionUtil";
import "./styling/ConfusionMatrix.css"

export default class ConfusionMatrix2 extends Component {

    render() {
        return (
            <div className='confusionMatrixGrid'>
                <div className='frame topLeft'>
                    b
                </div>
                <div className='frame topRight'>
                    a
                </div>
            </div>
        );
    }
}
