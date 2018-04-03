import React from 'react';
import { Text, View, Button, Image } from 'react-native';
import { TabNavigator, TabBarBottom, TabBarTop } from 'react-navigation';
import TabHome from './TabHome'
import TabProduct from './TabProduct'
import TabSearch from './TabSearch'
import TabProfile from './TabProfile'


export const TabNav = TabNavigator(
  {
    TabHome: {
      screen: TabHome,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <Image source={focused ? require('../../imagesrc/ic_toolbar_home_on.png') : require('../../imagesrc/icToolbarHomeOf.png') } style={{ height: 20, width: 20 }} color={tintColor}/>
        )
      }
    },
    TabProduct: {
      screen: TabProduct,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <Image source={focused ? require('../../imagesrc/icToolbarSanphamOn.png') : require('../../imagesrc/ic_toolbar_sanpham_of.png') } style={{ height: 20, width: 20 }} color={tintColor}/>
        )
      }
    },
    TabSearch: {
      screen: TabSearch,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <Image source={focused ? require('../../imagesrc/ic_toolbar_nhaphang_on.png') : require('../../imagesrc/ic_toolbar_nhaphang_off.png') } style={{ height: 20, width: 20 }} color={tintColor}/>
        )
      }
    },
    TabProfile: {
      screen: TabProfile,
      navigationOptions: {
        title: 'Profile',
        tabBarIcon: ({ focused, tintColor }) => (
          <Image source={focused ? require('../../imagesrc/ic_toolbar_user_on.png') : require('../../imagesrc/ic_toolbar_user_of.png') } style={{ height: 20, width: 20 }} color={tintColor}/>
        )
      }
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      // tabBarIcon: ({ focused, tintColor }) => {
      //   const { routeName } = navigation.state;
      //   let iconName;
      //   if (routeName === 'TabHome') {
      //     iconName = require('../../imagesrc/icToolbarHomeOf.png');
      //   } else if (routeName === 'TabProduct') {
      //     iconName = require('../../imagesrc/icToolbarSanphamOn.png');
      //   } else if (routeName === 'TabSearch'){
      //     iconName = require('../../imagesrc/icToolbarSearchOf.png');
      //   }else{
      //     iconName = require('../../imagesrc/icToolbarUserOf.png');
      //   }
      //   return <Image source={iconName} style={{ height: 20, width: 20 }} color={tintColor} />;
      // },
    }),
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'black',
      showLabel: false
    },
    tabBarComponent: TabBarBottom,//TabBarBottom
    tabBarPosition: 'bottom',//bottom
    animationEnabled: true,
    swipeEnabled: true,
  }
);