/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {DrawerNav} from './src/Router/Router'
import {TabNav} from './src/Component/Tabbar/TabbarTopBottom'


export default class App extends Component {
  render() {
    return (
      <TabNav/>
    );
  }
}

