import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

class HomeActivity extends React.Component
{
    // this creates a header with blue background
    static navigationOptions =
    {
        title: 'Home',
        headerStyle:
        {
        backgroundColor: '#03A9F4',
        },
        headerTintColor: '#fff',
        headerTitleStyle:
        {
        fontWeight: 'bold',
        },
    };

    render()
    {
        return(
            <View style={styles.container}>
                <Text style={styles.headerText}>Home Activity</Text>
                <Button title='Go to Profile Activity' onPress={() => this.props.navigation.navigate('Profile')} />
            </View>
        );
    }
}

// these are styles they are applied in the <View style={styles.container}>
const styles = StyleSheet.create(
{
    container:
    {
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flex: 1,
        justifyContent: 'center',
    },
    headerText:
    {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
    },
});

// note this is the command that gives other pages access to it
export default HomeActivity;