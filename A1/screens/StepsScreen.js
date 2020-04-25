/*
 * @Description: the steps screen
 * @Version: 1.0.3.20200425
 * @Author: Jichen Zhao
 * @Date: 2020-04-02 15:15:11
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-25 03:54:18
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {useColorScheme} from 'react-native-appearance';

import Colours_default from '../values/Colours';
import Colours_night from '../values/Colours_night';
import Dimens from '../values/Dimens';
import {
	RootLayout,
	MainContentArea,
	Card,
	CardContentArea} from '../values/Styles';

import XPedometer from '../components/XPedometer';


export default function StepsScreen()
{
	const colourScheme = useColorScheme();
	const colours = colourScheme === 'light' ? Colours_default : Colours_night;
	const alertContentTypeId = 'alert';
	const chartContentTypeId = 'chart';
	
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
				<Card style={{
					marginTop: Dimens.paddingValue,
					backgroundColor: colours.defaultCardBackground,
					shadowColor: colours.cardShadowColour}}>
					<XPedometer
						contentTypeId={chartContentTypeId}
						chartTitleColour={colours.contentText}
						chartConfig={{
							backgroundGradientFrom: colours.defaultCardBackground,
							backgroundGradientTo: colours.defaultCardBackground,
							color: (opacity = 1) => colourScheme === 'light' ? `rgba(51, 51, 51, ${opacity})` : `rgba(242, 242, 247, ${opacity})`, // primary text colour
							barPercentage: Dimens.barPercentage
						}} />
				</Card>
				<Card style={{
					backgroundColor: colours.defaultCardBackground,
					shadowColor: colours.cardShadowColour,
					marginBottom: 30}}>
					<CardContentArea>
						<XPedometer
							titleColour={colours.contentText}
							primaryContentColour={colours.primaryText}
							explanationColour={colours.explanationText}
							goal={10000} />
					</CardContentArea>
				</Card>
			</MainContentArea>
		</RootLayout>
	); // TODO: step goal
}