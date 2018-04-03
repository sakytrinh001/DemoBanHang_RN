import React, { Component } from 'react';
import { Image, ScrollView, Dimensions, Text, TouchableOpacity, View, StyleSheet, FlatList, Alert, RefreshControl } from 'react-native';
const { width, height } = Dimensions.get('window')
import { NavigationActions } from 'react-navigation';
import HeaderView from '../HeaderView/HeaderView'
import EnterProduct from '../EnterProduct/EnterProduct'

export default class TabSearch extends React.Component {

    render(){
        return(
            <View style={{ flex: 1, backgroundColor: '#F1F4F9'}}>
                <HeaderView titleHeader={'Nhập hàng'}/>
                <EnterProduct/>
            </View>
        )
    }


}