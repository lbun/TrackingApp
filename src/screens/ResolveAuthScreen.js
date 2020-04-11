import React, {useEffect, useContext} from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const ResolveAuthScreen = () => {
    const { tryLocalSignin } = useContext(AuthContext);

    useEffect(() => {
        tryLocalSignin()
    }, [])
    return null;
};

export default ResolveAuthScreen;