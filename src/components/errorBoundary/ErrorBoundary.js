import { Component } from "react";

class ErrorBoundary extends Component {

    state={
        error: false,
    }

    // static getDerivatedStateFromError(error) { // we can use this method, but it only can change thr state
    //     return {error: true} // and that's all
    // }

    componentDidCatch(err, info) {
        this.setState({error: true})
        console.log(err);

    }

    render() {
        const {error} = this.state;
        const content = <h2 style={{margin: 30, color: 'red', textAlign: 'center'}}>damn, we run into a problem</h2>
        return (
           error ? content : this.props.children 
        )
    }
}

export default ErrorBoundary;