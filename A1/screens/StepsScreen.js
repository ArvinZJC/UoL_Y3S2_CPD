/*
 * @Description: the steps screen
 * @Version: 1.0.6.20200428
 * @Author: Jichen Zhao
 * @Date: 2020-04-02 15:15:11
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-28 02:05:23
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {useColorScheme} from 'react-native-appearance';

import Colours_default from '../values/Colours';
import Colours_night from '../values/Colours_night';
import Dimens from '../values/Dimens';
import Attributes from '../values/Attributes';
import {
	RootLayout,
	MainContentArea,
	Card,
	CardContentArea} from '../values/Styles';

import XPedometer from '../components/XPedometer';


export default function StepsScreen()
{
	const colourScheme = useColorScheme();
	const colours = colourScheme === 'dark' ? Colours_night : Colours_default;
	
	return(
		<RootLayout style={{backgroundColor: colours.appTheme}}>
			<StatusBar barStyle={colourScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colours.appTheme} />
			<XPedometer
				contentTypeId={Attributes.alertContentTypeId}
				errorBackgroundColour={colours.errorBackground}
				warningBackgroundColour={colours.warningBackground}
				successBackgroundColour={colours.successBackground}
				borderColour={colours.appTheme}
				textColour={colours.cardPrimaryText}
				goal={10000} />
			<MainContentArea>
				<Card style={{
					marginTop: Dimens.paddingValue,
					backgroundColor: colours.defaultCardBackground,
					shadowColor: colours.cardShadowColour}}>
					<XPedometer
						contentTypeId={Attributes.chartContentTypeId}
						chartTitleColour={colours.contentText}
						chartConfig={{
							backgroundGradientFrom: colours.defaultCardBackground,
							backgroundGradientTo: colours.defaultCardBackground,
							color: (opacity = 1) => colourScheme === 'dark' ? `rgba(242, 242, 247, ${opacity})` : `rgba(51, 51, 51, ${opacity})`, // primary text colour
							barPercentage: Dimens.barPercentage
						}} />
				</Card>
				<Card style={{backgroundColor: colours.defaultCardBackground, shadowColor: colours.cardShadowColour}}>
					<CardContentArea>
						<XPedometer
							titleColour={colours.contentText}
							primaryContentColour={colours.primaryText}
							explanationColour={colours.explanationText} />
					</CardContentArea>
				</Card>
				<Card style={{
					backgroundColor: colours.defaultCardBackground,
					shadowColor: colours.cardShadowColour,
					marginBottom: Dimens.lastItemBottomMarginValue}}>
					<CardContentArea>
						<XPedometer
							contentTypeId={Attributes.extraStepInfoContentTypeId}
							titleColour={colours.contentText}
							primaryContentColour={colours.primaryText}
							explanationColour={colours.explanationText} />
					</CardContentArea>
				</Card>
			</MainContentArea>
		</RootLayout>
	);
}