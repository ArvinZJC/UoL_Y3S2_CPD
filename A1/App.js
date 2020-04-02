/*
 * @Description: the entry file of the app
 * @Version: 1.0.2.20200403
 * @Author: Jichen Zhao
 * @Date: 2020-03-31 13:44:57
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-03 00:06:14
 */

import 'react-native-gesture-handler'; /* follow the official guides to add this at the top to avoid any crashes in production */
import React from 'react';
import styled from 'styled-components';
import {Platform} from 'react-native';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import StepsScreen from './screens/StepsScreen';

import Colours_default from './values/Colours';
import Colours_night from './values/Colours_night';
import Strings from './values/Strings';


const Stack = createStackNavigator();

const HomeScreen_route = 'Home';
const SettingsScreen_route = 'Settings';
const StepsScreen_route = 'Steps';

const HeaderRightButton_iconSize = 22;
const HeaderRightButton_marginRight = 10;

function SettingsButton()
{
	const navigation = useNavigation();
	const colourScheme = useColorScheme();
	const colours = colourScheme === 'light' ? Colours_default : Colours_night;

	const SettingsButtonArea = styled.TouchableHighlight`
		width: ${HeaderRightButton_iconSize * 2}px;
		height: ${HeaderRightButton_iconSize * 2}px;
		border-radius: ${HeaderRightButton_iconSize}px;
		margin-right: ${HeaderRightButton_marginRight}px;
		align-items: center;
		justify-content: center;
	`;

	return(
		<SettingsButtonArea onPress={() => {navigation.navigate(SettingsScreen_route)}} underlayColor={colours.headerRightButtonBackground_pressed}>
			<Ionicons name='md-settings' size={HeaderRightButton_iconSize} color={colours.primaryText} />
		</SettingsButtonArea>
	);
}

export default function App()
{
	const colourScheme = useColorScheme();
	const colours = colourScheme === 'light' ? Colours_default : Colours_night;
	
	return(
		<AppearanceProvider>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName={HomeScreen_route}
					headerMode={Platform.OS === 'android' ? 'screen' : 'float'}
					screenOptions={{
						headerStyle: {
							backgroundColor: colours.appTheme,
							borderBottomWidth: 0,
							elevation: 0,
							shadowColor: colours.appTheme
						},
						headerTintColor: (Platform.OS === 'android' ? colours.primaryText : colours.splashBackground),
						headerTitleStyle: {
							color: colours.primaryText
						},
						headerTitleAlign: 'center',
						...TransitionPresets.SlideFromRightIOS}}>
					<Stack.Screen
						name={HomeScreen_route}
						component={HomeScreen}
						options={{
							title: Strings.appName,
							headerRight: () => (<SettingsButton />)}} />
					<Stack.Screen
						name={SettingsScreen_route}
						component={SettingsScreen}
						options={{
							title: Strings.settingsScreen_title,
							headerBackTitle: Strings.homeScreen_label}} />
					<Stack.Screen
						name={StepsScreen_route}
						component={StepsScreen}
						options={{
							title: Strings.stepsScreen_title,
							headerBackTitle: Strings.homeScreen_label}} />
				</Stack.Navigator>
			</NavigationContainer>
		</AppearanceProvider>
	);
}