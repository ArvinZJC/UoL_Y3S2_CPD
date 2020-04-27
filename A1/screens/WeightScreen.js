/*
 * @Description: the weight screen
 * @Version: 1.0.2.20200427
 * @Author: Jichen Zhao
 * @Date: 2020-04-24 22:50:58
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-27 00:58:38
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {useColorScheme} from 'react-native-appearance';

import Colours_default from '../values/Colours';
import Colours_night from '../values/Colours_night';
import Strings from '../values/Strings';
import Dimens from '../values/Dimens';
import Attributes from '../values/Attributes';
import {
	RootLayout,
	MainContentArea,
	Card,
	CardContentArea} from '../values/Styles';

import XWeight from '../components/XWeight';


export default function WeightScreen()
{
	const colourScheme = useColorScheme();
	const colours = colourScheme === 'light' ? Colours_default : Colours_night;
	
	return(
		<RootLayout style={{backgroundColor: colours.appTheme}}>
			<StatusBar barStyle={colourScheme === 'light' ? 'dark-content' : 'light-content'} backgroundColor={colours.appTheme} />
			<XWeight
				contentTypeId={Attributes.alertContentTypeId}
				warningBackgroundColour={colours.warningBackground}
				borderColour={colours.appTheme}
				textColour={colours.cardPrimaryText} />
			<MainContentArea>
				<Card style={{
					marginTop: Dimens.paddingValue,
					backgroundColor: colours.defaultCardBackground,
					shadowColor: colours.cardShadowColour}}>
					<CardContentArea>
						<XWeight
							titleColour={colours.contentText}
							primaryContentColour={colours.primaryText}
							explanationColour={colours.explanationText} />
					</CardContentArea>
				</Card>
				<Card style={{backgroundColor: colours.defaultCardBackground, shadowColor: colours.cardShadowColour}}>
					<CardContentArea>
						<XWeight
							contentTypeId={Attributes.bmiContentTypeId}
							titleColour={colours.contentText}
							primaryContentColour={colours.primaryText}
							explanationColour={colours.explanationText}
							errorBackgroundColour={colours.errorBackground}
							warningBackgroundColour={colours.warningBackground}
							successBackgroundColour={colours.successBackground}
							unknownBackgroundColour={colours.defaultBadgeBackground}
							badgeTextColour={colours.cardPrimaryText}
							badgeShadowColour={colours.cardShadowColour} />
					</CardContentArea>
				</Card>
				<Card style={{
					backgroundColor: colours.defaultCardBackground,
					shadowColor: colours.cardShadowColour,
					marginBottom: Dimens.lastItemBottomMarginValue}}>
					<CardContentArea>
						<XWeight
							contentTypeId={Attributes.weightRecommendationContentTypeId}
							titleColour={colours.contentText}
							primaryContentColour={colours.primaryText}
							explanationColour={colours.explanationText} />
					</CardContentArea>
				</Card>
			</MainContentArea>
		</RootLayout>
	);
}