import React, {useEffect, useState} from 'react';
import Error from '../error';

const ErrorBoundry = () => {

    const [error, setError] = useState(false);

    useEffect(() => {
        setError(true)
    }, [error])

    if (error) {
        return <Error/>
    }

}

export default ErrorBoundry;