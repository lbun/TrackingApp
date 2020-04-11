import React, {useContext} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
// we run a function verytime we navigate to the screen thanks to NavigationEvents
import { NavigationEvents } from 'react-navigation';
import { Context as TrackContext } from '../context/TrackContext'


const TrackListScreen = ({ navigation }) => {

    const { state, fetchTracks } = useContext(TrackContext);
    console.log(state);

    return (
    <>
        <NavigationEvents onWillFocus={ fetchTracks }/>
        <FlatList 
            data={state}
            keyExtractor={item => item._id}
            renderItem={({ item }) => {
                return <TouchableOpacity onPress={() => 
                        // we can navigate also to other page with prop navigation inside 
                        //our component
                        navigation.navigate('TrackDetail', {_id: item._id})
                    }>
                    <ListItem chevron title={item.name} />
                </TouchableOpacity>
            }}
        />
    </>
    )
} 

TrackListScreen.navigationOptions = () => {
    return {
        title: 'Tracks',
    }
};

export default TrackListScreen;