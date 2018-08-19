import React, { Component } from "react";
import PropTypes            from "prop-types";
import { Form  }            from "../../Components";
import { SideBar }          from "../SideBar";
import { Table }            from "../../Components";
//import { LineChart }         from "../../Components";
//import { Histogram }        from "../../Components";
//import { url, apiKey }       from "./api";
//import { findPercentChange } from "./Utilities";
import "./home.scss";

// Import redux stuff
import { fetchData } from "../../Redux";
import { connect }   from "react-redux";

class Home extends Component{
    // Get user input
    onSubmit = (event) => {
        let userInput = document.getElementById("section__form-input").value.toUpperCase();

        // Get stock name and reset user form field
        if(userInput !== "")
        {
            this.props.getData(userInput);
            document.getElementById("section__form-input").value = "";
        }

        // Prevent refresh of the page when submitting stock to view.
        event.preventDefault();
    }

    render(){
        return(
            <section>
                <SideBar/>
                <Form onSubmit={ this.onSubmit }/>
                <Table data={ this.props }/>
                {/*
                <LineChart
                    errorMessage={ this.state.errorMessage }
                    xValues={ this.state.dates }
                    yValues={ this.state.adjustedClose }
                    width={ 600 }
                    height={ 400 }
                    color={ "orange" }
                    padding={ 55 }
                    percent={ false }
                />
                <LineChart
                    errorMessage={ this.state.errorMessage }
                    xValues={ this.state.dates }
                    yValues={ this.state.percentChange }
                    width={ 600 }
                    height={ 400 }
                    color={ "crimson" }
                    padding={ 55 }
                    percent={ true }
                />
                <Histogram
                    data={ this.state }
                    width={ 600 }
                    height={ 400 }
                    padding={ 1 }
                    scalar={ 15 }
                    color="crimson"
                />
                */}
            </section>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        userInput: state.stockName,
        stockData: state.stockData
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        getData: (name) => {
            dispatch(fetchData(name));
        }
    };
};

Home.propTypes = {
    getData: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
