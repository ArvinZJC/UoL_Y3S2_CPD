/*
 * @Description: the home screen
 * @Version: 1.0.2.20200403
 * @Author: Jichen Zhao
 * @Date: 2020-04-01 23:10:11
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-03 00:01:47
 */

import React from 'react';
import styled from 'styled-components';
import {StatusBar, ScrollView} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {useColorScheme} from 'react-native-appearance';
import {useNavigation} from '@react-navigation/native';

import Colours_default from '../values/Colours';
import Colours_night from '../values/Colours_night';
import Strings from '../values/Strings';
import Dimens from '../values/Dimens';


const StepsScreen_route = 'Steps';

function Card(props)
{
	const navigation = useNavigation();
	const colourScheme = useColorScheme();
	const colours = colourScheme === 'light' ? Colours_default : Colours_night;

	const CardLayout = styled.View`
		border-radius: ${Dimens.card_borderRadius};
		background-color: ${props.backgroundColor};
		margin: ${Dimens.margin};
	`;

	const CardArea = styled.TouchableHighlight`
		border-radius: ${Dimens.card_borderRadius};
	`;

	const CardContainer = styled.View`
		padding: ${Dimens.padding};
	`;

	const CardTitle = styled.Text`
		color: ${colours.cardPrimaryText};
		font-size: ${Dimens.primaryTextSize};
		font-weight: bold;
	`;

	return(
		<CardLayout>
			<CardArea onPress={() => navigation.navigate(props.navigateTo)} underlayColor={colours.stepsCardBackground_pressed}>
				<CardContainer>
					<CardTitle>{props.cardTitle}</CardTitle>
					<AnimatedCircularProgress
						size={Dimens.circleProgressSize}
						width={Dimens.circleProgressWidth}
						backgroundWidth={Dimens.circleProgressWidth}
						fill={80}
						tintColor={colours.cardPrimaryText}
						backgroundColor={colours.circleProgressBackground}
						lineCap='round' />
				</CardContainer>
			</CardArea>
		</CardLayout>
	)
}

export default function HomeScreen()
{
	const colourScheme = useColorScheme();
	const colours = colourScheme === 'light' ? Colours_default : Colours_night;

	const RootLayout = styled.View`
		background-color: ${colours.appTheme};
		flex: 1;
		align-items: center;
		justify-content: center;
	`;
	
	return(
		<RootLayout>
			<StatusBar barStyle={colourScheme === 'light' ? 'dark-content' : 'light-content'} backgroundColor={colours.appTheme} />
			<ScrollView style={{width: '100%'}}>
				<Card cardTitle={Strings.stepsScreen_title} navigateTo={StepsScreen_route} backgroundColor={colours.stepsCardBackground} />
			</ScrollView>
		</RootLayout>
	);
}