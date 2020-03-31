import React from 'react';
import {StatusBar, ScrollView, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {Ionicons} from '@expo/vector-icons';

import colours from '../components/Colours';
import Categories from '../components/Categories';
import Card from '../components/Card';
import {picList} from '../components/data';

export default class HomeScreen extends React.Component
{
	render()
	{
        const {navigate} = this.props.navigation;

		return(
			<Container>
				<StatusBar barStyle="light-content" />
				<ScrollView>
					<Titlebar>
						<Avatar source={require('../assets/avatar.jpg')} />
						<Title>Welcome back,</Title>
						<Name>Arvin</Name>
						<Ionicons
							name="md-cart"
							size={32}
							color={colours.red}
							style={{position: 'absolute', right: 20, top: 5}} />
					</Titlebar>
					<ScrollView
						horizontal={true}
						style={{
							marginLeft: 5,
							marginRight: 20,
							marginVertical: 30,
							flexDirection: 'row'
						}}
						showsHorizontalScrollIndicator={false}>
						{items.map((category, index) => <Categories name={category.text} key={index} />)}
					</ScrollView>
					<Subtitle>Your Heroes</Subtitle>
					<ItemsLayout>
                        {
                            picList.map((pic, index) =>
								<TouchableOpacity onPress={() => navigate('Character', {name: pic.title, picture: pic.file, power: pic.strength})} key={index}>
									<Card
										cardtitle={pic.title}
										cardstrength={pic.strength}
										cardsrc={pic.file} />
								</TouchableOpacity>
							)
						}
					</ItemsLayout>
				</ScrollView>
			</Container>
		);
	}
}

const Container = styled.View`
	flex: 1;
	background-color: ${colours.background};
`;

const Titlebar = styled.View`
	width: 100%;
	margin-top: 50px;
	padding-left: 80px;
`;

const Avatar = styled.Image`
	width: 44px;
	height: 44px;
	background: black;
	border-radius: 22px;
	margin-left: 20px;
	position: absolute;
	top: 0;
	left: 0;
`;

const Title = styled.Text`
	font-size: 20px;
	font-weight: 500;
	color: ${colours.white};
`;

const Name = styled.Text`
	font-size: 20px;
	color: ${colours.red};
	font-weight: bold;
`;

const items = [
	{text: 'Avengers    |'},
	{text: 'Thor    |'},
	{text: 'Ironman    |'},
	{text: 'Captain America    |'},
	{text: 'Guardians    |'},
	{text: 'Black Widow    |'},
	{text: 'Hawkeye'}
];

const Subtitle = styled.Text`
	font-size: 20px;
	color: ${colours.blue};
	font-weight: 500;
	margin-top: 10px;
	margin-left: 20px;
	text-transform: uppercase;
`;

const ItemsLayout = styled.View`
	flex-flow: row wrap;
	margin: 10px;
`;