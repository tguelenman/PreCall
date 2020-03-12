import React, {Component} from 'react'
import './styling/SelectorSlider.css'

import {Slider, Rail, Handles, Tracks} from 'react-compound-slider'

function round(val) {

    //round to 3 digits
    return Math.round(val * 1000) / 1000

}

function Track({source, target, classname, getTrackProps}) {

    console.log(classname);

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

    onUpdate = (value) => {

        //set the new threshold in parent
        console.log(this.props.id + ": " + this.props.threshold)
        this.props.callback(this.props.id, round(value[0]))

    }

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
                     marginLeft: -35,
                 }}
                 {...getHandleProps(id)}
            >
                <div id='thresholdLabel'>
                    {'-'}
                </div>
                <div className='handleStick'/>
                <p className='damaging gd'>{this.props.top_label}</p>
                <p className='good gd'>{this.props.bottom_label}</p>
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
                    domain={[0, 100]}
                    step={0.1}
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
                                    classname={this.props.id === "positive_selector" ? 'good' : 'bad'}
                                    getTrackProps={getTrackProps}
                                />
                            ))}
                        </div>
                    )}
                </Tracks>
                <div id='zeroToOneLabel'>
                    <p>{round(this.props.threshold)}</p>
                    <p>{round(100 - this.props.threshold)}</p>
                </div>
            </Slider>

        return (

            <div>
                {threshold ?
                    <div id='thresholdBar'>
                        {slider}
                        <div id='limitMarks'/>
                    </div>
                    : ''}
            </div>

        )
    }
}

