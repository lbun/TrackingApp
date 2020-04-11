
import { NavigationActions } from 'react-navigation';
let navigator;

// we want to define a funciton that we can access outside react component
// for handle the navigation and access its props outside react component
// let so we can reassign the variable at a certain time in the future
export const setNavigator = (nav) => {
    navigator = nav;
};

export const navigate = (routeName, params) => {
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    );
};