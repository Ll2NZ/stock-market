import React         from "react";
import { Component } from "react";
import PropTypes     from "prop-types";
import { Grids }     from "../Grids/";
import { Labels }    from "../Labels/";
import { XAxis }     from "../XAxis/";
import { YAxis }     from "../YAxis/";
import { Line }      from "../Line/";
import { Points }    from "../Points/";
import "./chart.scss";

class Chart extends Component{
    static propTypes = {
        successData: PropTypes.object,
        frequency: PropTypes.string
    }

    state = {
        width: window.innerWidth <= 1000 ? window.innerWidth : window.innerWidth/1.4,
        height: window.innerHeight/1.6,
        padding: 40,
    }

    handleResize = () => {
        if(window.innerWidth <= 1000)
        {
            this.setState({
                width: window.innerWidth,
                height: window.innerHeight/1.6
            });
        }
        else if(window.innerWidth > 1000)
        {
            this.setState({
                width: window.innerWidth/1.4,
                height: window.innerHeight/1.6
            });
        }
    }

    setXScale(){
        let { padding, width } = this.state;
        let { xScale }         = this.props.successData["data"];
        xScale.range([padding, width - padding]).nice();

        return xScale;
    }

    setYScale(){
        let { height, padding } = this.state;
        let { yScale }          = this.props.successData["data"];
        yScale.range([(height - padding), padding]).nice();

        return yScale;
    }

    render(){
        let { width, height, padding } = this.state;

        // empty array gets coerced into a falsy value.
        if(!this.props.successData)
            return null;

        return(
            <svg width={ width } height={ height }>
                <Grids
                    scale={ this.setYScale()}
                    padding={ padding }
                    width={ width }
                />
                <Labels
                    width={ width }
                    height={ height }
                    padding={ padding }
                    xLabel={ "Year" }
                    yLabel={ "Price" }
                    frequency={ this.props.successData["data"]["frequency"] }
                />
                <XAxis
                    scale={ this.setXScale() }
                    height={ height }
                    padding={ padding }
                    frequency={ this.props.successData["data"]["frequency"] }
                />
                <YAxis
                    scale={ this.setYScale() }
                    padding={ padding }
                />
                <Line
                    xScale={ this.setXScale() }
                    yScale={ this.setYScale() }
                    x={ this.props.successData["data"]["dateObjects"] }
                    y={ this.props.successData["data"]["adjustedClose"] }
                    color={ "orange" }
                />
                <Points
                    xScale={ this.setXScale() }
                    yScale={ this.setYScale() }
                    x={ this.props.successData["data"]["dateObjects"] }
                    y={ this.props.successData["data"]["adjustedClose"] }
                    color={ "orange" }
                />
            </svg>
        );
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }
}

export default Chart;
