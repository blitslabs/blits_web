import React, { Component, Fragment } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

// Components
import Home from './Home/Home'
import LoansHome from './Loans/LoansHome'
import NewBorrow from './Loans/NewBorrow'
import NewLend from './Loans/NewLend'
import SelectAsset from './Loans/SelectAsset'
import SelectBorrower from './Loans/SelectBorrower'
import NewLoan from './Loans/NewLoan'
import ConfirmLoanLender from './Loans/ConfirmLoanLender'
import LenderDashboard from './Loans/LenderDashboard'
import BorrowDashboard from './Loans/BorrowDashboard'
import ConfirmLoanBorrower from './Loans/ConfirmLoanBorrower'
import LoanDetails from './Loans/LoanDetails'

class AppRouter extends Component {
    render() {
        const { match, auth } = this.props

        return (
            <Fragment>
                <Route path={match.path} exact component={Home} />
                <Route path={`${match.path}app/loans`} exact component={LoansHome} />
                <Route path={`${match.path}app/loans/select-asset`} component={SelectAsset} />
                <Route path={`${match.path}app/lend/select-loan`} component={SelectBorrower} />
                <Route path={`${match.path}app/lend/select-borrower`} component={SelectBorrower} />
                <Route path={`${match.path}app/lend`} exact={true} component={NewLoan} />
                <Route path={`${match.path}app/lend/confirm`} component={ConfirmLoanLender} />
                <Route path={`${match.path}app/lend/dashboard`} component={LenderDashboard} />
                <Route path={`${match.path}app/borrow`} component={BorrowDashboard} />
                <Route path={`${match.path}app/borrow/confirm/:loanId`} component={ConfirmLoanBorrower} />
                <Route path={`${match.path}app/loan/:loanId`} component={LoanDetails} />
            </Fragment>
        )
    }
}

function PrivateRoute({ component: Component, ...rest }) {
    const { auth } = rest
    return (
        <Route
            {...rest}
            render={props =>
                auth !== null ? (
                    <Component {...props} />
                )
                    : (
                        <Redirect
                            to={{
                                pathname: '/admin/login',
                                state: { from: props.location.pathname }
                            }}
                        />
                    )
            }
        />
    )
}

function mapStateToProps({ auth }) {
    return {

        auth
    }
}

export default connect(mapStateToProps)(AppRouter)



