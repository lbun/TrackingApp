// we import the helper function
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker'

const trackreducer = (state, action) => {
    switch (action.type) {
        case 'fetch_tracks':
            return action.payload;
        default:    
            return state;
    }           
};


const fetchTracks = dispatch => async () => { 
    const response = await trackerApi.get('/tracks');
    dispatch({type: 'fetch_tracks', payload: response.data});
 };


const createTrack = dispatch => async (name, locations) => { 
    await trackerApi.post('/tracks', { name, locations });
};


export const { Provider, Context } = createDataContext(
    // 1st argument reducer
    trackreducer,
    // 2nd argument object with all action functions
    { fetchTracks, createTrack },
    // 3rd argument is the initial state
    []
);