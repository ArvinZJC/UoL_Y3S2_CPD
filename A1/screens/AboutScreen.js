/*
 * @Description: the screen of the brief introduction of the app
 * @Version: 1.0.0.20200425
 * @Author: Jichen Zhao
 * @Date: 2020-04-25 16:37:28
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-25 19:08:35
 */

import React from 'react';
import {StatusBar, Image, View, Linking} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import Constants from 'expo-constants';

import Colours_default from '../values/Colours';
import Colours_night from '../values/Colours_night';
import Strings from '../values/Strings';
import Dimens from '../values/Dimens';
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
    const colours = colourScheme === 'light' ? Colours_default : Colours_night;
    const standaloneAppTypeId = 'standalone';
    const appVersion = '1.0.0';
    const sourceCodeUrl = 'https://github.com/ArvinZJC/UoL_Y3S2_CPD/tree/master/A1';
	
	return(
		<RootLayout style={{backgroundColor: colours.appTheme}}>
			<StatusBar barStyle={colourScheme === 'light' ? 'dark-content' : 'light-content'} backgroundColor={colours.appTheme} />
			<RootLayout style={{justifyContent: 'space-between', paddingHorizontal: Dimens.marginValue}}>
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
                    <ContentText style={{color: colours.contentText, marginTop: Dimens.paddingValue}}>{Strings.aboutAppExplanation_start + (Constants.appOwnership === standaloneAppTypeId ? Constants.nativeAppVersion : appVersion)}</ContentText>
                </ImageArea>
                <View style={{alignItems: 'center'}}>
                    <CardRowContainer style={{marginBottom: Dimens.mediumIntervalValue}}>
                        <BoldPrimaryText style={{color: colours.primaryText, fontWeight: 'normal'}}>{Strings.appName + Strings.aboutScreen_introduction_line1_part1}</BoldPrimaryText>
                        <BoldPrimaryText
                            style={{
                                color: colours.settingsSectionHeader,
                                fontWeight: 'normal',
                                textDecorationLine: 'underline'}}
                            onPress={() => Linking.openURL(sourceCodeUrl)}>
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
                <View style={{marginBottom: Dimens.marginValue}}>
                    <ContentText style={{color: colours.contentText}}>{Strings.aboutScreen_copyright}</ContentText>
                </View>
			</RootLayout>
		</RootLayout>
	);
}