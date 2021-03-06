import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Explore from '../components/Explore';
import {resetErrorMessage} from '../actions';
import {Button} from 'antd'

class App extends Component {
    static propTypes = {
        errorMessage: PropTypes.string,
        resetErrorMessage: PropTypes.func.isRequired,
        inputValue: PropTypes.string.isRequired,
        children: PropTypes.node
    };

    handleDismissClick = e => {
        this.props.resetErrorMessage();
        e.preventDefault()
    };

    handleChange = nextValue => {
        this.props.history.push(`/${nextValue}`);
    };

    renderErrorMessage() {
        const {errorMessage} = this.props;
        if (!errorMessage) {
            return null;
        }

        return (
            <p style={{backgroundColor: '#e99', padding: 10}}>
                <b>{errorMessage}</b>
                {" "}
                <Button type='primary' onClick={this.handleDismissClick}>
                    Dismiss
                </Button>
            </p>
        )
    }

    render() {
        const {children, inputValue} = this.props;
        return (
            <div>
                <Explore value={inputValue}
                         onChange={this.handleChange}
                />
                <hr/>
                {this.renderErrorMessage()}
                {children}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    errorMessage: state.errorMessage,
    inputValue: ownProps.location.pathname.substring(1)
});

export default withRouter(connect(mapStateToProps, {
    resetErrorMessage
})(App))