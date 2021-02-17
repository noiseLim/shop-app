// import React, {useEffect, useState} from 'react';
// import Error from '../error';

// const ErrorBoundry = () => {

//     const [error, setError] = useState(false);

//     useEffect(() => {
//         setError(true)
//     }, [error])

//     if (error) {
//         return <Error/>
//     }

// }

// export default ErrorBoundry;


import React, {Component} from 'react';
import Error from '../error';

export default class ErrorBoundry extends Component {

    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({error: true});
    }

    render() {
        if (this.state.error) {
            return <Error/>
        }

        return this.props.children;
    }
}