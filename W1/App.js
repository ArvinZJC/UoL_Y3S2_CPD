import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// notice these are in the components folder
import HomeActivity from './components/HomeActivity';
import ProfileActivity from './components/ProfileActivity';

// this is a navigator which tells the app that there are 2 screens/pages
const RootStack = createStackNavigator(
  {
    Home: { screen: HomeActivity },
    Profile: { screen: ProfileActivity },
  },
  {
    // note we set the initial page to Home
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

// export keyword is a new feature in ES6 let export your functions, variables so you can get access to them in other js files
export default AppContainer;