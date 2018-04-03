import React, { Component } from 'react';
import { View, Dimensions, TextInput, Text, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
const { width, height } = Dimensions.get('window')
import Global from '../Global'
import { FontCustom, FontColor, formatConcurency } from '../../Contanst/index'

export default class ListProductsOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listProduct: [],
            total: 0
        };
    }

    componentDidMount() {
        this.setState({ listProduct: this.props.dataProductsOrder })
    }

    renderItem(item, index) {
        return (
            <View style={{ flex: 1, marginLeft: 16, marginRight: 16 }}>
                <View style={{ height: 90, width: width - 48, flexDirection: 'row' }}>
                    <Image source={{ uri: `${baseHost}${urlimage}${item.ImageUrl}` }}
                        style={{ width: 120, height: 90, borderWidth: 1, borderRadius: 3, borderColor: '#E1E3EA' }} />
                    <View style={{ marginLeft: 16, marginRight: 16, height: 90, flex: 1 }}>
                        <Text style={[{ fontFamily: FontCustom.Medium }, { color: FontColor.ColorTextApp, fontSize: 14 }]}>
                            {item.productName}
                        </Text>
                        <Text style={[{ fontFamily: FontCustom.Medium }, { color: FontColor.ColorTextApp, fontSize: 14 }]}>
                            {item.Decription}
                        </Text>
                    </View>
                    <TouchableOpacity style={{ width: 24, height: 24, flex: 0.2, alignItems: 'flex-end', justifyContent: 'flex-end', }}
                        onPress={() => this.deleteItemList(index)}
                    >
                        <Image source={require('../../imagesrc/icDelete.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ height: 44, width: width - 48, marginTop: 12, marginBottom: 12, flexDirection: 'row' }}>
                    <View style={{ width: 120, height: 44, flexDirection: 'row', borderRadius: 4, borderWidth: 0.5, borderColor: '#333333' }}>
                        <TouchableOpacity style={{ width: 34, height: 44, alignItems: 'flex-end', justifyContent: 'center' }}
                            onPress={() => this.onPressAbsNumberProduct(item)}
                        >
                            <Image source={require('../../imagesrc/ic_giam.png')} style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>
                        <View style={{ width: 52, height: 44, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{
                                textAlign: 'center', color: FontColor.ColorTextApp,
                                fontFamily: FontCustom.Regular, fontSize: 18
                            }}>
                                {item.number}
                            </Text>
                        </View>
                        <TouchableOpacity style={{ width: 34, height: 44, alignItems: 'flex-start', justifyContent: 'center' }}
                            onPress={() => this.onPressPlusNumberProduct(item)}>
                            <Image source={require('../../imagesrc/ic_cong.png')} style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, marginLeft: 16, marginRight: 16, justifyContent: 'center', height: 44 }}>
                        <Text style={{ color: FontColor.ColorTextApp, fontSize: 16 }}>
                            x{formatConcurency(item.price)} đ
                        </Text>
                    </View >
                </View>
                <View style={{ height: 1, width: width - 48, backgroundColor: FontColor.ColorLineCell, marginBottom: 15 }} />
                <View style={{ height: 21, width: width - 48, marginBottom: 42, flexDirection: 'row' }}>
                    <Text style={{ flex: 1, textAlign: 'left', color: FontColor.ColorTextApp, fontFamily: FontCustom.Regular, fontSize: 14 }}>
                        Thành tiền
                    </Text>
                    <Text style={{
                        flex: 1, textAlign: 'right', fontFamily: FontCustom.Medium,
                        color: FontColor.ColorTextApp, fontSize: 18
                    }}>
                        {formatConcurency(item.price * item.number)} đ
                    </Text>
                </View>
            </View>
        )
    }

    deleteItemList(index) {
        // Alert.alert(
        //     'Thông báo',
        //     'Bạn có thật sự muốn xáo sản phẩm ' + this.state.listProduct[index].productName + '?',
        //     [
        //         {
        //             text: 'Huỷ', onPress: () => {}, style: 'cancel'
        //         },
        //         { text: 'Đồng Ý', onPress: () => {
        
        Global.deleteItemList(index)

        //     } },
        // ],
        // { cancelable: false }
        // )

    }

    _keyExtractor(item, index) {
        return index.toString();
    }

    onPressPlusNumberProduct(item) {
        Global.onPressPlusNumberProduct(item)
        // this.getTotalOrderProduct()
    }

    onPressAbsNumberProduct(item) {
        Global.onPressAbsNumberProduct(item)
        // this.getTotalOrderProduct()    
    }

    getTotalOrderProduct() {
        totalPrice = 0
        this.props.dataProductsOrder.forEach(element => {
            totalPrice = (element.price * element.number) + totalPrice
        });
        this.setState({ total: totalPrice })
    }

    render() {

        return (
            <View style={{ backgroundColor: 'white', height: height - 30, width: width - 20, marginBottom: 10, marginTop: 20, marginLeft: 8, marginRight: 10, borderRadius: 4 }}>
                <FlatList
                    style={{ flex: 1, marginTop: 48 }}
                    numColumns={1}
                    keyExtractor={this._keyExtractor}
                    data={this.props.dataProductsOrder}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                />
                <TouchableOpacity style={{ height: 64, width: width - 20, backgroundColor: '#00B297', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <Text style={{ textAlign: 'center', fontSize: 26, color: 'white', marginRight: -20 }}>
                        {formatConcurency(this.props.total)} đ
                    </Text>
                    <Image source={require('../../imagesrc/ic_arrow_thanhtoan.png')}
                        style={{ width: 24, height: 24, position: 'absolute', right: 0, marginRight: 20 }} />
                </TouchableOpacity>
            </View>
        )
    }

}