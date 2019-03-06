import React                from "react";
import { Component }        from "react";
import { Fragment }         from "react";
import { hot }              from "react-hot-loader";
import { Navigation }       from "./Components/";
import { StockSelector }    from "./Components/";
import { FinancialsTable }  from "./Components/";
import { ChartSelector }    from "./Components/";
import { StockDescription } from "./Components/";
import { StockNews }        from "./Components/";
import "./app.scss";

// react-hot-loader complains when using plain functions
class App extends Component {
    render(){
        return(
            <Fragment>
                <Navigation/>
                <section className="home-container">
                    <div className="home-sidebar">
                        <StockSelector/>
                    </div>
                    <div className="home-content">
                        <FinancialsTable/>
                        <ChartSelector/>
                        <StockDescription/>
                        <StockNews/>
                    </div>
                </section>
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
