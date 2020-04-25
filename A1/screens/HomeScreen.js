/*
 * @Description: the home screen
 * @Version: 1.0.5.20200425
 * @Author: Jichen Zhao
 * @Date: 2020-04-01 23:10:11
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-25 16:44:27
 */

import React from 'react';
import {StatusBar, Image} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import {useNavigation} from '@react-navigation/native';

import Colours_default from '../values/Colours';
import Colours_night from '../values/Colours_night';
import Strings from '../values/Strings';
import Dimens from '../values/Dimens';
import {
	RootLayout,
	MainContentArea,
	ImageArea,
	Card,
	CardTouchArea,
	CardContentArea,
	BoldPrimaryText} from '../values/Styles';

import XPedometer from '../components/XPedometer';


const StepsScreen_route = 'Steps';
const WeightScreen_route = 'Weight';

export default function HomeScreen()
{
	const navigation = useNavigation();
	const colourScheme = useColorScheme();
	const colours = colourScheme === 'light' ? Colours_default : Colours_night;
	const alertContentTypeId = 'alert';
	const contentWithProgressTypeId = 'with-progess';
	
	return(
		<RootLayout style={{backgroundColor: colours.appTheme}}>
			<StatusBar barStyle={colourScheme === 'light' ? 'dark-content' : 'light-content'} backgroundColor={colours.appTheme} />
			<XPedometer
				contentTypeId={alertContentTypeId}
				alertBackgroundColour={colours.errorAlertBackground}
				warningBackgroundColour={colours.warningAlertBackground}
				successBackgroundColour={colours.successAlertBackground}
				borderColour={colours.appTheme}
				textColour={colours.cardPrimaryText}
				goal={10000} />
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
				<Card style={{backgroundColor: colours.stepsCardBackground, shadowColor: colours.cardShadowColour}}>
					<CardTouchArea onPress={() => navigation.navigate(StepsScreen_route)} underlayColor={colours.stepsCardBackground_pressed}>
						<CardContentArea>
							<BoldPrimaryText style={{color: colours.cardPrimaryText}}>{Strings.stepsScreen_title}</BoldPrimaryText>
							<XPedometer
								contentTypeId={contentWithProgressTypeId}
								textColour={colours.cardPrimaryText}
								circularProgressBackgroundColour={colours.circleProgressBackground}
								goal={10000} />
						</CardContentArea>
					</CardTouchArea>
				</Card>
				<Card style={{backgroundColor: colours.stepsWeightBackground, shadowColor: colours.cardShadowColour, marginBottom: 30}}>
					<CardTouchArea onPress={() => navigation.navigate(WeightScreen_route)} underlayColor={colours.stepsWeightBackground_pressed}>
						<CardContentArea>
							<BoldPrimaryText style={{color: colours.cardPrimaryText}}>{Strings.weightScreen_title}</BoldPrimaryText>
						</CardContentArea>
					</CardTouchArea>
				</Card>
			</MainContentArea>
		</RootLayout>
	); // TODO: step goal
}