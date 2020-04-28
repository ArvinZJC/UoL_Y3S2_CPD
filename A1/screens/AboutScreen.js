/*
 * @Description: the screen of the brief introduction of the app
 * @Version: 1.0.1.20200428
 * @Author: Jichen Zhao
 * @Date: 2020-04-25 16:37:28
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-28 01:57:11
 */

import React from 'react';
import {StatusBar, Image, View, Linking} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import Constants from 'expo-constants';

import Colours_default from '../values/Colours';
import Colours_night from '../values/Colours_night';
import Strings from '../values/Strings';
import Dimens from '../values/Dimens';
import Attributes from '../values/Attributes';
import {
	RootLayout,
	ImageArea,
    Card,
    CardRowContainer,
    BoldPrimaryText,
    ContentText} from '../values/Styles';


export default function AboutScreen()
{
	const colourScheme = useColorScheme();
    const colours = colourScheme === 'dark' ? Colours_night : Colours_default;
	
	return(
		<RootLayout style={{backgroundColor: colours.appTheme}}>
			<StatusBar barStyle={colourScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colours.appTheme} />
			<RootLayout style={{justifyContent: 'space-between', paddingHorizontal: Dimens.marginValue}}>
                <ImageArea>
                    <Card style={{
                        marginTop: 50,
                        backgroundColor: colours.stepsCardBackground,
                        shadowColor: colours.cardShadowColour}}>
                        <Image
                            source={require('../assets/icon.png')}
                            style={{
                                width: Dimens.logoSideLength,
                                height: Dimens.logoSideLength,
                                borderRadius: Dimens.cardBorderRadiusValue}} />
                    </Card>
                    <ContentText style={{color: colours.contentText, marginTop: Dimens.paddingValue}}>{Strings.aboutAppExplanation_start + (Constants.appOwnership === Attributes.standaloneAppTypeId ? Constants.nativeAppVersion : Attributes.appVersion)}</ContentText>
                </ImageArea>
                <View style={{alignItems: 'center'}}>
                    <CardRowContainer style={{marginBottom: Dimens.mediumIntervalValue}}>
                        <BoldPrimaryText style={{color: colours.primaryText, fontWeight: 'normal'}}>{Strings.appName + Strings.aboutScreen_introduction_line1_part1}</BoldPrimaryText>
                        <BoldPrimaryText
                            style={{
                                color: colours.splashBackground,
                                fontWeight: 'normal',
                                textDecorationLine: 'underline'}}
                            onPress={() => Linking.openURL(Attributes.sourceCodeUrl)}>
                            {Strings.aboutScreen_introduction_line1_part2}
                        </BoldPrimaryText>
                        <BoldPrimaryText style={{color: colours.primaryText, fontWeight: 'normal'}}>{Strings.aboutScreen_introduction_line1_part3}</BoldPrimaryText>
                    </CardRowContainer>
                    <View style={{marginBottom: Dimens.mediumIntervalValue}}>
                        <BoldPrimaryText style={{
                            color: colours.primaryText,
                            fontWeight: 'normal',
                            textAlign: 'center'}}>{Strings.aboutScreen_introduction_otherLines}</BoldPrimaryText>
                    </View>
                    <BoldPrimaryText style={{
                        color: colours.primaryText,
                        fontWeight: 'normal',
                        textAlign: 'center'}}>{Strings.aboutScreen_notice}</BoldPrimaryText>
                </View>
                <View style={{marginBottom: Dimens.lastItemBottomMarginValue}}>
                    <ContentText style={{color: colours.contentText}}>{Strings.aboutScreen_copyright}</ContentText>
                </View>
			</RootLayout>
		</RootLayout>
	);
}