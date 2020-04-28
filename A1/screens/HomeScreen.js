/*
 * @Description: the home screen
 * @Version: 1.1.0.20200428
 * @Author: Jichen Zhao
 * @Date: 2020-04-01 23:10:11
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-28 10:41:56
 */

import React from 'react';
import {StatusBar, Image} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import {useNavigation} from '@react-navigation/native';

import Colours_default from '../values/Colours';
import Colours_night from '../values/Colours_night';
import Strings from '../values/Strings';
import Dimens from '../values/Dimens';
import Attributes from '../values/Attributes';
import {
	RootLayout,
	MainContentArea,
	ImageArea,
	Card,
	CardTouchArea,
	CardContentArea,
	BoldPrimaryText} from '../values/Styles';

import XPedometer from '../components/XPedometer';
import XWeight from '../components/XWeight';


export default function HomeScreen()
{
	const navigation = useNavigation();
	const colourScheme = useColorScheme();
	const colours = colourScheme === 'dark' ? Colours_night : Colours_default;
	const startUpDateTime = new Date(); // this is set and passed to the steps screen to avoid different initial values during the synchronous update
	
	return(
		<RootLayout style={{backgroundColor: colours.appTheme}}>
			<StatusBar barStyle={colourScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colours.appTheme} />
			<XPedometer
				contentTypeId={Attributes.alertContentTypeId}
				startUpDateTime={startUpDateTime}
				endToday={startUpDateTime}
				errorBackgroundColour={colours.errorBackground}
				warningBackgroundColour={colours.warningBackground}
				successBackgroundColour={colours.successBackground}
				borderColour={colours.appTheme}
				textColour={colours.cardPrimaryText} />
			<MainContentArea>
				<ImageArea>
					<Card style={{
						marginTop: Dimens.paddingValue,
						backgroundColor: colours.stepsCardBackground,
						shadowColor: colours.cardShadowColour}}>
						<Image
							source={require('../assets/icon.png')}
							style={{
								width: Dimens.logoSideLength,
								height: Dimens.logoSideLength,
								borderRadius: Dimens.cardBorderRadiusValue}} />
					</Card>
				</ImageArea>
				<Card style={{backgroundColor: colours.cardStepsBackground, shadowColor: colours.cardShadowColour}}>
					<CardTouchArea onPress={() => navigation.navigate(Attributes.stepsScreenRoute, {start_up: startUpDateTime})} underlayColor={colours.cardStepsBackground_pressed}>
						<CardContentArea>
							<BoldPrimaryText style={{color: colours.cardPrimaryText}}>{Strings.stepsScreen_title}</BoldPrimaryText>
							<XPedometer
								contentTypeId={Attributes.contentWithProgressTypeId}
								startUpDateTime={startUpDateTime}
								endToday={startUpDateTime}
								textColour={colours.cardPrimaryText}
								circularProgressBackgroundColour={colours.translucentBackground} />
						</CardContentArea>
					</CardTouchArea>
				</Card>
				<Card style={{
					backgroundColor: colours.cardWeightBackground,
					shadowColor: colours.cardShadowColour,
					marginBottom: Dimens.lastItemBottomMarginValue}}>
					<CardTouchArea onPress={() => navigation.navigate(Attributes.weightScreenRoute)} underlayColor={colours.cardWeightBackground_pressed}>
						<CardContentArea>
							<BoldPrimaryText style={{color: colours.cardPrimaryText}}>{Strings.weightScreen_title}</BoldPrimaryText>
							<XWeight
								contentTypeId={Attributes.contentWithBadgeTypeId}
								errorBackgroundColour={colours.errorBackground}
								warningBackgroundColour={colours.warningBackground}
								successBackgroundColour={colours.successBackground}
								unknownBackgroundColour={colours.defaultBadgeBackground}
								textColour={colours.cardPrimaryText}
								badgeShadowColour={colours.cardShadowColour} />
						</CardContentArea>
					</CardTouchArea>
				</Card>
			</MainContentArea>
		</RootLayout>
	);
}