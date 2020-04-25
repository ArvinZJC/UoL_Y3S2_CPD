/*
 * @Description: the weight screen
 * @Version: 1.0.0.20200424
 * @Author: Jichen Zhao
 * @Date: 2020-04-24 22:50:58
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-24 22:54:01
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {useColorScheme} from 'react-native-appearance';

import Colours_default from '../values/Colours';
import Colours_night from '../values/Colours_night';
import {
	RootLayout,
	MainContentArea} from '../values/Styles';


export default function WeightScreen()
{
	const colourScheme = useColorScheme();
	const colours = colourScheme === 'light' ? Colours_default : Colours_night;
	
	return(
		<RootLayout style={{backgroundColor: colours.appTheme}}>
			<StatusBar barStyle={colourScheme === 'light' ? 'dark-content' : 'light-content'} backgroundColor={colours.appTheme} />
			<MainContentArea>
				
			</MainContentArea>
		</RootLayout>
	);
}