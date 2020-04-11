import React from 'react';
import {Input, Button } from 'react-native-elements';
import TrackListScreen from '../screens/TrackListScreen';
import Spacer from './Spacer'
import { useContext } from 'react';
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSavetrack';

const TrackForm = () => {
    const { state: { name, recording, locations }, 
            startRecording, 
            stopRecording, 
            changeName 
        } = useContext(LocationContext);   
    // for convention a hook is returning an array  
    const [saveTrack] = useSaveTrack(); 

    //console.log(locations.length);
    return (
        <>
            <Spacer>
                <Input value={name} onChangeText={changeName} placeholder="Enter name"/>
            </Spacer>
            <Spacer>
                {recording 
                    ? <Button title="Stop" onPress={stopRecording}/> 
                    : <Button title="Start Recording" onPress={startRecording}/>
                }
            </Spacer>
            <Spacer>
                {
                    !recording && locations.length
                    ? <Button title="Save recording" onPress={saveTrack} />
                    : null
                }
            </Spacer>
            
        </>
    )
};

export default TrackForm;