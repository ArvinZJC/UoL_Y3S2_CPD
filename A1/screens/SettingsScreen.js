/*
 * @Description: the settings screen
 * @Version: 1.0.0.20200402
 * @Author: Jichen Zhao
 * @Date: 2020-04-02 08:41:47
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-02 14:49:07
 */

import React from 'react';
import {View, StatusBar, Text} from 'react-native';
import {useColorScheme} from 'react-native-appearance';

import Colours_default from '../values/Colours';
import Colours_night from '../values/Colours_night';


export default function SettingsScreen()
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
			<Text style={{color: colours.primaryText}}>Settings Screen</Text>
		</View>
	);
}