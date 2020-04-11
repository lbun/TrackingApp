import React, { useReducer } from 'react';

export default (reducer, actions, defaultValue) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        // dispatch is taking the action object and send it back to reducer
        const [state, dispatch] = useReducer(reducer, defaultValue);

        // actions is an object
        // looping and calling functions with dispatch
        const boundActions = {};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        // Context to get access to the information from the child component
        // boundActions are the function we will use to change our state
        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        );
    };
    
    // Provider is the component making all of our data available inside the application
    return { Context, Provider };
};