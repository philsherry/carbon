import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { merge } from 'lodash';
import { tagComponent } from '../../utils/helpers/tags';

/**
 * A rainbow chart using the Highcharts API.
 *
 * == How to use a Rainbow in a component:
 *
 * In your file:
 *
 *   import Rainbow from 'carbon/lib/components/rainbow';
 *
 * Note that the Rainbow component expects that you already have the Highcharts
 * library loaded. This may be true in case of some projects, which already have
 * that library available for their legacy code.
 * In other cases, you would need to import Highcharts before importing Rainbow:
 *
 *   import 'react-highcharts/dist/bundle/highcharts';
 *
 * To render the Rainbow:
 *
 *   let myImmutableData = Immutable.fromJS([
 *     {
 *       y: 30,
 *       name: 'First Bit',
 *       label: 'label for first bit',
 *       tooltip: 'more info about this bit',
 *       color: '#000' # we supply color by default, but you can supply your own like this
 *     }, {
 *       y: 70,
 *       name: 'Second Bit',
 *       label: 'label for second bit',
 *       tooltip: 'more info about this bit'
 *     }
 *   ]);
 *
 *   <Rainbow title="My Chart" data={ myImmutableData } />
 *
 * @class Rainbow
 * @constructor
 */
class Rainbow extends React.Component {

  static propTypes = {
    /**
     * A title for the component.
     *
     * @property title
     * @type {String}
     */
    title: PropTypes.string,

    /**
     * The data set for the component.
     *
     * @property data
     * @type {Object}
     */
    data: PropTypes.object.isRequired,

    /**
     * Custom chart config for the component.
     *
     * @property config
     * @type {Object}
     */
    config: PropTypes.object
  }

  /**
   * Always returns false, but uses the Highcharts API to update the charts
   * data or title if they have been updated.
   *
   * @method shouldComponentUpdate
   * @param {Object} nextProps new props passed to the component
   * @return {void}
   */
  shouldComponentUpdate(nextProps) {
    let chart = this.refs.chart.chart;

    // use the highchart api to update its title
    if (this.props.title !== nextProps.title) {
      chart.setTitle({ text: nextProps.title });
    }

    // use the highchart api to update its data
    if (this.props.data !== nextProps.data) {
      chart.series[0].setData(nextProps.data.toJS());
    }

    // never re-render the component
    return false;
  }

  /**
   * Renders the initial chart, and stores it on the ref so it can be updated later
   */
  componentDidMount() {
    let config = generateConfig(this.props.data, this.props.title);
    merge(config, this.props.config);
    this.refs.chart.chart = global.Highcharts.chart(this.refs.chart, config);
  }

  /**
   * Main Class getter
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames(
      'carbon-rainbow',
      this.props.className
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {

    return (
      <div className={ this.mainClasses } { ...tagComponent('rainbow', this.props) }>
        <div ref="chart" />
      </div>
    );
  }

}

/**
 * Uses the Highcharts API to apply z-index to the current segment.
 *
 * @method focusSegment
 * @private
 * @return {void}
 */
function focusSegment() {
  this.graphic.zIndexSetter(1);
}

/**
 * Uses the Highcharts API to apply z-index to the current segment.
 *
 * @method unfocusSegment
 * @private
 * @return {void}
 */
function unfocusSegment() {
  this.graphic.zIndexSetter(0);
}

/**
 * Calculates the position for the tooltip.
 *
 * @method tooltipPosition
 * @param {Number} tooltipWidth width of tooltip
 * @param {Number} tooltipHeight height of tooltip
 * @param {Object} point center of tooltip
 * @private
 * @return {Object} x and y position of tooltip
 */
function tooltipPosition(tooltipWidth, tooltipHeight, point) {
  let x = point.plotX - (tooltipWidth / 2);
  let y = point.plotY - (tooltipHeight - 5);

  return { x: x, y: y };
}

/**
 * Generates the config for the Highchart.
 *
 * @method generateConfig
 * @param {Object} immutableData data for highchart
 * @param {String} title title for highchart
 * @private
 * @return {Object} config for highchart
 */
function generateConfig(immutableData, title) {
  let data = immutableData.toJS();

  return {
    credits: {
      enabled: false
    },
    chart: {
      height: 250,
      margin: 0,
      backgroundColor: null,
      spacing: 0,
      plotShadow: false
    },
    title: {
      style: {
        "color": "",
        "fontFamily": "",
        "fontSize": ""
      },
      text: title,
      useHTML: true,
      verticalAlign: 'top',
      y: 35
    },
    tooltip: {
      borderRadius: 100,
      borderWidth: 0,
      followPointer: true,
      headerFormat: '',
      pointFormatter: function() {
        return '<span style="color: ' + this.color  + '">' + this.tooltip + '</span>';
      },
      positioner: function(tooltipWidth, tooltipHeight, point) {
        return tooltipPosition(tooltipWidth, tooltipHeight, point);
      },
      shadow: false
    },
    plotOptions: {
      pie: {
        animation: {
          duration: 400
        },
        colors: ['#01A4CF', '#FFAB02', '#EA433F', '#FFDD4F', '#FF448F'],
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '100%'],
        dataLabels: {
          connectorWidth: 0,
          defer: false,
          distance: 18,
          enabled: true,
          formatter: function () {
            let display = "display: ";
            display += this.point.visible ? "block" : "none";

            return '<span style="color:' + this.point.color + '; ' + display + '"><strong>' + this.point.name + '</strong><br>' + this.point.label + '</span>';
          },
          padding: 0,
          style: {
            "fontSize": "",
            "fontWeight": "",
            "fontFamily": ""
          },
          useHTML: true
        },
        point: {
          events: {
            mouseOver: focusSegment,
            mouseOut: unfocusSegment
          }
        },
        states: {
          hover: {
            halo: false
          }
        }
      }
    },
    series: [{
      data: data,
      innerSize: '65%',
      type: 'pie'
    }]
  };
}

export default Rainbow;
