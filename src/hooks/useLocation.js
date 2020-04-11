import { useState, useEffect } from 'react';
import { Accuracy, requestPermissionsAsync, watchPositionAsync } from 'expo-location';

export default (shouldTrack, callback) => {
    const [err, setErr] = useState(null);

    //script executed everytime TrackCreateScreen rerenders
    useEffect(() => {
        let subscriber;
        const startWatching = async () => {
            try {
                await requestPermissionsAsync();
                subscriber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 10
                }, callback
                );
                // if we want to stop this action in our case based on isFocused
                //so we need to communicate that flag into our hook
                //subscriber.remove();
            } catch (e) {
                setErr(e);
            }
        }
        if (shouldTrack) {
            startWatching()
         } else {
            if (subscriber) {
                subscriber.remove();
            } 
            subscriber = null;
         }

         return () => {
             if (subscriber) {
                 subscriber.remove();
             }  
         }
    }, [shouldTrack, callback]);
    //we return an array in case there are multiple vaues that we want to return
    return [err];
}