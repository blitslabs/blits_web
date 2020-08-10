import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { } from '../../actions/auth'

// components
import Loading from './Loading'


// Actions
// import { handleLogin } from '../../actions/auth'

class Login extends Component {
    state = {
        loading: true,
        email: '',
        password: '',
        serverMsg: '',
    }



    componentDidMount() {
        document.title = "Iniciar Sesión"
        console.log('test')
        const { dispatch } = this.props
        this.setState({ loading: false })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        
        const { email, password } = this.state
        const { dispatch, auth } = this.props
        console.log(this.state)
        if (!email || !password) {           
            this.setState({serverMsg: 'Ingresa todos los campos requeridos'})
            return
        }

        const params = {
            email,
            password,
        }

        dispatch(handleLogin(params, (res) => {
            if(res.status === 'OK') {
                this.props.history.replace('/admin/dashboard')
            } else {
                this.setState({serverMsg: res.message})
            }
        }))
        
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value})
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value})
    }

    closeAlert = () => {
        this.setState({ serverRes: '' })
    }

    render() {
        const { serverMsg, loading } = this.state
        

        if (loading === true) {
            return <Loading />
        }

        return (
            <div>Hello World from React</div>
        )
    }
}

function mapStateToProps({  }) {
    return {
        
    }
}

export default connect(mapStateToProps)(Login)