

import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Button,
    Alert,
    TouchableOpacity,
    Keyboard,
    AsyncStorage,
    TextInput,
    Image,
} from 'react-native';
import HeaderView from './HeaderView/HeaderView'
import ListView from './ListView/ListView'

const { width, height } = Dimensions.get('window')

export default class MainScreen extends React.Component {

    render() {
        return (
            <View style={styles.contains}>
                <HeaderView style={styles.containHeader}
                    iconLeft={require('../imagesrc/menu_black.png')}
                    onPressLeft={() => { this.props.navigation.navigate('DrawerOpen'); }}
                />
                <View style={{ flex: 1, backgroundColor: '#f0f8ff' }}>
                    <View style={styles.containsViewTop}>
                        <View style={styles.viewTextInput}>
                            <Image source={require('../imagesrc/GEmail.png')} style={styles.imageStyle}/>
                            <TextInput style={styles.textInput}
                                placeholder='Search...'
                                // onChangeText={(text) => this.setState({ textUser: text })}
                                // onSubmitEditing={(event) => {
                                //     this.passTextInput.focus()
                                // }}
                                // value={this.state.textUser}
                            />
                        </View>
                        <TouchableOpacity style={styles.touchableStyle}>
                            <Image source={require('../imagesrc/GEmail.png')} style={styles.imageStyle}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchableStyleCategory}>
                            <Image source={require('../imagesrc/GEmail.png')} style={styles.imageStyle}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewBottom}>
                        <ListView/>
                    </View>
                </View>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    contains: {
        flex: 1
    },
    containHeader: {
        flex: 1,
        backgroundColor: 'white'
    },
    containsViewTop: {
        flexDirection: 'row',
        height: 40,
        width,
        marginTop: 20,
        marginBottom: 20,
    },
    viewTextInput: {
        height: 40,
        flex:1,
        marginBottom: 10,
        marginLeft: 20,
        backgroundColor: 'white',
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        flex:1,
        marginRight: 10,
        height: 40,
        backgroundColor: 'white'
    },
    imageStyle: {
        marginLeft: 10,
        marginRight: 10,
        height: 20,
        width: 20,
        resizeMode: 'stretch',
    },
    viewBottom: {
        flex: 1,
        width: width,
    },
    touchableStyle: {
        width: 40,
        height: 40,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgTouchable:{
        resizeMode: 'stretch',
        flex: 1
    },
    touchableStyleCategory:{
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20
    }


})
