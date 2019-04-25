import React from "react";
import PropTypes from "prop-types";
import { StockSelector } from "../../Components/";
import { connect } from "react-redux";
import { InputStock } from "../../Components/";
//import { FinancialsTable }  from "../../Components/";
//import { StockDescription } from "../../Components/";
//import { ChartSelector } from "../../Components/";
import { ActiveChart } from "../../Components/";
import { StockHeader } from "../../Components/";
import "./style.scss";

function Home() {
  return (
    <>
      <div className="divider" />
      <section>
        <div className="row">
          {/* SIDEBAR */}
          <div className="main-sidebar col s3">
            <InputStock />
            <StockSelector/>
          </div>

          {/* MAIN CONTENT */}
          <div className="main-content col s9 grey lighten-5">
            <StockHeader />
            <ActiveChart />
          </div>
        </div>
      </section>
    </>
  );
}

Home.propTypes = {
  data: PropTypes.array,
  isFetching: PropTypes.bool
};

const mapStateToProps = state => ({ ...state.iexDataReducer });

export default connect(
  mapStateToProps,
  null
)(Home);
