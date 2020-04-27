/*
 * @Description: the settings screen
 * @Version: 1.0.3.20200426
 * @Author: Jichen Zhao
 * @Date: 2020-04-02 08:41:47
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-26 12:56:57
 */

import React from 'react';
import {DeviceEventEmitter, Platform, StatusBar, View, TouchableHighlight, Linking} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import {useNavigation} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/stack';
import styled from 'styled-components';
import Constants from 'expo-constants';

import Colours_default from '../values/Colours';
import Colours_night from '../values/Colours_night';
import Strings from '../values/Strings';
import Dimens from '../values/Dimens';
import Attributes from '../values/Attributes';
import {
	RootLayout,
	MainContentArea,
	ContentText,
	ExplanationText,
	SettingRowContainer} from '../values/Styles';

import {
	XGenderPicker,
	XBirthdayPicker,
	XHeightPicker,
	XWeightPicker,
	XStepGoalPicker} from '../components/XPicker';


export default function SettingsScreen()
{
	const navigation = useNavigation();
	const colourScheme = useColorScheme();
	const colours = colourScheme === 'light' ? Colours_default : Colours_night;

	React.useLayoutEffect(() =>
		{
			navigation.setOptions({
				headerLeft: () => (<HeaderBackButton
					label={Strings.homeScreen_label}
					tintColor={Platform.OS === 'android' ? colours.primaryText : colours.splashBackground}
					onPress={() =>
						{
							DeviceEventEmitter.emit(Attributes.backListenerKey, null);
							navigation.goBack();
						}} />)
			});
		});
	
	const Section = styled.View`
		margin-top: ${Dimens.margin};
	`;

	const SectionHeader = styled.View`
		margin-left: ${Dimens.margin};
		margin-right: ${Dimens.margin};
	`;
	
	return(
		<RootLayout style={{backgroundColor: colours.appTheme}}>
			<StatusBar barStyle={colourScheme === 'light' ? 'dark-content' : 'light-content'} backgroundColor={colours.appTheme} />
			<MainContentArea>
				<Section style={{marginTop: Dimens.paddingValue}}>
					<SectionHeader>
						<ExplanationText style={{color: colours.splashBackground, fontWeight: 'bold'}}>{Strings.settingsScreen_sectionBasicInfo_header}</ExplanationText>
					</SectionHeader>
					<View>
						<XGenderPicker underlayColour={colours.itemBackground_pressed} titleColour={colours.primaryText} />
					</View>		
					<View>
						<XBirthdayPicker underlayColour={colours.itemBackground_pressed} titleColour={colours.primaryText} />
					</View>
					<View>
						<XHeightPicker underlayColour={colours.itemBackground_pressed} titleColour={colours.primaryText} />
					</View>
					<View>
						<XWeightPicker underlayColour={colours.itemBackground_pressed} titleColour={colours.primaryText} />
					</View>
				</Section>
				<Section>
					<SectionHeader>
						<ExplanationText style={{color: colours.splashBackground, fontWeight: 'bold'}}>{Strings.settingsScreen_sectionGoals_header}</ExplanationText>
					</SectionHeader>
					<View>
						<XStepGoalPicker underlayColour={colours.itemBackground_pressed} titleColour={colours.primaryText} />
					</View>
					<View>
						<XWeightPicker
							typeId={Attributes.weightGoalPickerTypeId}
							underlayColour={colours.itemBackground_pressed}
							titleColour={colours.primaryText} />
					</View>
				</Section>
				<Section style={{marginBottom: Dimens.lastItemBottomMarginValue}}>
					<SectionHeader>
						<ExplanationText style={{color: colours.splashBackground, fontWeight: 'bold'}}>{Strings.settingsScreen_sectionOthers_header}</ExplanationText>
					</SectionHeader>
					<TouchableHighlight onPress={() => Linking.openURL('mailto:' + Attributes.developerEmail)}  underlayColor={colours.itemBackground_pressed}>
						<SettingRowContainer style={{paddingTop: Dimens.paddingValue, paddingBottom: Dimens.paddingValue}}>
							<ContentText style={{color: colours.primaryText}}>{Strings.settingsScreen_sectionOthers_sendFeedbackTitle}</ContentText>
						</SettingRowContainer>
					</TouchableHighlight>
					<TouchableHighlight onPress={() => navigation.navigate(Attributes.aboutScreenRoute)}  underlayColor={colours.itemBackground_pressed}>
						<SettingRowContainer style={{paddingTop: Dimens.paddingValue, paddingBottom: Dimens.paddingValue}}>
							<ContentText style={{color: colours.primaryText}}>{Strings.settingsScreen_sectionOthers_aboutAppTitle_start + Strings.appName}</ContentText>
							<ExplanationText style={{color: colours.explanationText}}>{Strings.aboutAppExplanation_start + (Constants.appOwnership === Attributes.standaloneAppTypeId ? Constants.nativeAppVersion : Attributes.appVersion)}</ExplanationText>
						</SettingRowContainer>
					</TouchableHighlight>
				</Section>
			</MainContentArea>
		</RootLayout>
	);
}