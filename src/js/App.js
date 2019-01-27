import React                   from "react";
import { Component }           from "react";
import { Fragment }            from "react";
import { hot }                 from "react-hot-loader";
import { StockMarketProvider } from "./Context/stockMarketContext.js";
import { Navigation }          from "./Components/";
import { InputStock }          from "./Components/";
import { StockMetrics }        from "./Components/";
import { ActiveChart }         from "./Components/";
import { StockSelector }       from "./Components/";
import { ChartSelector }       from "./Components/";
import { StockDescription }    from "./Components/";
import { Loader }              from "./Components/";
import { DuplicateEntry }      from "./Components/";
//import { Footer }              from "./Components/";
import "./app.scss";

class App extends Component{
    resetApplicationMessages = (event) => {
        const resestMessage = event.target.id;
        this.setState({
            [resestMessage]: ""
        });
    }

    setActiveIndex = (event) => this.setState({ activeIndex: Number(event.target.value) });

    onChangeChart = (event) => this.setState({ selectedChart: event.target.value });

    setDuplicateEntry = (stockName) => this.setState({ duplicateEntry: stockName });

    fetchStockMarketData = async (stockName) => {
        // indicate we are fetching data
        this.setState({ isFetchingData: true });

        const res = await fetch(
            `https://api.iextrading.com/1.0/stock/${
                stockName
            }/batch?types=quote,news,company,stats,financials,relevant,chart&range=5y`
        );

        try{
            // successful request
            const singleStockData = await res.json();

            this.setState({
                stockMarketData: [...this.state.stockMarketData, singleStockData],
                success: `Successfully retrieved: ${stockName}`,
                isFetchingData: false
            });
        }
        catch(err){
            // unsucessful request
            this.setState({
                errors: `Failed to retrieve: ${stockName}`,
                isFetchingData: false
            });
        }
    }

    state = {
        stockMarketData: [],
        activeIndex: 0,
        errors: "",
        success: "",
        duplicateEntry: "",
        isFetchingData: false,
        fetchStockMarketData: this.fetchStockMarketData,
        setActiveIndex: this.setActiveIndex,
        onChangeChart: this.onChangeChart,
        setDuplicateEntry: this.setDuplicateEntry,
        resetApplicationMessages: this.resetApplicationMessages,
        selectedChart: "HistoricalChart"
    }

    render(){
        return(
            <Fragment>
                <StockMarketProvider value={ this.state }>
                    <DuplicateEntry/>
                    <Navigation>
                        <InputStock/>
                    </Navigation>
                    <StockMetrics/>
                    <section style={{ height: "80%" }}>
                        <Loader/>
                        <div className="chart-options__container">
                            <StockSelector/>
                            <ChartSelector/>
                        </div>
                        <ActiveChart/>
                        <StockDescription/>
                    </section>
                </StockMarketProvider>
            </Fragment>
        );
    }
}

let Application;

if(process.env.NODE_ENV === "development")
    Application = hot(module)(App);
else
    Application = App;

export default Application;
