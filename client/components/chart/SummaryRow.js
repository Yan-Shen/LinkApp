import React from 'react';
import {connect} from 'react-redux'
const _ = require('lodash');

const formatCurrency = require('format-currency')
let opts = { format: '%s%v', symbol: '$' }

const SummaryRow = (props)=>{

    return (
      <div id="topRow" className="flex-container-row rowSec">
        <div className="flex-container-column setPadding">
          <div id="netContainer"><span>{props.net}</span></div>
          <div><span className="greyFont">{props.sec1}</span></div>
        </div>
        <div id="sec2Container" className="flex-container-column setPadding addColor">
          <div id="assetContainer"><span>{props.positive}</span></div>
          <div><span className="greyFont">{props.sec2}</span></div>
        </div>
        <div className="flex-container-column setPadding addColor">
          <div id="liabilityContainer"><span>{props.negative}</span></div>
          <div><span className="greyFont">{props.sec3}</span></div>
        </div>
      </div>
     )
}

const mapBalance = state => {
  const assets = state.accounts.filter(account=> account.type!=='credit')
    .reduce((accu, cur)=>{
      return accu + cur.balanceCurrent;
    }, 0);
  const liabilities = state.accounts.filter(account=> account.type==='credit')
    .reduce((accu, cur)=>{
      return accu + cur.balanceCurrent;
    }, 0);
  const net = assets - liabilities;
  return {
    sec1: 'NET',
    sec2: 'ASSETS',
    sec3: 'LIABILITIES',
    net: formatCurrency(net, opts).slice(0, -3),
    positive: formatCurrency(assets).slice(0, -3),
    negative: formatCurrency(liabilities).slice(0, -3),
  }
}

const mapSingleBankBalance = (state, ownProps) => {
  const assets = state.accounts.filter(account=> account.type!=='credit')
    .filter(account => account.institutionId === ownProps.currentBank.id)
    .reduce((accu, cur) => {
      return accu + cur.balanceCurrent;
    }, 0);
  const liabilities = state.accounts.filter(account=> account.type==='credit')
    .filter(account => account.institutionId === ownProps.currentBank.id)
    .reduce((accu, cur)=>{
      return accu + cur.balanceCurrent;
    }, 0);
  const net = assets - liabilities;
  return {
    sec1: 'NET',
    sec2: 'ASSETS',
    sec3: 'LIABILITIES',
    net: formatCurrency(net, opts).slice(0, -3),
    positive: formatCurrency(assets).slice(0, -3),
    negative: formatCurrency(liabilities).slice(0, -3),
  }
}


const mapProfit = state => {
  const income = state.transactions
    .filter(transaction=>transaction.amount<0)
    .reduce((accu, cur)=>{
      return accu + cur.amount;
    }, 0);
  const expense = state.transactions
    .filter(transaction=>transaction.amount>0)
    .reduce((accu, cur)=>{
      return accu + cur.amount;
    }, 0);
  const net = income + expense;
  return {
    sec1: 'NET',
    sec2: 'INCOME',
    sec3: 'EXPENSES',
    net: formatCurrency(net, opts).slice(0, -3),
    positive: formatCurrency(income, opts).slice(0, -3),
    negative: formatCurrency(expense, opts).slice(0, -3)
  }
}

const mapSingleBankProfit = (state, ownProps) => {
  const income = state.transactions
    .filter(transaction => transaction.account.institutionId === ownProps.currentBank.id)
    .filter(transaction=>transaction.amount<0)
    .reduce((accu, cur)=>{
      return accu + cur.amount;
    }, 0);
  const expense = state.transactions
    .filter(transaction => transaction.account.institutionId === ownProps.currentBank.id)
    .filter(transaction=>transaction.amount>0)
    .reduce((accu, cur)=>{
      return accu + cur.amount;
    }, 0);
  const net = income + expense;
  return {
    sec1: 'NET',
    sec2: 'INCOME',
    sec3: 'EXPENSES',
    net: formatCurrency(net, opts).slice(0, -3),
    positive: formatCurrency(income, opts).slice(0, -3),
    negative: formatCurrency(expense, opts).slice(0, -3)
  }
}

export const BalanceRow = connect(mapBalance)(SummaryRow);
export const SingleBankBalanceRow = connect(mapSingleBankBalance)(SummaryRow);
export const ProfitRow = connect(mapProfit)(SummaryRow);
export const SingleBankProfitRow = connect(mapSingleBankProfit)(SummaryRow);


