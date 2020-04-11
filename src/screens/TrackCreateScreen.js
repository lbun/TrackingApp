import './_mockLocation';
import React, { useContext, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, NavigationEvents, withNavigationFocus } from 'react-navigation';
import Map from '../components/Map';    
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';
import { FontAwesome } from '@expo/vector-icons';

//onWillBlur (in NavigationEvents)  callback called anytime the user is leaving the screen

const TrackCreateScreen = ({ isFocused }) =>{
    const { state: {recording}, addLocation } = useContext(LocationContext);
    const callback = useCallback(location => {
        addLocation(location, recording);
    }, [recording]);
    const  [err] = useLocation(isFocused || recording, callback);
    //console.log('isFocused - TrackCreateScreen',isFocused);
    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text h2>Create a Track</Text>
            <Map />
            {err ? <Text>Please enable location services</Text> : null}
            <TrackForm />
        </SafeAreaView>
    )
} 

TrackCreateScreen.navigationOptions = {
    title: 'Add track',
    tabBarIcon: <FontAwesome name="plus" size={20} />
}

export default withNavigationFocus(TrackCreateScreen);

// <NavigationEvents onWillBlur={() => console.log('LEAVING')} /> changed with withNavigationFocus