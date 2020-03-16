import React, {Component} from 'react'
import {ConfusionUtil} from "./ConfusionUtil";
import "./styling/ConfusionMatrix.css"
import ConfusionFilter from "./ConfusionFilter";

export default class ConfusionMatrix2 extends Component {

    render() {
        return (
            <div className='confusionMatrixGrid'>
                <div className='confusionHeading'>
                    <h2>Confusion Matrix</h2>
                </div>
                <div className='frame topLeft'>
                    <div className='confusionLabel'>
                        {this.props.confusion.tp}
                    </div>
                    <ConfusionFilter data={this.props.data}
                                     callback={this.props.callback}
                                     currentThreshold={this.props.threshold}
                                     confusionValue={'TP'}
                                     buttonType={'-'}
                    />
                    <ConfusionFilter data={this.props.data}
                                     callback={this.props.callback}
                                     currentThreshold={this.props.threshold}
                                     confusionValue={'TP'}
                                     buttonType={'+'}
                    />
                </div>
                <div className='frame topRight'>
                    <div className='confusionLabel'>
                        {this.props.confusion.fp}
                    </div>
                    <ConfusionFilter data={this.props.data}
                                     callback={this.props.callback}
                                     currentThreshold={this.props.threshold}
                                     confusionValue={'FP'}
                                     buttonType={'-'}
                    />
                    <ConfusionFilter data={this.props.data}
                                     callback={this.props.callback}
                                     currentThreshold={this.props.threshold}
                                     confusionValue={'FP'}
                                     buttonType={'+'}
                    />
                </div>
                <div className='frame bottomLeft'>
                    <div className='confusionLabel'>
                        {this.props.confusion.fn}
                    </div>
                    <ConfusionFilter data={this.props.data}
                                     callback={this.props.callback}
                                     currentThreshold={this.props.threshold}
                                     confusionValue={'FN'}
                                     buttonType={'-'}
                    />
                    <ConfusionFilter data={this.props.data}
                                     callback={this.props.callback}
                                     currentThreshold={this.props.threshold}
                                     confusionValue={'FN'}
                                     buttonType={'+'}
                    />
                </div>
                <div className='frame bottomRight'>
                    <div className='confusionLabel'>
                        {this.props.confusion.tn}
                    </div>
                    <ConfusionFilter data={this.props.data}
                                     callback={this.props.callback}
                                     currentThreshold={this.props.threshold}
                                     confusionValue={'TN'}
                                     buttonType={'-'}
                    />
                    <ConfusionFilter data={this.props.data}
                                     callback={this.props.callback}
                                     currentThreshold={this.props.threshold}
                                     confusionValue={'TN'}
                                     buttonType={'+'}
                    />
                </div>
            </div>
        );
    }
}
