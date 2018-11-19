import React            from "react";
import PropTypes        from "prop-types";
import { Component }    from "react";
import { YGrid }        from "../YGrid/";
import { XAxis }        from "../XAxis/";
import { YAxis }        from "../YAxis/";
import { Line }         from "../Line/";
import { ChartToolTip } from "../ChartToolTip/";
import { scaleFinder }  from "../../Utilities/";
import { scaleTime }    from "d3-scale";
import { scaleLinear }  from "d3-scale";
import "./chart.scss";

class Chart extends Component{
    static propTypes = {
        stockData: PropTypes.object
    }

    state = {
        width: window.innerWidth*0.80,
        height: window.innerHeight*0.79,
        padding: 40,
    }

    handleChartResize = () => {
        this.setState({
            width: window.innerWidth*0.80,
            height: window.innerHeight*0.79
        });
    }

    formatData(){
        let { chart } = this.props.stockData;
        let data      = chart.map(item => ({
            xValue: new Date(item["date"]),
            yValue: Number(item["close"])
        }));

        return data;
    }

    setXScale(){
        // get x-values
        let dates = this.formatData().map(item => item.xValue);

        // create xScale
        let scaleObj  = new scaleFinder(dates);
        let xScale    = scaleObj.getScale(scaleTime);

        // set scale range
        let { padding, width } = this.state;
        xScale.range([padding, width - padding]).nice();

        return xScale;
    }

    setYScale(){
        // get y-values
        let prices = this.formatData().map(item => item.yValue);

        // create xScale
        let scaleObj  = new scaleFinder(prices);
        let yScale    = scaleObj.getScale(scaleLinear);

        // set scale range
        let { height, padding } = this.state;
        yScale.range([(height - padding), padding]).nice();

        return yScale;
    }

    render(){
        let { width, height, padding } = this.state;

        // empty array gets coerced into a falsy value.
        if(!this.props.stockData)
            return null;

        return(
            <svg width={ width } height={ height } className="stock-market-chart">
                <YGrid
                    yScale={ this.setYScale()}
                    padding={ padding }
                    width={ width }
                />
                <YAxis
                    scale={ this.setYScale() }
                    width={ width }
                    padding={ padding }
                />
                <XAxis
                    scale={ this.setXScale() }
                    height={ height }
                    padding={ padding }
                />
                <Line
                    xScale={ this.setXScale() }
                    yScale={ this.setYScale() }
                    data={ this.formatData() }
                    color={ "orange" }
                />
                <ChartToolTip
                    xScale={ this.setXScale() }
                    yScale={ this.setYScale() }
                    data={ this.formatData() }
                    padding={ padding }
                    width={ width }
                    height={ height }
                    className="stock-market-chart"
                />
            </svg>
        );
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleChartResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleChartResize);
    }
}

export default Chart;
