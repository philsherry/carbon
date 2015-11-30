import React from 'react';
import ReactHighcharts from 'react-highcharts/dist/bundle/highcharts';

class LineGraph extends React.Component {

  render() {
    let config = generateConfig(this.props.data, this.props.title,
                this.props.yAxisTitle, this.props.xAxisTitle,
                this.props.xAxisCategories);

    return (
      <div className="ui-line-graph">
        <ReactHighcharts ref="chart" config={config} />
      </div>
    );
  }
}

/**
 * Uses the Highcharts API to apply z-index to the current segment.
 *
 * @method focusSegment
 * @private
 */
function focusSegment() {
  this.graphic.zIndexSetter(1);
}

/**
 * Uses the Highcharts API to apply z-index to the current segment.
 *
 * @method unfocusSegment
 * @private
 */
function unfocusSegment() {
  this.graphic.zIndexSetter(0);
}

function xAxis(xAxisTitle, xAxisCategories) {
  let xAxis = {};

  if(xAxisCategories) { 
    xAxis.categories = xAxisCategories;
  }
  
  if(xAxisTitle) {
    xAxis.title = { text: xAxisTitle };
    xAxis.labels = { enabled: true };
  }

  return xAxis;
}

function yAxis(yAxisTitle) {
  let yAxis = {};

  if(yAxisTitle) {
    yAxis.title = { text: yAxisTitle };
    yAxis.labels = { enabled: true };
  } else {
    yAxis.title = '';
  }

  return yAxis;
}

/**
 * Generates the config for the Highchart.
 *
 * @method generateConfig
 * @param {Object} immutableData
 * @param {String} title
 * @private
 * @return {Object}
 */
function generateConfig(immutableData, title, yAxisTitle, xAxisTitle, xAxisCategories) {
  let data = immutableData.toJS();
  debugger

  return {
    credits: {
      enabled: false
    },
    title: {
      style: {
        "color": "",
        "fontFamily": "",
        "fontSize": ""
      },
      text: title,
      useHTML: true,
    },
    lineColor: "#999",
    xAxis: xAxis(xAxisTitle, xAxisCategories),
    yAxis: yAxis(yAxisTitle),
    legend: { enabled: false },
    series: [{
      data: data
    }],
    plotOptions: {
      area: {
        marker: {
          enabled: false,
          radius: 1
        },
        states: {
          hover: {
            enabled: false
          }
        },
        shadow: false,
        lineColor: "#D37423",
        fillColor: "rgba(211,116,35,0.2)",
        lineWidth: 2
      }
    }
  };
}

export default LineGraph;
