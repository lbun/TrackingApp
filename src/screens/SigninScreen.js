import React, { useContext } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Navlink from '../components/NavLink'
import AuthForm from '../components/AuthForm';
import  { Context } from '../context/AuthContext'

// Navigation events properties (called in different moment)
//onWillFocus={() => {}} 
// onDidFocus={() => {}}
// onWillBlur={() => {}}
// onDidBlur={() => {}}

const SigninScreen = () =>{
    const { state, signin, clearErrorMessage } = useContext(Context);
    return(
        <View style={styles.container}>
            <NavigationEvents
                onWillBlur={clearErrorMessage}   
            />
            <AuthForm 
                headerText="Sign In to your account"
                errorMessage={state.errorMessage}
                //signin function will call a function with an object that will contain email
                //and password the user entered
                onSubmit={signin}
                submitButtonText="Sign In"
            />
            <Navlink 
                text="Don't have an account? Sign up here"
                routeName="Signup" 
            />
        </View>
    )
} 

SigninScreen.navigationOptions = {
    headerShown: false
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        marginBottom: 250
    }
})

export default SigninScreen;