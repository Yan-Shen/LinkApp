import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


import {getAccountsThunk, getBanksThunk, getTransactionsThunk, getCurrentBank} from '../store'

import {BalanceRow, ProfitRow} from './chart/SummaryRow';
import {BalanceDetails} from './chart/BalanceDetails';
import {ProfitDetails} from './chart/ProfitDetails';
import { BankHeader } from './BankHeader';


class InstitutionHome extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {
    return (
        <div id="homeContainer" className="flex-container-column">
          <BankHeader
            banks={this.props.banks}
            setInstitution={this.props.setInstitution}
            userId={this.props.userId} />
          <div id="edge" />
          <h1>{this.props.currentBank.name}</h1>
          <div id="dashboardContainer" className="flex-container-row">

            <div id="balance" className="flex-container-column halfSec">
              <span className="sectionLabel">Balance</span>
              <BalanceRow />
              <BalanceDetails />
            </div>
            <div id="exp" className="flex-container-column halfSec">
              <span className="sectionLabel">Income/Expense</span>
              <ProfitRow />
              <ProfitDetails />

            </div>

          </div>
          <div>transaction list</div>
       </div>

     )
  }
}


const mapState = state => {
  return {
    currentBank: state.currentBank,
    banks: state.banks,
    userId: state.user.id
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
    },
    setInstitution(bank){
      dispatch(getCurrentBank(bank))
    }
  }
}

export default connect(mapState, mapDispatch)(InstitutionHome);

