import createDataContext from './createDataContext';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const locationReducer = (state, action) => {
    switch (action.type) {
        case 'add_current_location':
            return { ...state, currentLocation: action.payload};
        case 'start_recording':
            return {...state, recording:true };
        case 'stop_recording':
            return {...state, recording: false };
        case 'add_location':
            // in this way we create new array without modifying th eoriginal array
            return {...state, locations: [...state.locations, action.payload] };
        case 'change_name':
            return {...state, name: action.payload };
        case 'reset':
            return {...state, locations: [], name:''};
        default:
            return state;
    }
};

const changeName = dispatch => (name) => {
    dispatch({ type: 'change_name', payload: name });
}

const startRecording = dispatch =>  () => {
    dispatch({type: 'start_recording'});
};
const stopRecording = dispatch =>  () => {
    dispatch({type: 'stop_recording'});
};
// everytime we call dispatch, the objet will be shown in the reducer as the second object
const addLocation = dispatch => (location, recording) => {
    dispatch({ type: 'add_current_location', payload: location})
    if (recording) {
        dispatch({ type: 'add_location', payload: location})
    }
};  

const reset = dispatch => () => {
    dispatch({ type: 'reset'});
}

export const { Context, Provider } = createDataContext(
    locationReducer,
    { startRecording, stopRecording, addLocation, changeName, reset },
    { name: '', recording: false, locations: [], currentLocation: null }
);