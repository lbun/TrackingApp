import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation'
import NavLink from '../components/NavLink'
import { Context as AuthContext } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'

const SignupScreen = ({ navigation }) => {
    // receiving data from COntext
    const { state, signup, clearErrorMessage } = useContext(AuthContext);

    console.log(state);

    return (
        <View style={styles.container}>
            <NavigationEvents
                onWillBlur={clearErrorMessage}
            />
            <AuthForm
                headerText="Sign Up for Tracker"
                errorMessage={state.errorMessage}
                submitButtonText="Sign Up"
                onSubmit={({ email, password }) => signup({ email, password })}
            />
            <NavLink
                routeName="Signin"
                text="Already have an account? Sign in instead"
            />

        </View>

    )
}


// to hide the header we add a navigation property to our component and we can return an object that
//can change the behaviour of the components 
// we don't need to necessary use a function that is used mainly when we are receiving a prop
// in this case we can go with an object or a function that retiurns an object
SignupScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}

const styles = StyleSheet.create({
    container: {
        // to see the dimension of the component (border color and width)
        //borderColor: 'red',
        //borderWidth: 10,
        flex: 1,
        justifyContent: 'center',
        marginBottom: 250,
    }
});

export default SignupScreen;