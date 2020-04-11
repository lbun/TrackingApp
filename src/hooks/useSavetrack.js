import { useContext } from 'react';
import { Context as TrackContext } from '../context/TrackContext';
import { Context as LocationContext } from '../context/LocationContext';
import { navigate } from '../navigationRef';

export default () => {
    // these are the hooks 
    const { createTrack } = useContext(TrackContext);
    const { state: { locations, name }, 
            reset
        } = useContext(LocationContext);

    const saveTrack = async () => {
        await createTrack(name, locations);
        reset();  
        navigate('TrackList');
        // we rest t out form (variables in Location Context)
        // so to modify the state, we need an action funtion

    };
    // we are returning a function inside an array and making it avasilable to all components
    return [saveTrack]
}