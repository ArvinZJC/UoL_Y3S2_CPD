/*
 * @Description: the home screen
 * @Version: 1.0.0.20200401
 * @Author: Jichen Zhao
 * @Date: 2020-04-01 23:10:11
 * @Last Editors: Jichen Zhao
 * @LastEditTime: 2020-04-01 23:22:26
 */

import React from 'react';
import {View, Text} from 'react-native';


export default class HomeScreen extends React.Component
{
	render()
	{
		return(
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Home Screen</Text>
            </View>
		);
	}
}