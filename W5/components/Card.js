import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components';

const Card = props =>
    <Container>
        <Cover>
            <Image source={props.cardsrc} />
        </Cover>
        <Content>
            <Title>{props.cardtitle}</Title>
            <PowerCaption>Power: {props.cardstrength}</PowerCaption>
        </Content>
    </Container>
;

export default Card;

const defaultMargin = 10;
const cardWidth = (Dimensions.get('window').width - defaultMargin * 8) / 3; // use the window's width to decide the card's width
const cardHeight = cardWidth * 2;

const Container = styled.View`
    background: #eee;
    height: ${cardHeight}px;
    width: ${cardWidth}px;
    border-radius: 14px;
    margin: ${defaultMargin}px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
`;

const Cover = styled.View`
    width: 100%;
    height: ${cardHeight * 2 / 3}px;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    overflow: hidden;
`;

const Image = styled.Image`
    width: 100%;
    height: 100%;
`;

const Content = styled.View`
    height: ${cardHeight / 3}px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.Text`
    color: #3c4560;
    font-size: ${cardHeight / 14}px;
    font-weight: 600;
    text-align:center;
`;

const PowerCaption = styled.Text`
    color: #b8b3c3;
    font-size: ${cardHeight / 18}px;
    font-weight: 600;
    margin-top: 4px;
`;