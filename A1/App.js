/*
 * @Description: the entry file of the app
 * @Version: 1.0.0.20200401
 * @Author: Jichen Zhao
 * @Date: 2020-03-31 13:44:57
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-01 23:38:01
 */

import 'react-native-gesture-handler'; /* follow the official guides to add this at the top to avoid any crashes in production */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';


const Stack = createStackNavigator();

export default function App()
{
	return(
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Home' component={HomeScreen}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}