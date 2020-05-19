import React, {Component} from 'react'
import Draggable from "react-draggable";
import {ConstantLine} from "devextreme-react/chart";

export default class DraggableHistogramLine2 extends ConstantLine {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Draggable
                axis="x"
                handle=".handle"
                defaultPosition={{x: 0, y: 0}}
                position={null}
                grid={[3, 3]}
                scale={1}
            >

                <div className='handle'
                     style={{
                         position: 'absolute',
                         zIndex: 2,
                         width: 21,
                         height: 21,
                         border: '2px solid black',
                         textAlign: 'center',
                         cursor: 'pointer',
                         borderRadius: '50%',
                         backgroundColor: 'white',
                         marginLeft: -35,
                     }}
                >
                    <div className='handleStick'/>
                        <ConstantLine className='handle' {...this.props}/>
                </div>
            </Draggable>
        );
    }
}