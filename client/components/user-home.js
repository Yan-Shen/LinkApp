import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


import {getAccountsThunk, getBanksThunk, getTransactionsThunk} from '../store'
import {BalanceRow, ProfitRow} from './chart/SummaryRow';
import {BalanceDetails} from './chart/BalanceDetails';
import {ProfitDetails} from './chart/ProfitDetails';
import BalanceChart from './chart/BalanceChart';
import LineBarAreaComposedChart from './chart/ExpenseChart'
/**
 * COMPONENT
//  */

class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount(){
    this.props.loadAccounts();
    this.props.loadInstitions();
    this.props.loadTransactions();
  }

  render() {
    return (

        <div id="homeContainer" className="flex-container-column">
          <div id="bankNavContainer" className="flex-container-row">
            <div className="hvr-underline-reveal"><span>Summary</span></div>
            {
              this.props.banks.map(bank=>{
              return <div className="hvr-underline-reveal" key={bank.id}><span>{bank.name}</span></div>
              })
            }

          </div>
          <div id="edge"/>

          <div id="dashboardContainer" className="flex-container-row">
            <div id="balance" className="flex-container-column halfSec">
              <span className="sectionLabel">Balance</span>
              <BalanceRow />
              <BalanceDetails />
              {/* <div className="chartContainer">Chart</div> */}
              <div className="chartWrap">
                <div className="chartTitleArea">Asset Class %</div>
                <BalanceChart />
              </div>
            </div>
            <div id="exp" className="flex-container-column halfSec">
              <span className="sectionLabel">Income/Expense</span>
              <ProfitRow />
              <ProfitDetails />
              <div className="chartWrap">
                <div className="chartTitleArea">Expenses by Vendor</div>
                  <LineBarAreaComposedChart />
              </div>

            </div>

          </div>

       </div>

     )
  }
}


const mapState = state => {
  return {
    // email: state.user.email,
    accounts: state.accounts || null,
    banks: state.banks || null
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const userId = ownProps.match.path.slice(1);
  return {
    loadAccounts(){
      dispatch(getAccountsThunk(userId))
    },
    loadInstitions(){
      dispatch(getBanksThunk(userId))
    },
    loadTransactions(){
      dispatch(getTransactionsThunk(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   // email: PropTypes.string
// }
