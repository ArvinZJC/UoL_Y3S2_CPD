import React from 'react'
import {StatusBar, View, TouchableOpacity} from 'react-native'
import styled from 'styled-components';

import colours from '../components/Colours';
import screenSize from '../components/ScreenSize';


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
			color: '#FFF',
			fontWeight: "500",
			fontSize: 18,
			textAlign: "center",
			flexGrow: 0.75
		}
	};

	render()
	{
		const {navigate} = this.props.navigation;
		const {name} = this.props.navigation.state.params;
		const {picture} = this.props.navigation.state.params;
		const {power} = this.props.navigation.state.params;

		return(
			<Container>
				<StatusBar barStyle="light-content" />
				<HeaderImage source={picture} />
				<Body>
					<TagContainer>
						<TagBody style={{backgroundColor: colours.red}}>
							<TagText>(Tag 1)</TagText>
						</TagBody>
						<TagBody style={{backgroundColor: colours.green}}>
							<TagText>(Tag 2)</TagText>
						</TagBody>
					</TagContainer>
					<HeaderText>{name}</HeaderText>
					<BodyText>
						(Description, e.g.{'\n'}Stark is an industrialist, genius inventor, hero and former playboy who is CEO of Stark
						Industries. At the beginning of the series, he is a chief weapons manufacturer for the U.S. military, until he has
						a change of heart and redirects his technical knowledge into the creation of mechanized suits of armor which he
						uses to defend against those that would threaten peace around the world.)
					</BodyText>
					<Divide />
					<PowerSection>
						<Strength>Power:</Strength>
						<StrengthSubText>{power}/100</StrengthSubText>
						<TagBody style={{backgroundColor: colours.blue}}>
							<TouchableOpacity style={{width: '100%'}} onPress={() => navigate('Home')}>
								<TagText>Back</TagText>
							</TouchableOpacity>
						</TagBody>
					</PowerSection>
				</Body>
			</Container>
		)
	}
};

export default CharacterScreen;

const Container = styled.View`
	flex: 1;
	background: ${colours.background};
`;

const HeaderImage = styled.Image`
	width: 100%;
	height: 70%;
	background: ${colours.blue};
`;

const Body = styled.ScrollView`
	background: ${colours.background};
	height: ${screenSize.height * 0.63}px;
	width: 100%;
	border-top-right-radius: 30px;
	border-top-left-radius: 30px;
	position: absolute;
	top: ${screenSize.height * 0.37}px;
	flex: 1;
	flex-direction: column;
`;

const TagContainer = styled.View`
	flex-direction: row;
	width: 100%;
	margin-left: 20px;
	margin-top: 30px;
`;

const TagBody = styled.View`
	height: auto;
	width: 30%;
	border-radius: 15px;
	align-items: center;
	justify-content: center;
	margin-right: 5px;
`;

const TagText = styled.Text`
	color: white;
	font-size: 14px;
	text-align: center;
	padding: 10px;
`;

const HeaderText = styled.Text`
	color: white;
	font-size: 25px;
	margin: 20px;
	font-weight: bold;
`;

const BodyText = styled.Text`
	color: white;
	font-size: 16px;
	margin: 20px;
	margin-top: 0;
`;

const Divide = styled.View`
	background: ${colours.blue};
	height: 1px;
	margin: 20px;
	margin-top: 0;
	align-items: center;
`;

const PowerSection = styled.View`
	flex-direction: row;
	align-items: center;
	width: 100%;
	margin: 20px;
	margin-top: 0;
`;

const Strength = styled.Text`
	color: white;
	font-size: 20px;
	font-weight: bold;
`;

const StrengthSubText = styled.Text`
	color: ${colours.green};
	font-size: 20px;
	margin-left: 20px;
	font-weight: bold;
	margin-right: 20px;
`;