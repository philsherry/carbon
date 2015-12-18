import React from 'react';
import ReactHighcharts from 'react-highcharts/dist/bundle/highcharts';

class LineGraph extends React.Component {

  /**
   * Always returns false, but uses the Highcharts API to update the charts
   * data or title if they have been updated.
   *
   * @method shouldComponentUpdate
   * @param {Object} nextProps
   */
  shouldComponentUpdate(nextProps) {
    let chart = this.refs.chart.chart;

    // use the highchart api to update its data
    if (this.props.data !== nextProps.data) {
      let data = nextProps.data.get('yAxis')
      data.forEach(function(series, index) {
        if (chart.series[index]) {
          chart.series[index].setData(data.getIn([index, 'data']).toJS());
        } else {
          chart.addSeries(data.getIn([index, 'data']).toJS())
        }
      })
    }

    // never re-render the component
    return false;
  }

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

function generateConfig(immutableData, title, yAxisTitle, xAxisTitle, xAxisCategories) {
  let data = immutableData.toJS();

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
    xAxis: xAxis(xAxisTitle, data.xAxis),
    yAxis: yAxis(yAxisTitle),
    legend: { enabled: false },
    series: data.yAxis
  };
}

export default LineGraph;
