import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation'
import { Dimensions } from 'react-native';
import Menu from '../Component/Menu/Menu'
import MainScreen from '../Component/MainScreen'
const { width, height } = Dimensions.get('window')

export const DrawerNav = DrawerNavigator({
    Tabs: {
      screen: MainScreen,
    }
  },
    {
      drawerWidth: width - 100,
      drawerPosition: 'left',
      contentComponent: Menu
    }
  );
