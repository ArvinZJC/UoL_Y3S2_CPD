/*
 * @Description: a universal style sheet
 * @Version: 1.0.3.20200426
 * @Author: Jichen Zhao
 * @Date: 2020-04-23 18:11:40
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-26 21:39:39
 */

import styled from 'styled-components';

import Dimens from './Dimens';


export const RootLayout = styled.View`
	flex: 1;
	align-items: center;
`;

export const AlertArea = styled.View`
    width: 100%;
    margin-bottom: 10px;
`;

export const MainContentArea = styled.ScrollView`
    width: 100%;
`;

export const ImageArea = styled.View`
    align-items: center;
`;

export const Card = styled.View`
    border-radius: ${Dimens.cardBorderRadius};
    margin: ${Dimens.margin};
    margin-bottom: 0;
    elevation: ${Dimens.cardElevation};
    shadow-offset: ${Dimens.cardShadowOffset};
    shadow-opacity: ${Dimens.cardShadowOpacity};
    shadow-radius: ${Dimens.cardShadowRadius};
`;

export const CardTouchArea = styled.TouchableHighlight`
    border-radius: ${Dimens.cardBorderRadius};
`;

export const CardContentArea = styled.View`
    padding: ${Dimens.padding};
    padding-bottom: 0;
`;

export const CardRowContainer = styled.View`
    flex-direction: row;
`;

export const CardColumnContainer = styled.View`
    flex-direction: column;
    align-items: center;
`;

export const BoldPrimaryText = styled.Text`
    font-size: ${Dimens.primaryTextSize};
    font-weight: bold;
    text-align: justify;
`;

export const ContentText = styled.Text`
    font-size: ${Dimens.contentTextSize};
    text-align: justify;
`;

export const ExplanationText = styled.Text`
    font-size: ${Dimens.explanationTextSize};
    text-align: justify;
`;

export const Badge = styled.View`
    border-radius: ${Dimens.badgeBorderRadius};
    width: ${Dimens.circleProgressSize}px;
    height: ${Dimens.primaryTextSizeValue + Dimens.mediumIntervalValue}px;
    justify-content: center;
    align-items: center;
    elevation: ${Dimens.cardElevation};
    shadow-offset: ${Dimens.cardShadowOffset};
    shadow-opacity: ${Dimens.cardShadowOpacity};
    shadow-radius: ${Dimens.cardShadowRadius};
                `;

export const SettingRowContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-top: ${Dimens.mediumInterval};
	padding-bottom: ${Dimens.mediumInterval};
	padding-left: ${Dimens.margin};
	padding-right: ${Dimens.margin};
`;