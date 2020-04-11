import {AsyncStorage} from 'react-native';
import createDataContext from './createDataContext';
import { createStackNavigator } from 'react-navigation-stack';
import trackerApi from '../api/tracker';
import {navigate} from '../navigationRef';

//these aer the action function that we will pass into BoundActions

// in the reducer we add the case of error in signup
//updating the property errorMessage
//this function gets called by react when we call dispatch function
const authReducer = (state, action) => {
    // here we look for actions defined
    switch (action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'signin':
            return {errorMessage: '', token: action.payload};
        case 'clear_error_message':
            return {...state, errorMessage: ''};
        case 'signout':
            return { token: null, errorMessage: ''};
        default:
            return state;
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'})
};

const tryLocalSignin = dispatch => async() => {
    const token = await AsyncStorage.getItem('token')
    if  (token) {
        dispatch({type: 'signin', payload: token});
        navigate('TrackList')
    } else {
        navigate('Signup');
    }
};

/* QUICK EXAMPLE ARROW FUNCTION REDUCTION
const add = (a, b) => {
    return a + b;
}
// another way is (for 1 single expression) - Implicit return
const add = (a, b) => a + b;
*/


// we call dispatch anytime we want to update our state
const signup = dispatch => async ({ email, password }) => {
      try {
          const response = await trackerApi.post('/signup', { email, password });
          //response.data is an object with a tolen property we want to save
          await AsyncStorage.setItem('token', response.data.token);
          //this will give us back the tocken immediately
          //await AsyncStorage.get('token');
          //action to set token state
          // type is another case we handle in our reducer
          //dispatch an action to take the token and put it in our state object
          dispatch({type:'signin', payload: response.data.token})
          // using function to navigate outside the react component
          navigate(routeName='TrackList');
      } catch (err) {
        dispatch({
            type: 'add_error', 
            payload: 'Something went wrong with sign up' 
        });
      }
    };

const signin = (dispatch) => async ({ email, password }) => {
    try {
        const response = await trackerApi.post('/signin', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'signin', payload: response.data.token });
        navigate('TrackList')
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: "Something went wrong with the Sign In"
        })
        }
    };

const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'signout'});
    navigate('loginFlow');
};

// we pass all the function in the object so they will be available to 
// the different screens
export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup, clearErrorMessage, tryLocalSignin },
    //presence of a token means logged in
    { token: null, errorMessage: '' }
);

// We have to use tghe Provider at the very top of our APP,
// so all the information can be available to lower levels (our screens)
