/*
 * @Description: the screen of the pedometer
 * @Version: 1.0.0.20200402
 * @Author: Jichen Zhao
 * @Date: 2020-04-02 15:15:11
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-02 15:17:45
 */

import React from 'react';
import {View, StatusBar, Text} from 'react-native';
import {useColorScheme} from 'react-native-appearance';

import Colours_default from '../values/Colours';
import Colours_night from '../values/Colours_night';


export default function StepsScreen()
{
	const colourScheme = useColorScheme();
	const colours = colourScheme === 'light' ? Colours_default : Colours_night;
	
	return(
		<View
			style={{
				backgroundColor: colours.appTheme,
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center'}}>
			<StatusBar barStyle={colourScheme === 'light' ? 'dark-content' : 'light-content'} backgroundColor={colours.appTheme} />
			<Text style={{color: colours.primaryText}}>Steps Screen</Text>
		</View>
	);
}