import React             from "react";
import PropTypes         from "prop-types";
import { Component }     from "react";
import { YGrid }         from "../YGrid/";
import { YAxis }         from "../YAxis/";
import { XAxis }         from "../XAxis/";
import { Rects }         from "../Rects/";
import { NoChartToShow } from "../NoChartToShow/";
import { scaleFinder }   from "../../Utilities/";

class Histogram extends Component{
    static propTypes = {
        stockData: PropTypes.array,
        width: PropTypes.number,
        height: PropTypes.number,
        padding: PropTypes.number
    }

    formatData(){
        let { stockData } = this.props;
        let data          = stockData.map(item => ({
            xValue: item["stats"]["symbol"],
            yValue: Number(item["stats"]["marketcap"])
        }));

        return data;
    }

    setXScale(){
        // get x-values
        let symbols = this.formatData().map(item => item.xValue);

        // create xScale
        let scaleObj = new scaleFinder(symbols);
        let xScale   = scaleObj.getOrdinalScale(0.5); // pass in binWidth

        // set scale range
        let { padding, width } = this.props;
        xScale.range([padding, width - padding]);

        return xScale;
    }

    setYScale(){
        // get y-values
        let marketCap = this.formatData().map(item => item.yValue);

        // create xScale
        let scaleObj = new scaleFinder(marketCap);
        let yScale   = scaleObj.getLinearScale();

        // set scale range
        let { height, padding } = this.props;
        yScale.range([(height - padding), padding]).nice();

        return yScale;
    }


    render(){
        let { width, height, padding } = this.props;
        if(this.props.stockData.length === 1)
            return(
                <NoChartToShow
                    width={ width }
                    height={ height }
                    message={ "You need at least two stocks for comparisons." }
                />
            );


        return(
            <svg width={ width } height={ height }>
                <YGrid
                    yScale={ this.setYScale()}
                    padding={ padding }
                    width={ width }
                />
                <XAxis
                    scale={ this.setXScale() }
                    height={ height }
                    padding={ padding }
                />
                <YAxis
                    scale={ this.setYScale() }
                    width={ width }
                    padding={ padding }
                    formatType=".0s"
                />
                <Rects
                    xScale={ this.setXScale() }
                    yScale={ this.setYScale() }
                    data={ this.formatData() }
                    color="crimson"
                />
            </svg>
        );
    }
}

export default Histogram;