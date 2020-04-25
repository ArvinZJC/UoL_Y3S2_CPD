/*
 * @Description: the settings screen
 * @Version: 1.0.2.20200425
 * @Author: Jichen Zhao
 * @Date: 2020-04-02 08:41:47
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-25 00:53:59
 */

import React from 'react';
import {StatusBar, View, TouchableHighlight} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import styled from 'styled-components';

import Colours_default from '../values/Colours';
import Colours_night from '../values/Colours_night';
import Strings from '../values/Strings';
import Dimens from '../values/Dimens';
import {
	RootLayout,
	MainContentArea,
	ContentText,
	ExplanationText} from '../values/Styles';


export default function SettingsScreen()
{
	const colourScheme = useColorScheme();
	const colours = colourScheme === 'light' ? Colours_default : Colours_night;

	const Section = styled.View`
		margin-top: ${Dimens.margin};
	`;

	const SectionHeader = styled.View`
		margin-left: ${Dimens.margin};
		margin-right: ${Dimens.margin};
	`;

	const SettingRowContainer = styled.View`
		flex-direction: row;
		padding-top: ${Dimens.padding};
		padding-bottom: ${Dimens.padding};
		padding-left: ${Dimens.margin};
		padding-right: ${Dimens.margin};
	`;
	
	return(
		<RootLayout style={{backgroundColor: colours.appTheme}}>
			<StatusBar barStyle={colourScheme === 'light' ? 'dark-content' : 'light-content'} backgroundColor={colours.appTheme} />
			<MainContentArea>
				<Section style={{marginTop: Dimens.paddingValue}}>
					<SectionHeader>
						<ExplanationText style={{color: colours.settingsSectionHeader, fontWeight: 'bold'}}>{Strings.settingsScreen_sectionBasicInfo_header}</ExplanationText>
					</SectionHeader>
					<View>
						<TouchableHighlight onPress={() => console.log('Gender')} underlayColor={colours.settingBackground_pressed}>
							<SettingRowContainer>
								<ContentText style={{color: colours.primaryText}}>{Strings.settingsScreen_sectionBasicInfo_genderTitle}</ContentText>
							</SettingRowContainer>
						</TouchableHighlight>
					</View>
					<View>
						<TouchableHighlight onPress={() => console.log('Birthday')} underlayColor={colours.settingBackground_pressed}>
							<SettingRowContainer>
								<ContentText style={{color: colours.primaryText}}>{Strings.settingsScreen_sectionBasicInfo_birthdayTitle}</ContentText>
							</SettingRowContainer>
						</TouchableHighlight>
					</View>
					<View>
						<TouchableHighlight onPress={() => console.log('Height')} underlayColor={colours.settingBackground_pressed}>
							<SettingRowContainer>
								<ContentText style={{color: colours.primaryText}}>{Strings.settingsScreen_sectionBasicInfo_heightTitle}</ContentText>
							</SettingRowContainer>
						</TouchableHighlight>
					</View>
					<View>
						<TouchableHighlight onPress={() => console.log('Weight')} underlayColor={colours.settingBackground_pressed}>
							<SettingRowContainer>
								<ContentText style={{color: colours.primaryText}}>{Strings.settingsScreen_sectionBasicInfo_weightTitle}</ContentText>
							</SettingRowContainer>
						</TouchableHighlight>
					</View>
				</Section>
				<Section>
					<SectionHeader>
						<ExplanationText style={{color: colours.settingsSectionHeader, fontWeight: 'bold'}}>{Strings.settingsScreen_sectionGoals_header}</ExplanationText>
					</SectionHeader>
					<View>
						<TouchableHighlight onPress={() => console.log('Step goal')} underlayColor={colours.settingBackground_pressed}>
							<SettingRowContainer>
								<ContentText style={{color: colours.primaryText}}>{Strings.settingsScreen_sectionGoals_stepGoalTitle}</ContentText>
							</SettingRowContainer>
						</TouchableHighlight>
					</View>
					<View>
						<TouchableHighlight onPress={() => console.log('Weight goal')} underlayColor={colours.settingBackground_pressed}>
							<SettingRowContainer>
								<ContentText style={{color: colours.primaryText}}>{Strings.settingsScreen_sectionGoals_weightGoalTitle}</ContentText>
							</SettingRowContainer>
						</TouchableHighlight>
					</View>
				</Section>
			</MainContentArea>
		</RootLayout>
	);
}