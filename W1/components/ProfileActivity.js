import React from 'react';
import {StyleSheet, Image, Text, View, Button} from 'react-native';

class ProfileActivity extends React.Component
{
    // this creates a title with green background
    static navigationOptions =
    {
        title: 'Profile',
        headerStyle:
        {
            backgroundColor: '#73C6B6',
        },
    };

    render()
    {
        return(
            /*
             * below is a container with 3 buttons in it;
             * note 3 same styles have been applied
             */
            <View style={styles.container}>
                <Image style={{width: 50, height: 50}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} />

                <Text style={styles.headerText}>Profile Activity</Text>
                <Button title='Go to Home' onPress={() => this.props.navigation.navigate('Home')} />

                <Text style={styles.headerText}>Create a New Profile Screen</Text>
                <Button title='Go to New Profile' onPress={() => this.props.navigation.push('Profile')} />

                <Text style={styles.headerText}>Go Back</Text>
                <Button title='Go Back' onPress={() => this.props.navigation.goBack()} />
            </View>
        );
    }
}

// stylesheet for this activity only - global styles will be discussed later
const styles = StyleSheet.create(
{
    container: {
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flex: 1,
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
    },
});

// give access to other js files
export default ProfileActivity;