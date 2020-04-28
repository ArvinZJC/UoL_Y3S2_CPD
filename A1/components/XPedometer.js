/*
 * @Description: a pedometer component
 * @Version: 1.1.0.20200428
 * @Author: Jichen Zhao
 * @Date: 2020-04-23 14:47:11
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-28 22:15:26
 */

import React from 'react';
import {Platform, Dimensions, DeviceEventEmitter} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {BarChart} from 'react-native-chart-kit';
import * as SecureStore from 'expo-secure-store';

import Strings from '../values/Strings';
import Dimens from '../values/Dimens';
import Attributes from '../values/Attributes';
import {
    AlertArea,
    CardContentArea,
    CardRowContainer,
    CardColumnContainer,
    BoldPrimaryText,
    ContentText,
    ExplanationText} from '../values/Styles';

import XAlert from './XAlert';


const Pedometer = Platform.OS === 'ios' ? require('expo-sensors/build/Pedometer') : require('expo-legacy/build/Pedometer'); // from Expo 34.0.0, great changes have taken place in the pedometer implementation - it is incomplete and has some issues with Android (please refer to the issue: https://github.com/expo/expo/issues/4895)

export default class XPedometer extends React.Component
{
    state = {
        gender: Strings.placeholder,
        birthday: Strings.placeholder,
        height: Strings.placeholder,
        weight: Strings.placeholder,
        stepGoal: Strings.placeholder,
        weightGoal: Strings.placeholder,
        isPedometerAvailable: null,
        pedometerError: null,
        todayStepCount_temp: 0, // avoid the wrong synchronous update
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
        this.timer = setInterval(() =>
            {
                if (new Date().getHours() === 0 && new Date().getMinutes() === 0)
				{
					this.setState({
                        todayStepCount_temp: 0,
                        todayStepCount: 0
                    });
				} // end if
            }, 1000); // set a timer to track the current time to display 0 as today's steps as soon as possible when it is a new day
    }

    componentWillUnmount()
    {
        this._unsubscribe();
        clearInterval(this.timer);
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
                this.updateProgress(this.state.todayStepCount);
            }).catch((e) =>
            {
                this.setState({
                    progress: 0
                });
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

    updateProgress = (todayStepCount) =>
    {
        var currentProgress = null;

        if (this.state.stepGoal === Strings.placeholder || this.state.stepGoal === null)
        {
            currentProgress = 0;
        }
        else
        {
            if (todayStepCount > this.state.stepGoal)
            {
                currentProgress = 100;
            }
            else
            {
                currentProgress = parseInt(todayStepCount * 100 / this.state.stepGoal);
            } // end if...else
        } // end if...else

        this.setState({
            progress: currentProgress
        });
    };

    _subscribe = () =>
    {
        this._backSubscription = DeviceEventEmitter.addListener(Attributes.backListenerKey, () =>
            {
                this.getGenderSaved();
                this.getBirthdaySaved();
                this.getHeightSaved();
                this.getWeightSaved();
                this.getStepGoalSaved();
                this.getWeightGoalSaved();
            });

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
                    isPedometerAvailable: Attributes.pedometerUnknownStatus,
                    pedometerError: error
                });
            });

        this.getGenderSaved();
        this.getBirthdaySaved();
        this.getHeightSaved();
        this.getWeightSaved();
        this.getStepGoalSaved();
        this.getWeightGoalSaved();

        const start_today = new Date();
        
        start_today.setHours(0, 0, 0, 0);
        
        // get the step count before the start up date and time to avoid different temp step counts in various screens
        Pedometer.getStepCountAsync(start_today, this.props.startUpDateTime).then(result =>
            {
                this.setState({
                    todayStepCount_temp: result.steps,
                    todayStepCountError: null
                });
            },
            error =>
            {
                this.setState({
                    todayStepCount_temp: 0,
                    todayStepCountError: error
                });
            });

        // set the time range to today to get the step count
        Pedometer.getStepCountAsync(start_today, this.props.endToday).then(result =>
            {
                this.setState({
                    todayStepCount: result.steps,
                    todayStepCountError: null
                });
                this.updateProgress(this.state.todayStepCount);
            },
            error =>
            {
                this.setState({
                    todayStepCount: 0,
                    todayStepCountError: error,
                    progress: 0
                });
            });
        
        this._pedometerSubscription = Pedometer.watchStepCount(result =>
            {
                this.setState({
                    todayStepCount: this.state.todayStepCount_temp + result.steps
                })
                this.updateProgress(this.state.todayStepCount);
            });

        // get the past 7 days worth of step data for creating a bar chart
        if (this.props.contentTypeId === Attributes.chartContentTypeId)
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
                });
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
                });
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
                });
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
                });
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
                });
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
                });
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
                });
        } // end if
    };

    _unsubscribe = () =>
    {
        this._backSubscription && this._backSubscription.remove();
        this._backSubscription = null;
        
        this._pedometerSubscription && this._pedometerSubscription.remove();
        this._pedometerSubscription = null;
    };

    render()
    {
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
                    this.warningMessageImportantInfo = Strings.alert_lackOfImportantInfo;
                }
                else
                {
                    this.warningMessageImportantInfo = null;
                } // end if...else
                switch (this.state.isPedometerAvailable)
                {
                    case String(true):
                        if (this.state.hasPastDayStepCountError === true)
                        {
                            if (this.state.todayStepCountError === null)
                            {
                                if (this.warningMessageImportantInfo === null)
                                {
                                    return(
                                        <AlertArea>
                                            <XAlert
                                                backgroundColour={this.props.errorBackgroundColour}
                                                borderColour={this.props.borderColour}
                                                textColour={this.props.textColour}
                                                message={Strings.alertSteps_hasPastDayStepCountError} />
                                        </AlertArea>
                                    );
                                }
                                else
                                {
                                    return(
                                        <AlertArea>
                                            <XAlert
                                                backgroundColour={this.props.errorBackgroundColour}
                                                borderColour={this.props.borderColour}
                                                textColour={this.props.textColour}
                                                message={Strings.alertSteps_hasPastDayStepCountError} />
                                            <XAlert
                                                backgroundColour={this.props.warningBackgroundColour}
                                                borderColour={this.props.borderColour}
                                                textColour={this.props.textColour}
                                                message={this.warningMessageImportantInfo} />
                                        </AlertArea>
                                    );
                                } // end if...else
                            }
                            else
                            {
                                console.log('Failed to get today\'s step count. ' + this.state.todayStepCountError);

                                if (this.warningMessageImportantInfo === null)
                                {
                                    return(
                                        <AlertArea>
                                            <XAlert
                                                backgroundColour={this.props.errorBackgroundColour}
                                                borderColour={this.props.borderColour}
                                                textColour={this.props.textColour}
                                                message={Strings.alertSteps_hasPastDayStepCountError} />
                                            <XAlert
                                                backgroundColour={this.props.errorBackgroundColour}
                                                borderColour={this.props.borderColour}
                                                textColour={this.props.textColour}
                                                message={Strings.alertSteps_todayStepCountUnavailable} />
                                        </AlertArea>
                                    );
                                }
                                else
                                {
                                    return(
                                        <AlertArea>
                                            <XAlert
                                                backgroundColour={this.props.errorBackgroundColour}
                                                borderColour={this.props.borderColour}
                                                textColour={this.props.textColour}
                                                message={Strings.alertSteps_hasPastDayStepCountError} />
                                            <XAlert
                                                backgroundColour={this.props.errorBackgroundColour}
                                                borderColour={this.props.borderColour}
                                                textColour={this.props.textColour}
                                                message={Strings.alertSteps_todayStepCountUnavailable} />
                                            <XAlert
                                                backgroundColour={this.props.warningBackgroundColour}
                                                borderColour={this.props.borderColour}
                                                textColour={this.props.textColour}
                                                message={this.warningMessageImportantInfo} />
                                        </AlertArea>
                                    );
                                } // end if...else
                            } // end if...else
                        }
                        else
                        {
                            if (this.state.todayStepCountError === null)
                            {
                                if (this.state.stepGoal !== Strings.placeholder
                                    && this.state.stepGoal !== null
                                    && this.state.todayStepCount >= this.state.stepGoal)
                                {
                                    if (this.warningMessageImportantInfo === null)
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
                                        return(
                                            <AlertArea>
                                                <XAlert
                                                    backgroundColour={this.props.successBackgroundColour}
                                                    borderColour={this.props.borderColour}
                                                    textColour={this.props.textColour}
                                                    message={Strings.alertSteps_goalAchieved} />
                                                <XAlert
                                                    backgroundColour={this.props.warningBackgroundColour}
                                                    borderColour={this.props.borderColour}
                                                    textColour={this.props.textColour}
                                                    message={this.warningMessageImportantInfo} />
                                            </AlertArea>
                                        );
                                    } // end if...else
                                }
                                else
                                {
                                    if (this.warningMessageImportantInfo === null)
                                    {
                                        return null;
                                    }
                                    else
                                    {
                                        return(
                                            <AlertArea>
                                                <XAlert
                                                    backgroundColour={this.props.warningBackgroundColour}
                                                    borderColour={this.props.borderColour}
                                                    textColour={this.props.textColour}
                                                    message={this.warningMessageImportantInfo} />
                                            </AlertArea>
                                        );
                                    } // end if...else
                                } // end if...else
                            }
                            else
                            {
                                console.log('Failed to get today\'s step count. ' + this.state.todayStepCountError);

                                if (this.warningMessageImportantInfo === null)
                                {
                                    return(
                                        <AlertArea>
                                            <XAlert
                                                backgroundColour={this.props.errorBackgroundColour}
                                                borderColour={this.props.borderColour}
                                                textColour={this.props.textColour}
                                                message={Strings.alertSteps_todayStepCountUnavailable} />
                                        </AlertArea>
                                    );
                                }
                                else
                                {
                                    return(
                                        <AlertArea>
                                            <XAlert
                                                backgroundColour={this.props.errorBackgroundColour}
                                                borderColour={this.props.borderColour}
                                                textColour={this.props.textColour}
                                                message={Strings.alertSteps_todayStepCountUnavailable} />
                                            <XAlert
                                                backgroundColour={this.props.warningBackgroundColour}
                                                borderColour={this.props.borderColour}
                                                textColour={this.props.textColour}
                                                message={this.warningMessageImportantInfo} />
                                        </AlertArea>
                                    );
                                } // end if...else
                            } // end if...else
                        } // end if...else
                        
                    case String(false):
                        this.message = Strings.alertSteps_unavailablePedometer;
                        break;

                    case Attributes.pedometerUnknownStatus:
                        this.message = Strings.alertSteps_pedometerError;
                        console.log('Failed to get the status of the pedometer. ' + this.state.pedometerError);
                        break;
                    
                    case null:
                        if (this.warningMessageImportantInfo === null)
                        {
                            return null;
                        }
                        else
                        {
                            return(
                                <AlertArea>
                                    <XAlert
                                        backgroundColour={this.props.warningBackgroundColour}
                                        borderColour={this.props.borderColour}
                                        textColour={this.props.textColour}
                                        message={this.warningMessageImportantInfo} />
                                </AlertArea>
                            );
                        } // end if...else
                } // end switch-case
                if (this.warningMessageImportantInfo === null)
                {
                    return(
                        <AlertArea>
                            <XAlert
                                backgroundColour={this.props.errorBackgroundColour}
                                borderColour={this.props.borderColour}
                                textColour={this.props.textColour}
                                message={this.message} />
                        </AlertArea>
                    );
                }
                else
                {
                    return(
                        <AlertArea>
                            <XAlert
                                backgroundColour={this.props.errorBackgroundColour}
                                borderColour={this.props.borderColour}
                                textColour={this.props.textColour}
                                message={this.message} />
                            <XAlert
                                backgroundColour={this.props.warningBackgroundColour}
                                borderColour={this.props.borderColour}
                                textColour={this.props.textColour}
                                message={this.warningMessageImportantInfo} />
                        </AlertArea>
                    );
                } // end if...else
            
            case Attributes.chartContentTypeId:
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
                if (this.state.isPedometerAvailable === null)
                {
                    return(
                        <CardContentArea>
                            <CardColumnContainer>
                                <ContentText style={{color: this.props.chartTitleColour}}>{Strings.stepsScreen_cardPastDaysStepsChart_title}</ContentText>
                                <BarChart
                                    style={{margin: Dimens.paddingValue}}
                                    data={data}
                                    width={chartWidth}
                                    height={Dimens.chartHeight}
                                    segments={Dimens.chartMinSegments}
                                    chartConfig={this.props.chartConfig} />
                            </CardColumnContainer>
                        </CardContentArea>
                    );
                }
                else
                {
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
            
            case Attributes.contentWithProgressTypeId:
                return(
                    <CardRowContainer style={{justifyContent: 'space-between'}}>
                        <CardRowContainer style={{alignItems: 'flex-end'}}>
                            <BoldPrimaryText style={{
                                marginBottom: 8,
                                color: this.props.textColour,
                                fontSize: Dimens.cardBigTextSizeValue}}>
                                {this.state.todayStepCount}
                            </BoldPrimaryText>
                            <ExplanationText style={{marginBottom: Dimens.paddingValue, color: this.props.textColour}}>/{(this.state.stepGoal === null ? Strings.placeholder : this.state.stepGoal) + Strings.stepUnit}</ExplanationText>
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
            
            case Attributes.extraStepInfoContentTypeId:
                var distance = Strings.placeholder;
                var calories = Strings.placeholder;
                if (this.state.height !== Strings.placeholder && this.state.height !== null)
                {
                    distance = this.state.todayStepCount * this.state.height * Attributes.strideLengthCoefficient / 100000; // unit: km

                    if (this.state.weight !== Strings.placeholder && this.state.weight !== null)
                    {
                        calories = this.state.weight * distance * Attributes.walkCaloriesCoefficient; // unit: kcal
                        calories = calories.toFixed(2); // keep 2 decimal places
                    } // end if

                    distance = distance.toFixed(2); // keep 2 decimal places
                } // end if
                return(
                    <CardColumnContainer>
                        <CardRowContainer style={{width: '100%', justifyContent: 'space-around'}}>
                            <CardColumnContainer>
                                <CardRowContainer style={{marginBottom: Dimens.smallIntervalValue, alignItems: 'flex-end'}}>
                                    <BoldPrimaryText style={{color: this.props.primaryContentColour, fontSize: Dimens.cardMediumTextSizeValue}}>{distance}</BoldPrimaryText>
                                    <ExplanationText style={{marginBottom: 3, color: this.props.explanationColour}}>{Strings.stepsScreen_cardExtraStepInfo_distanceUnit}</ExplanationText>
                                </CardRowContainer>
                                <ContentText style={{marginBottom: Dimens.smallIntervalValue, color: this.props.titleColour}}>{Strings.stepsScreen_cardExtraStepInfo_distanceTitle}</ContentText>
                            </CardColumnContainer>
                            <CardColumnContainer>
                                <CardRowContainer style={{marginBottom: Dimens.smallIntervalValue, alignItems: 'flex-end'}}>
                                    <BoldPrimaryText style={{color: this.props.primaryContentColour, fontSize: Dimens.cardMediumTextSizeValue}}>{calories}</BoldPrimaryText>
                                    <ExplanationText style={{marginBottom: 3, color: this.props.explanationColour}}>{Strings.stepsScreen_cardExtraStepInfo_caloriesUnit}</ExplanationText>
                                </CardRowContainer>
                                <ContentText style={{marginBottom: Dimens.smallIntervalValue, color: this.props.titleColour}}>{Strings.stepsScreen_cardExtraStepInfo_caloriesTitle}</ContentText>
                            </CardColumnContainer>
                        </CardRowContainer>
                        <ExplanationText style={{
                            marginBottom: Dimens.paddingValue,
                            color: this.props.explanationColour,
                            fontStyle: 'italic',
                            textAlign: 'center'}}>{Strings.stepsScreen_cardExtraStepInfo_instructions}</ExplanationText>
                    </CardColumnContainer>
                );
            
            default:
                return(
                    <CardColumnContainer>
						<ContentText style={{marginBottom: Dimens.smallIntervalValue, color: this.props.titleColour}}>{Strings.stepsScreen_cardTodaySteps_title}</ContentText>
                        <BoldPrimaryText style={{
                            marginBottom: Dimens.smallIntervalValue,
                            color: this.props.primaryContentColour,
                            fontSize: Dimens.cardBigTextSizeValue}}>{this.state.todayStepCount}</BoldPrimaryText>
						<ExplanationText style={{marginBottom: Dimens.smallIntervalValue, color: this.props.explanationColour}}>{Strings.goalHeader + (this.state.stepGoal === null ? Strings.placeholder : this.state.stepGoal) + Strings.stepUnit}</ExplanationText>
                        <ExplanationText style={{
                            marginBottom: Dimens.paddingValue,
                            color: this.props.explanationColour,
                            fontStyle: 'italic',
                            textAlign: 'center'}}>{Strings.stepsScreen_cardTodaySteps_tips}</ExplanationText>
					</CardColumnContainer>
                );
        } // end switch-case
    };
}