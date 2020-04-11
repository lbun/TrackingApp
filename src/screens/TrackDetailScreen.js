import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { Context as TrackContext} from '../context/TrackContext';
import MapView, { Polyline } from 'react-native-maps';

const TrackDetailScreen = ({ navigation }) =>{
    // we are getting the value of id passed from the clink on track on Tracklist
    const { state } = useContext(TrackContext);
    const _id = navigation.getParam('_id');

    // we need to find the element with the id passed from the tracklist
    // we will use the find helper function
    const track = state.find(t => t._id === _id);
    const initialCoords = track.locations[0].coords;
    console.log(initialCoords);
    return (<>
            <Text style={{ fontSize: 48}}>{track.name}</Text>
            <MapView
                    style={styles.map}
                    initialRegion={{
                        longitudeDelta: 0.01,
                        latitudeDelta: 0.01,
                        ...initialCoords
                    }}
                    
            >
                <Polyline coordinates={track.locations.map(loc => loc.coords)} />
            </MapView>
        </>)
} 

const styles = StyleSheet.create({
    map: {
        height: 300
    }
})

export default TrackDetailScreen;