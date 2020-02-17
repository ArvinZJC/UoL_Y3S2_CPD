import React from 'react';
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

const Container = styled.View`
    background: #eee;
    height: 250px;
    width: 100%;
    border-radius: 14px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
`;

const Cover = styled.View`
    width: 100%;
    height: 70%;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    overflow: hidden;
`;

const Image = styled.Image`
    width: 100%;
    height: 100%;
`;

const Content = styled.View`
    width: 100%;
    height: 30%;
    padding-top: 8px;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.Text`
    flex: 3;
    color: #3c4560;
    font-size: 16px;
    font-weight: 600;
    text-align:center;
`;

const PowerCaption = styled.Text`
    flex: 2;
    color: #b8b3c3;
    font-size: 12px;
    font-weight: 600;
    margin-top: 4px;
`;