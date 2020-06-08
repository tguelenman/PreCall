import React, {Component} from 'react'
import "./styling/ConfusionMatrix.css"
import ConfusionFilter from "./ConfusionFilter";

export default class ConfusionMatrix2 extends Component {

    render() {
        return (
            <div className='confusionMatrixGrid'>
                <div className='confusionHeading'>
                    <h2>Confusion Matrix</h2>
                </div>
                <div id='predictedPositive' className='frame'>Predicted damaging</div>
                <div id='predictedNegative' className='frame'>Predicted good</div>
                <div id='actualPositive'>Actually damaging</div>
                <div id='actualNegative'>Actually good</div>
                <div className='frame topLeft'>
                    <ConfusionFilter data={this.props.data}
                                     callback={this.props.callback}
                                     currentThreshold={this.props.threshold}
                                     confusionValue={'TP'}
                                     buttonType={'-'}
                    />
                    <div className='confusionLabel'>
                        {this.props.confusion.tp}
                    </div>
                    <ConfusionFilter data={this.props.data}
                                     callback={this.props.callback}
                                     currentThreshold={this.props.threshold}
                                     confusionValue={'TP'}
                                     buttonType={'+'}
                    />
                </div>
                <div className='frame topRight'>
                    <ConfusionFilter data={this.props.data}
                                     callback={this.props.callback}
                                     currentThreshold={this.props.threshold}
                                     confusionValue={'FP'}
                                     buttonType={'-'}
                    />
                    <div className='confusionLabel'>
                        {this.props.confusion.fp}
                    </div>
                    <ConfusionFilter data={this.props.data}
                                     callback={this.props.callback}
                                     currentThreshold={this.props.threshold}
                                     confusionValue={'FP'}
                                     buttonType={'+'}
                    />
                </div>
                <div className='frame bottomLeft'>
                    <ConfusionFilter data={this.props.data}
                                     callback={this.props.callback}
                                     currentThreshold={this.props.threshold}
                                     confusionValue={'FN'}
                                     buttonType={'-'}
                    />
                    <div className='confusionLabel'>
                        {this.props.confusion.fn}
                    </div>
                    <ConfusionFilter data={this.props.data}
                                     callback={this.props.callback}
                                     currentThreshold={this.props.threshold}
                                     confusionValue={'FN'}
                                     buttonType={'+'}
                    />
                </div>
                <div className='frame bottomRight'>
                    <ConfusionFilter data={this.props.data}
                                     callback={this.props.callback}
                                     currentThreshold={this.props.threshold}
                                     confusionValue={'TN'}
                                     buttonType={'-'}
                    />
                    <div className='confusionLabel'>
                        {this.props.confusion.tn}
                    </div>
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
