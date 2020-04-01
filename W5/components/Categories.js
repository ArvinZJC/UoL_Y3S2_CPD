import React from 'react';
import styled from 'styled-components';

import colours from '../components/Colours';


const Categories = props => <Name>{props.name}</Name>;

export default Categories;

const Name = styled.Text`
    font-size: 16px;
    font-weight: 300;
    margin-left: 15px;
    color: ${colours.white};
`;