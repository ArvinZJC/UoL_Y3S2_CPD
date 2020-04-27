/*
 * @Description: a weight component
 * @Version: 1.0.2.20200427
 * @Author: Jichen Zhao
 * @Date: 2020-04-26 18:24:14
 * @Last Editors: Jichen
 * @LastEditTime: 2020-04-27 06:12:55
 */

import React from 'react';
import {DeviceEventEmitter} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

import Strings from '../values/Strings';
import Dimens from '../values/Dimens';
import Attributes from '../values/Attributes';
import {
    AlertArea,
    CardRowContainer,
    CardColumnContainer,
    BoldPrimaryText,
    ContentText,
    ExplanationText,
    Badge} from '../values/Styles';

import XAlert from './XAlert';


export default class XWeight extends React.Component
{
    state = {
        gender: Strings.placeholder,
        birthday: Strings.placeholder,
        height: Strings.placeholder,
        weight: Strings.placeholder,
        stepGoal: Strings.placeholder,
        weightGoal: Strings.placeholder
    };

    componentDidMount()
    {
        this._subscribe();
    }

    componentWillUnmount()
    {
        this._unsubscribe();
    }

    getGenderSaved = () =>
    {
        SecureStore.getItemAsync(Attributes.preferenceGenderKey).then((indexSaved) =>
            {
                this.setState({
                    gender: indexSaved === null ? null : JSON.parse(indexSaved)
                });
            }).catch((e) =>
            {
                console.log('Failed to get the gender preference data saved. ' + e);
            });
    };

    getBirthdaySaved = () =>
    {
        SecureStore.getItemAsync(Attributes.preferenceBirthdayKey).then((dateSaved) =>
            {
                this.setState({
                    birthday: dateSaved === null ? null : new Date(JSON.parse(dateSaved))
                });
            }).catch((e) =>
            {
                console.log('Failed to get the birthday preference data saved. ' + e);
            });
    };

    getHeightSaved = () =>
    {
        SecureStore.getItemAsync(Attributes.preferenceHeightKey).then((indexSaved) =>
            {
                this.setState({
                    height: indexSaved === null ? null : JSON.parse(indexSaved) + 10
                });
            }).catch((e) =>
            {
                console.log('Failed to get the height preference data saved. ' + e);
            });
    };

    getWeightSaved = () =>
    {
        SecureStore.getItemAsync(Attributes.preferenceWeightKey).then((indexSaved) =>
            {
                this.setState({
                    weight: indexSaved === null ? null : JSON.parse(indexSaved) + 10
                });
            }).catch((e) =>
            {
                console.log('Failed to get the weight preference data saved. ' + e);
            });
    };

    getStepGoalSaved = () =>
    {
        SecureStore.getItemAsync(Attributes.preferenceStepGoalKey).then((indexSaved) =>
            {
                this.setState({
                    stepGoal: indexSaved === null ? null : 1000 * (JSON.parse(indexSaved) + 1)
                });
            }).catch((e) =>
            {
                console.log('Failed to get the step goal preference data saved. ' + e);
            });
    };

    getWeightGoalSaved = () =>
    {
        SecureStore.getItemAsync(Attributes.preferenceWeightGoalKey).then((indexSaved) =>
            {
                this.setState({
                    weightGoal: indexSaved === null ? null : JSON.parse(indexSaved) + 10
                });
            }).catch((e) =>
            {
                console.log('Failed to get the weight goal preference data saved. ' + e);
            });
    };

    _subscribe = () =>
    {
        this._subscription = DeviceEventEmitter.addListener(Attributes.backListenerKey, () =>
            {
                this.getGenderSaved();
                this.getBirthdaySaved();
                this.getHeightSaved();
                this.getWeightSaved();
                this.getStepGoalSaved();
                this.getWeightGoalSaved();
            });
        
        this.getGenderSaved();
        this.getBirthdaySaved();
        this.getHeightSaved();
        this.getWeightSaved();
        this.getStepGoalSaved();
        this.getWeightGoalSaved();
    };

    _unsubscribe = () =>
    {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    render()
    {
        const weightLabelDictionary = {
            unknown: {
                label: Strings.weightScreen_unknownLabel,
                iconCode: 'md-help'
            },
            underweight: {
                label: Strings.weightScreen_underweightLabel,
                iconCode: 'md-sad'
            },
            normal: {
                label: Strings.weightScreen_normalLabel,
                iconCode: 'ios-thumbs-up'
            },
            overweight: {
                label: Strings.weightScreen_overweightLabel,
                iconCode: 'md-alert'
            },
            severelyObese: {
                label: Strings.weightScreen_severelyObeseLabel,
                iconCode: 'ios-thumbs-down'
            }
        };
    
        var bmi = Strings.placeholder;
        var bmiLevel = weightLabelDictionary.unknown;
        var recommendedWeight = Strings.placeholder;
        var recommendedBmi = Strings.placeholder;

        if (this.state.height !== Strings.placeholder
            && this.state.height !== null
            && this.state.weight !== Strings.placeholder
            && this.state.weight !== null)
        {
            bmi = this.state.weight / ((this.state.height / 100) * (this.state.height / 100)); // unit: kg/m^2
            bmi = bmi.toFixed(1); // keep 1 decimal place
            
            if (bmi < 18.5)
            {
                bmiLevel = weightLabelDictionary.underweight;
            }
            else if (bmi < 24)
            {
                bmiLevel = weightLabelDictionary.normal;
            }
            else if (bmi < 28)
            {
                bmiLevel = weightLabelDictionary.overweight;
            }
            else
            {
                bmiLevel = weightLabelDictionary.severelyObese;
            } // end nested if...else

            if (this.state.gender !== Strings.placeholder && this.state.gender !== null)
            {
                if (this.state.gender === Attributes.genderMaleId)
                {
                    recommendedWeight = Math.round((this.state.height - 80) * Attributes.recommendedWeightCoefficient_male);
                }
                else
                {
                    recommendedWeight = Math.round((this.state.height - 70) * Attributes.recommendedWeightCoefficient_female);
                } // end if...else

                recommendedBmi = recommendedWeight / ((this.state.height / 100) * (this.state.height / 100)); // unit: kg/m^2
                recommendedBmi = recommendedBmi.toFixed(1); // keep 1 decimal place
            } // end if
            
        } // end if

        switch (this.props.contentTypeId)
        {
            case Attributes.alertContentTypeId:
                if (this.state.gender === Strings.placeholder
                    || this.state.gender === null
                    || this.state.birthday === Strings.placeholder
                    || this.state.birthday === null
                    || this.state.height === Strings.placeholder
                    || this.state.height === null
                    || this.state.weight === Strings.placeholder
                    || this.state.weight === null
                    || this.state.stepGoal === Strings.placeholder
                    || this.state.stepGoal === null
                    || this.state.weightGoal === Strings.placeholder
                    || this.state.weightGoal == null)
                {
                    return(
                        <AlertArea>
                            <XAlert
                                backgroundColour={this.props.warningBackgroundColour}
                                borderColour={this.props.borderColour}
                                textColour={this.props.textColour}
                                message={Strings.alert_lackOfImportantInfo} />
                        </AlertArea>
                    );
                }
                else
                {
                    return null;
                } // end if...else
            
            case Attributes.contentWithBadgeTypeId:
                var badgeBackgroundColour = this.props.unknownBackgroundColour;

                if (bmiLevel === weightLabelDictionary.underweight)
                {
                    badgeBackgroundColour = this.props.warningBackgroundColour;
                }
                else if (bmiLevel === weightLabelDictionary.normal)
                {
                    badgeBackgroundColour = this.props.successBackgroundColour;
                }
                else if (bmiLevel === weightLabelDictionary.overweight)
                {
                    badgeBackgroundColour = this.props.warningBackgroundColour;
                }
                else if (bmiLevel === weightLabelDictionary.severelyObese)
                {
                    badgeBackgroundColour = this.props.errorBackgroundColour;
                } // end nested if...else

                return(
                    <CardRowContainer style={{justifyContent: 'space-between'}}>
                        <CardRowContainer style={{alignItems: 'flex-end'}}>
                            <BoldPrimaryText style={{
                                marginBottom: 8,
                                color: this.props.textColour,
                                fontSize: Dimens.cardBigTextSizeValue}}>
                                {this.state.weight === null ? Strings.placeholder : this.state.weight}
                            </BoldPrimaryText>
                            <ExplanationText style={{marginBottom: Dimens.paddingValue, color: this.props.textColour}}>/{(this.state.weightGoal === null ? Strings.placeholder : this.state.weightGoal) + Strings.weightUnit}</ExplanationText>
                        </CardRowContainer>
                        <CardRowContainer style={{alignItems: 'flex-end'}}>
                            <Badge style={{
                                backgroundColor: badgeBackgroundColour,
                                marginBottom: Dimens.paddingValue,
                                shadowColor: this.props.badgeShadowColour}}>
                                <Ionicons name={bmiLevel.iconCode} size={Dimens.primaryTextSizeValue} color={this.props.textColour} />
                            </Badge>
                        </CardRowContainer>
                    </CardRowContainer>
                );

            case Attributes.bmiContentTypeId:
                var badgeBackgroundColour = this.props.unknownBackgroundColour;

                if (bmiLevel === weightLabelDictionary.underweight)
                {
                    badgeBackgroundColour = this.props.warningBackgroundColour;
                }
                else if (bmiLevel === weightLabelDictionary.normal)
                {
                    badgeBackgroundColour = this.props.successBackgroundColour;
                }
                else if (bmiLevel === weightLabelDictionary.overweight)
                {
                    badgeBackgroundColour = this.props.warningBackgroundColour;
                }
                else if (bmiLevel === weightLabelDictionary.severelyObese)
                {
                    badgeBackgroundColour = this.props.errorBackgroundColour;
                } // end nested if...else

                return(
                    <CardColumnContainer>
						<ContentText style={{marginBottom: Dimens.smallIntervalValue, color: this.props.titleColour}}>{Strings.weightScreen_cardBmi_title}</ContentText>
                        <CardRowContainer style={{marginBottom: Dimens.smallIntervalValue, alignItems: 'flex-end'}}>
                            <BoldPrimaryText style={{color: this.props.primaryContentColour, fontSize: Dimens.cardBigTextSizeValue}}>{bmi}</BoldPrimaryText>
                            <Badge style={{
                                backgroundColor: badgeBackgroundColour,
                                marginLeft: Dimens.mediumIntervalValue,
                                marginBottom: 7,
                                shadowColor: this.props.badgeShadowColour,
                                width: 'auto'}}>
                                <ExplanationText style={{marginHorizontal: Dimens.mediumIntervalValue, color: this.props.badgeTextColour}}>{bmiLevel.label}</ExplanationText>
                            </Badge>
                        </CardRowContainer>
                        <ExplanationText style={{
                            marginBottom: Dimens.paddingValue,
                            color: this.props.explanationColour,
                            fontStyle: 'italic',
                            textAlign: 'center'}}>{Strings.weightScreen_cardBmi_explanation}</ExplanationText>
					</CardColumnContainer>
                );
            
            case Attributes.weightRecommendationContentTypeId:
                return(
                    <CardColumnContainer>
                        <ContentText style={{marginBottom: Dimens.smallIntervalValue, color: this.props.titleColour}}>{Strings.weightScreen_cardRecommended_title}</ContentText>
                        <CardRowContainer style={{width: '100%', justifyContent: 'space-around'}}>
                            <CardColumnContainer>
                                <CardRowContainer style={{marginBottom: Dimens.smallIntervalValue, alignItems: 'flex-end'}}>
                                    <BoldPrimaryText style={{color: this.props.primaryContentColour, fontSize: Dimens.cardMediumTextSizeValue}}>{recommendedWeight}</BoldPrimaryText>
                                    <ExplanationText style={{marginBottom: 3, color: this.props.explanationColour}}>{Strings.weightUnit}</ExplanationText>
                                </CardRowContainer>
                                <ContentText style={{marginBottom: Dimens.smallIntervalValue, color: this.props.titleColour}}>{Strings.weightScreen_title}</ContentText>
                            </CardColumnContainer>
                            <CardColumnContainer>
                                <CardRowContainer style={{marginBottom: Dimens.smallIntervalValue, alignItems: 'flex-end'}}>
                                    <BoldPrimaryText style={{color: this.props.primaryContentColour, fontSize: Dimens.cardMediumTextSizeValue}}>{recommendedBmi}</BoldPrimaryText>
                                </CardRowContainer>
                                <ContentText style={{marginBottom: Dimens.smallIntervalValue, color: this.props.titleColour}}>{Strings.weightScreen_cardBmi_title}</ContentText>
                            </CardColumnContainer>
                        </CardRowContainer>
                        <ExplanationText style={{
                            marginBottom: Dimens.paddingValue,
                            color: this.props.explanationColour,
                            fontStyle: 'italic',
                            textAlign: 'center'}}>{Strings.weightScreen_cardRecommended_instructions}</ExplanationText>
                    </CardColumnContainer>
                );
            
            default:
                return(
                    <CardColumnContainer>
						<ContentText style={{marginBottom: Dimens.smallIntervalValue, color: this.props.titleColour}}>{Strings.weightScreen_cardWeight_title}</ContentText>
                        <CardRowContainer style={{marginBottom: Dimens.smallIntervalValue, alignItems: 'flex-end'}}>
                            <BoldPrimaryText style={{color: this.props.primaryContentColour, fontSize: Dimens.cardBigTextSizeValue}}>{this.state.weight === null ? Strings.placeholder : this.state.weight}</BoldPrimaryText>
                            <ExplanationText style={{marginBottom: 7, color: this.props.explanationColour}}>{Strings.weightUnit}</ExplanationText>
                        </CardRowContainer>
						<ExplanationText style={{marginBottom: Dimens.paddingValue, color: this.props.explanationColour}}>{Strings.goalHeader + (this.state.weightGoal === null ? Strings.placeholder : this.state.weightGoal) + Strings.weightUnit}</ExplanationText>
					</CardColumnContainer>
                );
        } // end switch-case
    };
}