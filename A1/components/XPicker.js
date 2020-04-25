/*
 * @Description: a picker component
 * @Version: 1.0.0.20200425
 * @Author: Jichen Zhao
 * @Date: 2020-04-25 02:03:06
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-25 16:26:06
 */

import React from 'react';
import {TouchableHighlight} from 'react-native';
import {Select, SelectItem, Datepicker, Icon, CalendarViewModes} from '@ui-kitten/components';

import Strings from '../values/Strings';
import Dimens from '../values/Dimens';
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

const weightGoalPickerTypeId = 'goal';
const smallPicker = 'small';
const calendarIcon = (props) => (
    <Icon {...props} name='calendar' />
);

export const XGenderPicker = (props) =>
{
    const selectRef = React.createRef();
    const [selectedIndex, setSelectedIndex] = React.useState(null);
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
                    onSelect={index => setSelectedIndex(index)}
                    value={selectedIndex === null ? Strings.placeholder : genderData[selectedIndex.row]}
                    placeholder={Strings.placeholder}
                    size={smallPicker}>
                    {genderData.map(renderOptions)}
                </Select>
			</SettingRowContainer>
		</TouchableHighlight>
    );
}

export const XBirthdayPicker = (props) =>
{
    const selectRef = React.createRef();
    const useDatePickerState = (initialDate = null) =>
    {
        const [date, setDate] = React.useState(initialDate);
        return {date, onSelect: setDate};
    };

    const maxDate = new Date(); // today
    const minDate = new Date(maxDate.getFullYear() - 120, 0, 1); // the first day of 120 years ago

    return(
        <TouchableHighlight onPress={() => selectRef.current.isFocused() ? selectRef.current.blur() : selectRef.current.focus()}  underlayColor={props.underlayColour}>
			<SettingRowContainer>
				<ContentText style={{color: props.titleColour}}>{Strings.settingsScreen_sectionBasicInfo_birthdayTitle}</ContentText>
				<Datepicker
                    ref={selectRef}
                    {...useDatePickerState()}
                    min={minDate}
                    max={maxDate}
                    startView={CalendarViewModes.YEAR}
                    size={smallPicker}
                    placeholder={Strings.placeholder}
                    accessoryRight={calendarIcon} />
			</SettingRowContainer>
		</TouchableHighlight>
    );
}

export const XHeightPicker = (props) =>
{
    const selectRef = React.createRef();
    const [selectedIndex, setSelectedIndex] = React.useState(null);
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
                        onSelect={index => setSelectedIndex(index)}
                        value={selectedIndex === null ? Strings.placeholder : heightData[selectedIndex.row]}
                        placeholder={Strings.placeholder}
                        size={smallPicker}>
                        {heightData.map(renderOptions)}
                    </Select>
                    <ContentText style={{color: props.titleColour}}>{Strings.heightUnit}</ContentText>
                </CardRowContainer>
			</SettingRowContainer>
		</TouchableHighlight>
    );
}

export const XWeightPicker = (props) =>
{
    const selectRef = React.createRef();
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const renderOptions = (title) => (
        <SelectItem title={title} />
    );
    
    return(
        <TouchableHighlight onPress={() => selectRef.current.isFocused() ? selectRef.current.blur() : selectRef.current.focus()}  underlayColor={props.underlayColour}>
			<SettingRowContainer>
				<ContentText style={{color: props.titleColour}}>{props.typeId === weightGoalPickerTypeId ? Strings.settingsScreen_sectionGoals_weightGoalTitle : Strings.settingsScreen_sectionBasicInfo_weightTitle}</ContentText>
				<CardRowContainer style={{alignItems: 'center'}}>
                    <Select
                        style={{width: Dimens.shortPickerWidth}}
                        ref={selectRef}
                        selectedIndex={selectedIndex}
                        onSelect={index => setSelectedIndex(index)}
                        value={selectedIndex === null ? Strings.placeholder : weightData[selectedIndex.row]}
                        placeholder={Strings.placeholder}
                        size={smallPicker}>
                        {weightData.map(renderOptions)}
                    </Select>
                    <ContentText style={{color: props.titleColour}}>{Strings.weightUnit}</ContentText>
                </CardRowContainer>
			</SettingRowContainer>
		</TouchableHighlight>
    );
}

export const XStepGoalPicker = (props) =>
{
    const selectRef = React.createRef();
    const [selectedIndex, setSelectedIndex] = React.useState(null);
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
                        onSelect={index => setSelectedIndex(index)}
                        value={selectedIndex === null ? Strings.placeholder : stepGoalData[selectedIndex.row]}
                        placeholder={Strings.placeholder}
                        size={smallPicker}>
                        {stepGoalData.map(renderOptions)}
                    </Select>
                    <ContentText style={{color: props.titleColour}}>{Strings.stepUnit}</ContentText>
                </CardRowContainer>
			</SettingRowContainer>
		</TouchableHighlight>
    );
}