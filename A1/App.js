/*
 * @Description: the entry file of the app
 * @Version: 1.0.7.20200428
 * @Author: Jichen Zhao
 * @Date: 2020-03-31 13:44:57
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-28 01:56:10
 */

import 'react-native-gesture-handler'; // follow the official guides to add it at the top to avoid any crashes in production
import React from 'react';
import styled from 'styled-components';
import {Platform} from 'react-native';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {} from '@react-navigation/native'
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry, Icon} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
// import * as SecureStore from 'expo-secure-store'; // uncomment this when the preference data needs deleting during the development

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import AboutScreen from './screens/AboutScreen';
import StepsScreen from './screens/StepsScreen';
import WeightScreen from './screens/WeightScreen';

import Colours_default from './values/Colours';
import Colours_night from './values/Colours_night';
import Strings from './values/Strings';
import Dimens from './values/Dimens';
import Attributes from './values/Attributes';


const Stack = createStackNavigator();

function SettingsButton()
{
	const navigation = useNavigation();
	const colourScheme = useColorScheme();
	const colours = colourScheme === 'dark' ? Colours_night : Colours_default;
	
	const SettingsButtonArea = styled.TouchableHighlight`
		width: ${Dimens.toolbarRightButtonIconSize * 2}px;
		height: ${Dimens.toolbarRightButtonIconSize * 2}px;
		border-radius: ${Dimens.toolbarRightButtonIconSize}px;
		margin-right: ${Dimens.mediumInterval};
		align-items: center;
		justify-content: center;
	`;

	return(
		<SettingsButtonArea onPress={() => {navigation.navigate(Attributes.settingsScreenRoute)}} underlayColor={colours.itemBackground_pressed}>
			<Icon
				style={{width: Dimens.toolbarRightButtonIconSize, height: Dimens.toolbarRightButtonIconSize}}
				fill={colours.primaryText}
				name='settings-2-outline' />
		</SettingsButtonArea>
	);
}

export default function App()
{
	const colourScheme = useColorScheme();
	const colours = colourScheme === 'dark' ? Colours_night : Colours_default;
	
	console.disableYellowBox = true; // uncomment it when finishing implementation

	// uncomment the specified lines to delete the specified preference data during the development
	// SecureStore.deleteItemAsync(Attributes.preferenceGenderKey);
	// SecureStore.deleteItemAsync(Attributes.preferenceBirthdayKey);
	// SecureStore.deleteItemAsync(Attributes.preferenceHeightKey);
	// SecureStore.deleteItemAsync(Attributes.preferenceWeightKey);
	// SecureStore.deleteItemAsync(Attributes.preferenceStepGoalKey);
	// SecureStore.deleteItemAsync(Attributes.preferenceWeightGoalKey);

	return(
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={colourScheme === 'dark' ? eva.dark : eva.light}>
				<AppearanceProvider>
					<NavigationContainer>
						<Stack.Navigator
							initialRouteName={Attributes.homeScreenRoute}
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
								name={Attributes.homeScreenRoute}
								component={HomeScreen}
								options={{
									title: Strings.appName,
									headerRight: () => (<SettingsButton />)
								}} />
							<Stack.Screen
								name={Attributes.settingsScreenRoute}
								component={SettingsScreen}
								options={{
									title: Strings.settingsScreen_title
								}} />
							<Stack.Screen
								name={Attributes.aboutScreenRoute}
								component={AboutScreen}
								options={{
									title: Strings.aboutScreen_title_start + Strings.appName,
									headerBackTitle: Strings.settingsScreen_title
								}} />
							<Stack.Screen
								name={Attributes.stepsScreenRoute}
								component={StepsScreen}
								options={{
									title: Strings.stepsScreen_title,
									headerBackTitle: Strings.homeScreen_label
								}} />
							<Stack.Screen
								name={Attributes.weightScreenRoute}
								component={WeightScreen}
								options={{
									title: Strings.weightScreen_title,
									headerBackTitle: Strings.homeScreen_label
								}} />
						</Stack.Navigator>
					</NavigationContainer>
				</AppearanceProvider>
			</ApplicationProvider>
		</>
	);
}