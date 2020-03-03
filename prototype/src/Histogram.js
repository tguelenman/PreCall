import React, { Component } from 'react'
import { Histogram, DensitySeries, BarSeries, withParentSize, XAxis, YAxis } from '@data-ui/histogram';

const ResponsiveHistogram = withParentSize(({ parentWidth, parentHeight, ...rest}) => (
  <Histogram
    width={parentWidth}
    height={200}
    {...rest}
  />
));

const rawData = Array(100).fill().map(Math.random);

export default class Histogram2 extends Component {
  render () {
    return (
      <ResponsiveHistogram
        ariaLabel="My histogram of ..."
        orientation="vertical"
        cumulative={false}
        normalized={true}
        binCount={25}
        valueAccessor={datum => datum}
        binType="numeric"
        renderTooltip={({ event, datum, data, color }) => (
          <div>
            <strong style={{ color }}>{datum.bin0} to {datum.bin1}</strong>
            <div><strong>count </strong>{datum.count}</div>
            <div><strong>cumulative </strong>{datum.cumulative}</div>
            <div><strong>density </strong>{datum.density}</div>
          </div>
        )}
      >
        <BarSeries
          rawData={rawData /* or binnedData={...} */}
        />
        <XAxis />
        <YAxis />
      </ResponsiveHistogram>
    );
  }
}
