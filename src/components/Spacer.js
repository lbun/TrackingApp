import React from 'react';
import {View, StyleSheet} from 'react-native';

// this helper components will just apply some margins to the child components
// this is useful to reduce the styles inside of the child components

const Spacer = ({ children }) => {
    return(
        <View style={styles.spacer}>{children}</View>
    )
};

const styles = StyleSheet.create({
    spacer: {
        margin: 15
    } 
});

export default Spacer;