import React, { Component } from 'react';
import { Image, ScrollView, Dimensions, Text, TouchableOpacity, View, StyleSheet, FlatList, Alert, RefreshControl } from 'react-native';
const { width, height } = Dimensions.get('window')
import { NavigationActions } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay'
import HeaderView from '../HeaderView/HeaderView'
import ListView from '../ListView/ListView'

export default class TabProduct extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#F1F4F9' }}>
                <HeaderView titleHeader={'Sản Phẩm'} />
                <ListView />
            </View>
        )
    }
    

}