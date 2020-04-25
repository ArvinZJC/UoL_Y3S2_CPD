/*
 * @Description: a pedometer component
 * @Version: 1.0.2.20200425
 * @Author: Jichen Zhao
 * @Date: 2020-04-23 14:47:11
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-25 16:44:55
 */

import React from 'react';
import {Platform, Dimensions} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {BarChart} from 'react-native-chart-kit';
import styled from 'styled-components';

import Strings from '../values/Strings';
import Dimens from '../values/Dimens';
import {
    CardContentArea,
    CardRowContainer,
    CardColumnContainer,
    BoldPrimaryText,
    ContentText,
    ExplanationText} from '../values/Styles';

import XAlert from './XAlert';


const Pedometer = Platform.OS === 'ios' ? require('expo-sensors/build/Pedometer') : require('expo-legacy/build/Pedometer'); // from Expo 34.0.0, great changes have taken place in the pedometer implementation - it is incomplete and has some issues with Android (please refer to the issue: https://github.com/expo/expo/issues/4895)
const alertContentTypeId = 'alert';
const chartContentTypeId = 'chart';
const contentWithProgressTypeId = 'with-progess';

export default class XPedometer extends React.Component
{
    pedometerUnknownStatus = 'unknown';

    state = {
        isPedometerAvailable: null,
        pedometerError: null,
        todayStepCount: 0,
        todayStepCountError: null,
        progress: 0,
        pastDayStepCount_1: 0,
        pastDayStepCount_2: 0,
        pastDayStepCount_3: 0,
        pastDayStepCount_4: 0,
        pastDayStepCount_5: 0,
        pastDayStepCount_6: 0,
        pastDayStepCount_7: 0,
        hasPastDayStepCountError: false
    };

    componentDidMount()
    {
        this._subscribe();
    }

    componentWillUnmount()
    {
        this._unsubscribe();
    }

    _subscribe = () =>
    {
        this._subscription = Pedometer.watchStepCount();

        Pedometer.isAvailableAsync().then(result =>
            {
                this.setState({
                    isPedometerAvailable: String(result),
                    pedometerError: null
                });
            },
            error =>
            {
                this.setState({
                    isPedometerAvailable: this.pedometerUnknownStatus,
                    pedometerError: error
                });
            }
        );

        const end_today = new Date();
        const start_today = new Date();

        start_today.setHours(0, 0, 0, 0);

        // set the time range to today to get the step count
        Pedometer.getStepCountAsync(start_today, end_today).then(result =>
            {
                if (result.steps > this.props.goal)
                {
                    this.currentProgress = 100;
                }
                else
                {
                    this.currentProgress = parseInt(result.steps * 100 / this.props.goal);
                }

                this.setState({
                    todayStepCount: result.steps,
                    todayStepCountError: null,
                    progress: this.currentProgress
                });
            },
            error =>
            {
                this.setState({
                    todayStepCount: 0,
                    todayStepCountError: error,
                    progress: 0
                });
            }
        );
        
        // get the past 7 days worth of step data for creating a bar chart
        if (this.props.contentTypeId === chartContentTypeId)
        {
            const start_past1 = new Date();
            const start_past2 = new Date();
            const start_past3 = new Date();
            const start_past4 = new Date();
            const start_past5 = new Date();
            const start_past6 = new Date();
            const start_past7 = new Date();

            start_past1.setHours(0, 0, 0, 0);
            start_past2.setHours(0, 0, 0, 0);
            start_past3.setHours(0, 0, 0, 0);
            start_past4.setHours(0, 0, 0, 0);
            start_past5.setHours(0, 0, 0, 0);
            start_past6.setHours(0, 0, 0, 0);
            start_past7.setHours(0, 0, 0, 0);

            start_past1.setDate(start_today.getDate() - 1);
            start_past2.setDate(start_past1.getDate() - 1);
            start_past3.setDate(start_past2.getDate() - 1);
            start_past4.setDate(start_past3.getDate() - 1);
            start_past5.setDate(start_past4.getDate() - 1);
            start_past6.setDate(start_past5.getDate() - 1);
            start_past7.setDate(start_past6.getDate() - 1);
            
            this.setState({
                hasPastDayStepCountError: false
            });

            Pedometer.getStepCountAsync(start_past1, start_today).then(result =>
                {
                    this.setState({
                        pastDayStepCount_1: result.steps
                    });
                },
                error =>
                {
                    this.setState({
                        pastDayStepCount_1: 0,
                        hasPastDayStepCountError: true
                    });
                    console.log('Failed to get yesterday\'s step count. ' + error);
                }
            );
            Pedometer.getStepCountAsync(start_past2, start_past1).then(result =>
                {
                    this.setState({
                        pastDayStepCount_2: result.steps
                    });
                },
                error =>
                {
                    this.setState({
                        pastDayStepCount_2: 0,
                        hasPastDayStepCountError: true
                    });
                    console.log('Failed to get the step count of the day before yesterday. ' + error);
                }
            );
            Pedometer.getStepCountAsync(start_past3, start_past2).then(result =>
                {
                    this.setState({
                        pastDayStepCount_3: result.steps
                    });
                },
                error =>
                {
                    this.setState({
                        pastDayStepCount_3: 0,
                        hasPastDayStepCountError: true
                    });
                    console.log('Failed to get the step count of 3 days ago. ' + error);
                }
            );
            Pedometer.getStepCountAsync(start_past4, start_past3).then(result =>
                {
                    this.setState({
                        pastDayStepCount_4: result.steps
                    });
                },
                error =>
                {
                    this.setState({
                        pastDayStepCount_4: 0,
                        hasPastDayStepCountError: true
                    });
                    console.log('Failed to get the step count of 4 days ago. ' + error);
                }
            );
            Pedometer.getStepCountAsync(start_past5, start_past4).then(result =>
                {
                    this.setState({
                        pastDayStepCount_5: result.steps
                    });
                },
                error =>
                {
                    this.setState({
                        pastDayStepCount_5: 0,
                        hasPastDayStepCountError: true
                    });
                    console.log('Failed to get the step count of 5 days ago. ' + error);
                }
            );
            Pedometer.getStepCountAsync(start_past6, start_past5).then(result =>
                {
                    this.setState({
                        pastDayStepCount_6: result.steps
                    });
                },
                error =>
                {
                    this.setState({
                        pastDayStepCount_6: 0,
                        hasPastDayStepCountError: true
                    });
                    console.log('Failed to get the step count of 6 days ago. ' + error);
                }
            );
            Pedometer.getStepCountAsync(start_past7, start_past6).then(result =>
                {
                    this.setState({
                        pastDayStepCount_7: result.steps
                    });
                },
                error =>
                {
                    this.setState({
                        pastDayStepCount_7: 0,
                        hasPastDayStepCountError: true
                    });
                    console.log('Failed to get the step count of 7 days ago. ' + error);
                }
            );
        } // end if
    };

    _unsubscribe = () =>
    {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    render()
    {
        const AlertArea = styled.View`
            width: 100%;
            margin-bottom: 10px;
        `;

        switch (this.props.contentTypeId)
        {
            case alertContentTypeId:
                switch (this.state.isPedometerAvailable)
                {
                    case String(true):
                        if (this.state.hasPastDayStepCountError === true)
                        {
                            if (this.state.todayStepCountError === null)
                            {
                                return(
                                    <AlertArea>
                                        <XAlert
                                            backgroundColour={this.props.errorAlertBackgroundColour}
                                            borderColour={this.props.borderColour}
                                            textColour={this.props.textColour}
                                            message={Strings.alertSteps_hasPastDayStepCountError} />
                                    </AlertArea>
                                );
                            }
                            else
                            {
                                console.log('Failed to get today\'s step count. ' + this.state.todayStepCountError);
                                return(
                                    <AlertArea>
                                        <XAlert
                                            backgroundColour={this.props.alertBackgroundColour}
                                            borderColour={this.props.borderColour}
                                            textColour={this.props.textColour}
                                            message={Strings.alertSteps_hasPastDayStepCountError} />
                                        <XAlert
                                            backgroundColour={this.props.alertBackgroundColour}
                                            borderColour={this.props.borderColour}
                                            textColour={this.props.textColour}
                                            message={Strings.alertSteps_todayStepCountUnavailable} />
                                    </AlertArea>
                                );
                            } // end if...else
                        }
                        else
                        {
                            if (this.state.todayStepCountError === null)
                            {
                                if (this.state.todayStepCount === this.props.goal)
                                {
                                    return(
                                        <AlertArea>
                                            <XAlert
                                                backgroundColour={this.props.successBackgroundColour}
                                                borderColour={this.props.borderColour}
                                                textColour={this.props.textColour}
                                                message={Strings.alertSteps_goalAchieved} />
                                        </AlertArea>
                                    );
                                }
                                else
                                {
                                    return null;
                                } // end if...else
                            }
                            else
                            {
                                this.message = Strings.alertSteps_todayStepCountUnavailable;
                                console.log('Failed to get today\'s step count. ' + this.state.todayStepCountError);
                                break;
                            } // end if...else
                        } // end if...else
                        
                    case String(false):
                        this.message = Strings.alertSteps_unavailablePedometer;
                        break;

                    case this.pedometerUnknownStatus:
                        this.message = Strings.alertSteps_pedometerError;
                        console.log('Failed to get the status of the pedometer. ' + this.state.pedometerError);
                        break;
                    
                    case null:
                        return null;
                } // end switch-case
                return(
                    <AlertArea>
                        <XAlert
                            backgroundColour={this.props.alertBackgroundColour}
                            borderColour={this.props.borderColour}
                            textColour={this.props.textColour}
                            message={this.message} />
                    </AlertArea>
                );
            
            case chartContentTypeId:
                if (this.state.isPedometerAvailable === null)
                {
                    return null;
                }
                else
                {
                    const start_today = new Date();

                    start_today.setHours(0, 0, 0, 0);

                    const start_past1 = new Date();
                    const start_past2 = new Date();
                    const start_past3 = new Date();
                    const start_past4 = new Date();
                    const start_past5 = new Date();
                    const start_past6 = new Date();
                    const start_past7 = new Date();

                    start_past1.setHours(0, 0, 0, 0);
                    start_past2.setHours(0, 0, 0, 0);
                    start_past3.setHours(0, 0, 0, 0);
                    start_past4.setHours(0, 0, 0, 0);
                    start_past5.setHours(0, 0, 0, 0);
                    start_past6.setHours(0, 0, 0, 0);
                    start_past7.setHours(0, 0, 0, 0);
                    
                    start_past1.setDate(start_today.getDate() - 1);
                    start_past2.setDate(start_past1.getDate() - 1);
                    start_past3.setDate(start_past2.getDate() - 1);
                    start_past4.setDate(start_past3.getDate() - 1);
                    start_past5.setDate(start_past4.getDate() - 1);
                    start_past6.setDate(start_past5.getDate() - 1);
                    start_past7.setDate(start_past6.getDate() - 1);

                    const data = {
                        labels: [
                            start_past7.getDate() + '/' + (start_past7.getMonth() + 1),
                            start_past6.getDate() + '/' + (start_past6.getMonth() + 1),
                            start_past5.getDate() + '/' + (start_past5.getMonth() + 1),
                            start_past4.getDate() + '/' + (start_past4.getMonth() + 1),
                            start_past3.getDate() + '/' + (start_past3.getMonth() + 1),
                            start_past2.getDate() + '/' + (start_past2.getMonth() + 1),
                            start_past1.getDate() + '/' + (start_past1.getMonth() + 1)],
                        datasets: [{
                            data: [
                                this.state.pastDayStepCount_7,
                                this.state.pastDayStepCount_6,
                                this.state.pastDayStepCount_5,
                                this.state.pastDayStepCount_4,
                                this.state.pastDayStepCount_3,
                                this.state.pastDayStepCount_2,
                                this.state.pastDayStepCount_1]
                        }]
                    };
                    const chartWidth = Dimensions.get('window').width - Dimens.marginValue * 2 - Dimens.paddingValue * 2;
                    const isFromZero = this.state.pastDayStepCount_1 === 0
                        && this.state.pastDayStepCount_2 === 0
                        && this.state.pastDayStepCount_3 === 0
                        && this.state.pastDayStepCount_4 === 0
                        && this.state.pastDayStepCount_5 === 0
                        && this.state.pastDayStepCount_6 === 0
                        && this.state.pastDayStepCount_7 === 0 ? false : true;
                    const segments = this.state.pastDayStepCount_1 === 0
                        && this.state.pastDayStepCount_2 === 0
                        && this.state.pastDayStepCount_3 === 0
                        && this.state.pastDayStepCount_4 === 0
                        && this.state.pastDayStepCount_5 === 0
                        && this.state.pastDayStepCount_6 === 0
                        && this.state.pastDayStepCount_7 === 0 ? Dimens.chartMinSegments : Dimens.chartMaxSegments;

                    return(
                        <CardContentArea>
                            <CardColumnContainer>
                                <ContentText style={{color: this.props.chartTitleColour}}>{Strings.stepsScreen_cardPastDaysStepsChart_title}</ContentText>
                                <BarChart
                                    style={{margin: Dimens.paddingValue}}
                                    data={data}
                                    width={chartWidth}
                                    height={Dimens.chartHeight}
                                    fromZero={isFromZero}
                                    segments={segments}
                                    chartConfig={this.props.chartConfig} />
                            </CardColumnContainer>
                        </CardContentArea>
                    );
                } // end if...else
            
            case contentWithProgressTypeId:
                return(
                    <CardRowContainer style={{justifyContent: 'space-between'}}>
                        <CardRowContainer style={{alignItems: 'flex-end'}}>
                            <BoldPrimaryText style={{
                                marginBottom: 9,
                                color: this.props.textColour,
                                fontSize: Dimens.cardBigTextSizeValue}}>
                                {this.state.todayStepCount}
                            </BoldPrimaryText>
                            <ExplanationText style={{marginBottom: Dimens.paddingValue, color: this.props.textColour}}>/{this.props.goal + Strings.stepUnit}</ExplanationText>
                        </CardRowContainer>
                        <CardRowContainer style={{alignItems: 'flex-end'}}>
                            <AnimatedCircularProgress
                                size={Dimens.circleProgressSize}
                                width={Dimens.circleProgressWidth}
                                backgroundWidth={Dimens.circleProgressWidth}
                                fill={this.state.progress}
                                tintColor={this.props.textColour}
                                backgroundColor={this.props.circularProgressBackgroundColour}
                                lineCap='round'
                                style={{marginBottom: Dimens.paddingValue}}>
                                {
                                    () => (
                                        <ExplanationText style={{color: this.props.textColour}}>{this.state.progress}%</ExplanationText>
                                    )
                                }
                            </AnimatedCircularProgress>
                        </CardRowContainer>
                    </CardRowContainer>
                );
            
            default:
                return(
                    <CardColumnContainer>
						<ContentText style={{color: this.props.titleColour}}>{Strings.stepsScreen_cardTodaySteps_title}</ContentText>
						<BoldPrimaryText style={{color: this.props.primaryContentColour, fontSize: Dimens.cardBigTextSizeValue}}>{this.state.todayStepCount}</BoldPrimaryText>
						<ExplanationText style={{marginBottom: Dimens.paddingValue, color: this.props.explanationColour}}>{Strings.stepsScreen_cardTodaySteps_goalHeader + this.props.goal + Strings.stepUnit}</ExplanationText>
					</CardColumnContainer>
                );
        } // end switch-case
    };
}