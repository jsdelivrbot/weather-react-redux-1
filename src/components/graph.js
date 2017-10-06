import _ from 'lodash';
import React, { Component } from 'react';
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
  SparklinesSpots,
  SparklinesBars
} from 'react-sparklines';

function average(data) {
  return _.round(_.sum(data) / data.length);
}

class Graph extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Sparklines height={120} width={180} data={this.props.data} limit={10} min={0} max={120}>
          <SparklinesLine color={this.props.color} />
          <SparklinesReferenceLine type="avg" />
        </Sparklines>
        <div>{average(this.props.data)} {this.props.units}</div>
      </div>
    );
  }
}

export default Graph;
