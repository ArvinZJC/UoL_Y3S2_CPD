/*
 * @Description: a picker component
 * @Version: 1.0.1.20200426
 * @Author: Jichen Zhao
 * @Date: 2020-04-25 02:03:06
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-26 14:39:42
 */

import React from 'react';
import {TouchableHighlight} from 'react-native';
import {IndexPath, Select, SelectItem, Datepicker, Icon, CalendarViewModes} from '@ui-kitten/components';
import * as SecureStore from 'expo-secure-store';

import Strings from '../values/Strings';
import Dimens from '../values/Dimens';
import Attributes from '../values/Attributes';
import {
    CardRowContainer,
    ContentText,
    SettingRowContainer} from '../values/Styles';


const genderData = [Strings.settingsScreen_sectionBasicInfo_genderMale, Strings.settingsScreen_sectionBasicInfo_genderFemale];
const heightData = [];
const weightData = [];
const stepGoalData = [];

for (var i = 10; i <= 250; i++)
{
    heightData.push(i);
    weightData.push(i);
} // end for

for (var i = 1000; i <= 100000; i += 1000)
{
    stepGoalData.push(i);
} // end for

const calendarIcon = (props) => (
    <Icon {...props} name='calendar' />
);

var userPreferenceGender = null;
var userPreferenceBirthday = null;
var userPreferenceHeight = null;
var userPreferenceWeight = null;
var userPreferenceStepGoal = null;
var userPreferenceWeightGoal = null;

function getGenderSaved()
{
    SecureStore.getItemAsync(Attributes.preferenceGenderKey).then((indexSaved) =>
        {
            if (indexSaved != null)
            {
                userPreferenceGender = JSON.parse(indexSaved);
            } // end if
        }).catch((e) =>
        {
            console.log('Failed to get the gender preference data saved. ' + e);
        });
}

function getBirthdaySaved()
{
    SecureStore.getItemAsync(Attributes.preferenceBirthdayKey).then((dateSaved) =>
        {
            if (dateSaved != null)
            {
                userPreferenceBirthday = new Date(JSON.parse(dateSaved));
            } // end if
        }).catch((e) =>
        {
            console.log('Failed to get the birthday preference data saved. ' + e);
        });
}

function getHeightSaved()
{
    SecureStore.getItemAsync(Attributes.preferenceHeightKey).then((indexSaved) =>
        {
            if (indexSaved != null)
            {
                userPreferenceHeight = JSON.parse(indexSaved);
            } // end if
        }).catch((e) =>
        {
            console.log('Failed to get the height preference data saved. ' + e);
        });
}

function getWeightSaved()
{
    SecureStore.getItemAsync(Attributes.preferenceWeightKey).then((indexSaved) =>
        {
            if (indexSaved != null)
            {
                userPreferenceWeight = JSON.parse(indexSaved);
            } // end if
        }).catch((e) =>
        {
            console.log('Failed to get the weight preference data saved. ' + e);
        });
}

function getStepGoalSaved()
{
    SecureStore.getItemAsync(Attributes.preferenceStepGoalKey).then((indexSaved) =>
        {
            if (indexSaved != null)
            {
                userPreferenceStepGoal = JSON.parse(indexSaved);
            } // end if
        }).catch((e) =>
        {
            console.log('Failed to get the step goal preference data saved. ' + e);
        });
}

function getWeightGoalSaved()
{
    SecureStore.getItemAsync(Attributes.preferenceWeightGoalKey).then((indexSaved) =>
        {
            if (indexSaved != null)
            {
                userPreferenceWeightGoal = JSON.parse(indexSaved);
            } // end if
        }).catch((e) =>
        {
            console.log('Failed to get the weight goal preference data saved. ' + e);
        });
}

// initialise the variables storing user preferences by updating them
getGenderSaved();
getBirthdaySaved();
getHeightSaved();
getWeightSaved();
getStepGoalSaved();
getWeightGoalSaved();

export const XGenderPicker = (props) =>
{
    getGenderSaved();
    
    const selectRef = React.createRef();
    const [selectedIndex, setSelectedIndex] = React.useState(userPreferenceGender === null ? userPreferenceGender : new IndexPath(userPreferenceGender));
    const renderOptions = (title) => (
        <SelectItem title={title} />
    );
    
    return(
        <TouchableHighlight onPress={() => selectRef.current.isFocused() ? selectRef.current.blur() : selectRef.current.focus()}  underlayColor={props.underlayColour}>
			<SettingRowContainer>
				<ContentText style={{color: props.titleColour}}>{Strings.settingsScreen_sectionBasicInfo_genderTitle}</ContentText>
				<Select
                    style={{width: Dimens.mediumPickerWidth}}
                    ref={selectRef}
                    selectedIndex={selectedIndex}
                    onSelect={index =>
                        {
                            setSelectedIndex(index);
                            
                            // save the index number as the gender preference data
                            try
                            {
                                SecureStore.setItemAsync(Attributes.preferenceGenderKey, JSON.stringify(index.row));
                            }
                            catch (e)
                            {
                                console.log('Failed to store the gender preference data. ' + e);
                            } // end try...catch
                        }}
                    value={selectedIndex === null ? Strings.placeholder : genderData[selectedIndex.row]}
                    placeholder={Strings.placeholder}
                    size={Attributes.smallPicker}>
                    {genderData.map(renderOptions)}
                </Select>
			</SettingRowContainer>
		</TouchableHighlight>
    );
};

export const XBirthdayPicker = (props) =>
{
    getBirthdaySaved();

    const selectRef = React.createRef();
    const [date, setDate] = React.useState(userPreferenceBirthday);

    const maxDate = new Date(); // today
    const minDate = new Date(maxDate.getFullYear() - 120, 0, 1); // the first day of 120 years ago

    return(
        <TouchableHighlight onPress={() => selectRef.current.isFocused() ? selectRef.current.blur() : selectRef.current.focus()}  underlayColor={props.underlayColour}>
			<SettingRowContainer>
				<ContentText style={{color: props.titleColour}}>{Strings.settingsScreen_sectionBasicInfo_birthdayTitle}</ContentText>
				<Datepicker
                    ref={selectRef}
                    date={date}
                    onSelect={newDate =>
                        {
                            setDate(newDate);
                            
                            // save the Date object as the birthday preference data
                            try
                            {
                                SecureStore.setItemAsync(Attributes.preferenceBirthdayKey, JSON.stringify(newDate));
                            }
                            catch (e)
                            {
                                console.log('Failed to store the birthday preference data. ' + e);
                            } // end try...catch
                        }}
                    min={minDate}
                    max={maxDate}
                    startView={CalendarViewModes.YEAR}
                    size={Attributes.smallPicker}
                    placeholder={Strings.placeholder}
                    accessoryRight={calendarIcon} />
			</SettingRowContainer>
		</TouchableHighlight>
    );
};

export const XHeightPicker = (props) =>
{
    getHeightSaved();

    const selectRef = React.createRef();
    const [selectedIndex, setSelectedIndex] = React.useState(userPreferenceHeight === null ? userPreferenceHeight : new IndexPath(userPreferenceHeight));
    const renderOptions = (title) => (
        <SelectItem title={title} />
    );
    
    return(
        <TouchableHighlight onPress={() => selectRef.current.isFocused() ? selectRef.current.blur() : selectRef.current.focus()}  underlayColor={props.underlayColour}>
			<SettingRowContainer>
				<ContentText style={{color: props.titleColour}}>{Strings.settingsScreen_sectionBasicInfo_heightTitle}</ContentText>
				<CardRowContainer style={{alignItems: 'center'}}>
                    <Select
                        style={{width: Dimens.shortPickerWidth}}
                        ref={selectRef}
                        selectedIndex={selectedIndex}
                        onSelect={index =>
                            {
                                setSelectedIndex(index);
                                
                                // save the index number as the height preference data
                                try
                                {
                                    SecureStore.setItemAsync(Attributes.preferenceHeightKey, JSON.stringify(index.row));
                                }
                                catch (e)
                                {
                                    console.log('Failed to store the height preference data. ' + e);
                                } // end try...catch
                            }}
                        value={selectedIndex === null ? Strings.placeholder : heightData[selectedIndex.row]}
                        placeholder={Strings.placeholder}
                        size={Attributes.smallPicker}>
                        {heightData.map(renderOptions)}
                    </Select>
                    <ContentText style={{color: props.titleColour}}>{Strings.heightUnit}</ContentText>
                </CardRowContainer>
			</SettingRowContainer>
		</TouchableHighlight>
    );
};

export const XWeightPicker = (props) =>
{
    if (props.typeId === Attributes.weightGoalPickerTypeId)
    {
        getWeightGoalSaved();
    }
    else
    {
        getWeightSaved();
    } // end if...else
    
    const userPreference = props.typeId === Attributes.weightGoalPickerTypeId ? userPreferenceWeightGoal : userPreferenceWeight;
    const selectRef = React.createRef();
    const [selectedIndex, setSelectedIndex] = React.useState(userPreference === null ? userPreference : new IndexPath(userPreference));
    const renderOptions = (title) => (
        <SelectItem title={title} />
    );
    
    return(
        <TouchableHighlight onPress={() => selectRef.current.isFocused() ? selectRef.current.blur() : selectRef.current.focus()}  underlayColor={props.underlayColour}>
			<SettingRowContainer>
				<ContentText style={{color: props.titleColour}}>{props.typeId === Attributes.weightGoalPickerTypeId ? Strings.settingsScreen_sectionGoals_weightGoalTitle : Strings.settingsScreen_sectionBasicInfo_weightTitle}</ContentText>
				<CardRowContainer style={{alignItems: 'center'}}>
                    <Select
                        style={{width: Dimens.shortPickerWidth}}
                        ref={selectRef}
                        selectedIndex={selectedIndex}
                        onSelect={index =>
                            {
                                setSelectedIndex(index);
                                
                                // save the index number as the weight/weight goal preference data
                                try
                                {
                                    SecureStore.setItemAsync(props.typeId === Attributes.weightGoalPickerTypeId ? Attributes.preferenceWeightGoalKey : Attributes.preferenceWeightKey, JSON.stringify(index.row));
                                }
                                catch (e)
                                {
                                    console.log('Failed to store the ' + (props.typeId === Attributes.weightGoalPickerTypeId ? 'weight goal' : 'weight') + ' preference data. ' + e);
                                } // end try...catch
                            }}
                        value={selectedIndex === null ? Strings.placeholder : weightData[selectedIndex.row]}
                        placeholder={Strings.placeholder}
                        size={Attributes.smallPicker}>
                        {weightData.map(renderOptions)}
                    </Select>
                    <ContentText style={{color: props.titleColour}}>{Strings.weightUnit}</ContentText>
                </CardRowContainer>
			</SettingRowContainer>
		</TouchableHighlight>
    );
};

export const XStepGoalPicker = (props) =>
{
    getStepGoalSaved();
    
    const selectRef = React.createRef();
    const [selectedIndex, setSelectedIndex] = React.useState(userPreferenceStepGoal === null ? userPreferenceStepGoal : new IndexPath(userPreferenceStepGoal));
    const renderOptions = (title) => (
        <SelectItem title={title} />
    );
    
    return(
        <TouchableHighlight onPress={() => selectRef.current.isFocused() ? selectRef.current.blur() : selectRef.current.focus()}  underlayColor={props.underlayColour}>
			<SettingRowContainer>
				<ContentText style={{color: props.titleColour}}>{Strings.settingsScreen_sectionGoals_stepGoalTitle}</ContentText>
				<CardRowContainer style={{alignItems: 'center'}}>
                    <Select
                        style={{width: Dimens.longPickerWidth}}
                        ref={selectRef}
                        selectedIndex={selectedIndex}
                        onSelect={index =>
                            {
                                setSelectedIndex(index);
                                
                                // save the index number as the step goal preference data
                                try
                                {
                                    SecureStore.setItemAsync(Attributes.preferenceStepGoalKey, JSON.stringify(index.row));
                                }
                                catch (e)
                                {
                                    console.log('Failed to store the step goal preference data. ' + e);
                                } // end try...catch
                            }}
                        value={selectedIndex === null ? Strings.placeholder : stepGoalData[selectedIndex.row]}
                        placeholder={Strings.placeholder}
                        size={Attributes.smallPicker}>
                        {stepGoalData.map(renderOptions)}
                    </Select>
                    <ContentText style={{color: props.titleColour}}>{Strings.stepUnit}</ContentText>
                </CardRowContainer>
			</SettingRowContainer>
		</TouchableHighlight>
    );
};