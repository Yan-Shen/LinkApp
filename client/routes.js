import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Nav, Login, Signup, Accounts, UserHome, InstitutionHome, FrontPage} from './components'
import BankList from './components/linkAdd/BankList'
import {AllTransactions} from './components/TransactionList'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData();
  }

  render () {
    const {isLoggedIn} = this.props
    return (
      <div>

        <Router history={history}>
          <div id="mainSection" className="flex-container-column fullWidth">
              <Nav />
              <Switch>
                <Route exact path ="/accounts" component = {Accounts} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path='/' component={FrontPage} />
                {
                  isLoggedIn &&
                    <Switch>
                      {/* Routes placed here are only available after logging in */}
                      <Route exact path={`/links/${this.props.userId}`} component={BankList} />
                      <Route exact path={`/${this.props.userId}`} component={UserHome} />
                       <Route exact path={`/institution/:userId/:institutionId`} component={InstitutionHome} />
                      <Route exact path={`/transactions/:userId`} component={AllTransactions} />

                    </Switch>
                }
                {/* Displays our Login component as a fallback */}

              </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    currentBank: state.currentBank,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    },
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
