import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './screens/HomeScreen';
import CharacterScreen from './screens/CharacterScreen';

const MainNav = createStackNavigator(
	{
		Home: HomeScreen,
		Character: CharacterScreen,
	},
	{
		headerMode: 'none'
	}
);

export default createAppContainer(MainNav);