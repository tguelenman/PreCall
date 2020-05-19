import React, {Component} from 'react'
import './styling/SelectorSlider.css'

import {Slider, Rail, Handles, Tracks} from 'react-compound-slider'

// use as a timer so that we update the sliders less frequently
let last_call = 0;

function round(val) {
    //round to 3 digits
    return Math.round(val * 1000) / 1000
}

function Track({source, target, classname, getTrackProps}) {

    return (

        <div className={'selectorTrack '+ classname}
             style={{
                 top: '${source.percent}%',
                 height: `${target.percent - source.percent}%`,
                 pointerEvents: 'none',
             }}
             {...getTrackProps()} // this will set up events if you want it to be clickeable (optional)
        />
    )

}


export default class SelectorSlider2 extends Component {

    // Hacky solution to easily check if the current class instance is the
    // slider on the right. Useful for CSS formatting and colors
    isSliderOnTheLeft(){
        return this.props.id === "positive_selector";
    }

    onUpdate = (value) => {
        let milis = new Date().getTime();

        // update only every 50ms
        if (last_call === 0 || last_call + 50 < milis) {
            last_call = milis;

            //set the new threshold in parent
            this.props.callback(this.props.id, round(value[0]))
        }
    };

    Handle = ({

                  handle: {id, value, percent},
                  getHandleProps

              }) => {
        return (

            <div id='selectorHandle'
                 style={{
                     top: `${percent}%`,
                     position: 'absolute',
                     zIndex: 2,
                     width: 21,
                     height: 21,
                     border: '2px solid black',
                     textAlign: 'center',
                     cursor: 'pointer',
                     borderRadius: '50%',
                     backgroundColor: 'white',
                     transform: 'translate(-50%, -50%)',
                     marginLeft: this.isSliderOnTheLeft() ? -35 : 35,
                 }}
                 {...getHandleProps(id)}
            >
                <div id='selectorLabel'>
                    {'-'}
                </div>
                <div className={'handleStick'.concat(this.isSliderOnTheLeft() ? "Good" : "Bad")}/>
                <div className={'sideLabels '.concat(this.isSliderOnTheLeft() ? '' : 'rightSideLabel')}>
                    <p className='gd'>{this.props.top_label}</p>
                    <p className='gd'>{this.props.bottom_label}</p>
                </div>
            </div>

        )
    }

    render() {
        // #1db1f5 - blue for the track
        const threshold = this.props.threshold;
        const railStyle = {
            background: this.props.color_bottom,
        };

        const slider =
            <Slider className='selectorSlider'
                    vertical
                    //reversed
                    domain={this.props.domain}
                    step={0.05}
                    mode={2}
                    values={[threshold]}
                    onUpdate={this.onUpdate}
            >
                <Rail>
                    {({getRailProps}) => (
                        <div id='selectorRail' style={railStyle} {...getRailProps()} />
                    )}
                </Rail>
                <Handles>
                    {({handles, getHandleProps}) => (
                        <div className='slider-handles'>
                            {handles.map(handle => (
                                <this.Handle
                                    key={handle.id}
                                    handle={handle}
                                    percent={this.props.threshold}
                                    getHandleProps={getHandleProps}
                                />
                            ))}
                        </div>
                    )}
                </Handles>
                <Tracks right={false}>
                    {({tracks, getTrackProps}) => (
                        <div className="slider-tracks">
                            {tracks.map(({id, source, target}) => (
                                <Track
                                    key={id}
                                    source={source}
                                    target={target}
                                    classname={this.isSliderOnTheLeft() ? 'good' : 'bad'}
                                    getTrackProps={getTrackProps}
                                />
                            ))}
                        </div>
                    )}
                </Tracks>
                <div id='zeroToOneLabel' className={this.isSliderOnTheLeft() ? '' : 'rightNumber'}>
                    <p>{"".concat(round(this.props.threshold), " \%")}</p>
                    <p>{"".concat(round(this.props.domain[1] - this.props.threshold), " \%")}</p>
                </div>
            </Slider>

        return (

            <div>
                {threshold ?
                    <div id='thresholdBar'>
                        {slider}
                    </div>
                    : ''}
            </div>

        )
    }
}

