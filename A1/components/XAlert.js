/*
 * @Description: an alert component
 * @Version: 1.0.2.20200425
 * @Author: Jichen Zhao
 * @Date: 2020-04-23 19:42:13
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-25 02:00:15
 */

import React from 'react';
import styled from 'styled-components';

import Dimens from '../values/Dimens';
import {ContentText} from '../values/Styles';


export default function XAlert(props)
{
    const MessageContainer = styled.View`
        border-top-width: 0.5px;
        border-bottom-width: 0.5px;
        border-color: ${props.borderColour};
        background-color: ${props.backgroundColour};
        width: 100%;
        padding: ${Dimens.padding};
        padding-left: ${Dimens.margin};
        padding-right: ${Dimens.margin};
    `;
    return(
        <MessageContainer>
            <ContentText style={{color: props.textColour}}>
                {props.message}
            </ContentText>
        </MessageContainer>
    );
}