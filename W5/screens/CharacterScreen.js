import React, {Component} from 'react'
import {View, ScrollView, TouchableOpacity} from 'react-native'
import {Entypo} from '@expo/vector-icons';
import styled from 'styled-components';

import colours from '../components/Colours';
import screenSize from '../components/ScreenSize';
import {picList} from '../components/data';


class CharacterScreen extends React.Component
{
	static navigationOptions =
	{
		headerTitle: 'Character',
		headerStyle:
		{
			backgroundColor: '#bb1d68',
		},
		headerTitleStyle:
		{
			color: "#FFF",
			fontWeight: "500",
			fontSize: 18,
			textAlign: "center",
			flexGrow: 0.75
		},
	};

	render()
	{
		const {navigate} = this.props.navigation;

		return(
			<Container>
				<HeaderImage source={require('../assets/pic1.jpg')} />
				<Body>
				<TagContainer>
					<TagBody style={{backgroundColor: colours.red}}>
					<TagText>SPEED</TagText>
					</TagBody>
					<TagBody style={{backgroundColor: colours.green}}>
					<TagText>Humor</TagText>
					</TagBody>
				</TagContainer>
				<HeaderText>Stark React Native</HeaderText>
				<BodyText>Stark is an industrialist, genius inventor, hero and former playboy who is CEO of Stark Industries. At the beginning of the series, he is a chief weapons manufacturer for the U.S. military, until he has a change of heart and redirects his technical knowledge into the creation of mechanized suits of armor which he uses to defend against those that would threaten peace around the world.</BodyText>
				<Divide />
				<RowStyle>
					<View style={{paddingLeft: '5%'}}>
					<RowStyle >
						<Strength>Power:</Strength>
						<StrengthSubText>250/100</StrengthSubText>
						<TagBody style={{backgroundColor: colours.blue}}>
						<TouchableOpacity onPress={() => navigate('Home')}>
						<TagText>Back</TagText>
						</TouchableOpacity>
						</TagBody>
					</RowStyle>
					</View>
				</RowStyle>
				</Body>
			</Container>
		)
	}
};

export default CharacterScreen;

const Container = styled.View`
	flex: 1;
	background: ${colours.background}
`;

const HeaderImage = styled.Image`
	width: 100%;
	height: 40%
	background: ${colours.blue};
`;

const Body = styled.ScrollView`
	background: ${colours.background};
	height: 65%;
	width: 100%;
	border-top-right-radius: 30px;
	border-top-left-radius: 30px;
	position: absolute;
	top: ${screenSize.height * 0.37}px
`;

const TagContainer = styled.View`
	flex-direction: row;
	width: 100%;
	margin-left: 8%;
	margin-top: 8%};
`;

const TagBody = styled.View`
	height: auto;
	width: 30%;
	border-radius: 15px;
	align-items: center;
	justify-content: center;
	margin-right: 5px;
	padding:10px;
`;

const TagText = styled.Text`
	color: white;
	font-size: 14px;
`;

const HeaderText = styled.Text`
	color: white;
	font-size: 25px;
	margin-top: 5%;
	margin-left: 20px;
	font-weight: bold;
`;

const BodyText = styled.Text`
	color: white;
	font-size: 15px;
	margin: 20px 20px;
`;

const RowStyle = styled.View`
	flex-direction: row;
	width:100%;
`;


const Divide = styled.View`
	background: ${colours.blue};
	height: 1px;
	margin: 10px 20px;
	align-items: center;
`;


const Strength = styled.Text`
	color: white;
	font-size: 20px;
	margin-left: 0;
	font-weight: bold;
`;

const StrengthSubText = styled.Text`
	color: ${colours.green};
	font-size: 20px;
	margin-left:  8%;
	font-weight: bold;
	margin-right:10px;
`;