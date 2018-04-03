import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, } from 'react-native';


export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true
    };
  }
  render() {
    const { imgeProfile, btnStyle, btnText,
      btnStyleSignIn, btnTextSignIn,
      btnTenNguoiDung } = styles;
    const logoutJSX = (
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={btnStyle}>
          <Text style={btnText}> Sign in </Text>
        </TouchableOpacity>
      </View>
    );
    const loginJSX = (
      <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <TouchableOpacity style={btnStyleSignIn}>
            <Text style={btnTextSignIn}> Order History </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={btnStyleSignIn} onPress={() => {
              this.props.navigation.navigate('ChangeInfo');
            }}
          >
            <Text style={btnTextSignIn}>Change Info </Text>
          </TouchableOpacity>
          <TouchableOpacity style={btnStyleSignIn}>
            <Text style={btnTextSignIn}> Sign Out </Text>
          </TouchableOpacity>
        </View>
        <View />

      </View>
    );
    const mainJSX = this.state.isLogin ? loginJSX : logoutJSX;
    return (
      <View style={{ flex: 1, backgroundColor: '#34B089', alignItems: 'center' }}>
        {mainJSX}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  imgeProfile: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 30
  },
  btnStyle: {
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 70
  },
  btnText: {
    color: '#34B089',
    fontSize: 15
  },
  btnStyleSignIn: {
    height: 50,
    width: 250,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginBottom: 10,
    paddingLeft: 10
  },
  btnTextSignIn: {
    color: '#34B089',
    fontSize: 15,
  },
  btnTenNguoiDung: {
    color: '#fff',
    fontFamily: 'Avenir',
    fontSize: 15,
  }
});
