import React, { Component } from 'react';
import { TouchableHighlight, Modal, Platform, Image, ScrollView, TextInput, Dimensions, Text, TouchableOpacity, View, StyleSheet, FlatList, Alert, RefreshControl } from 'react-native';
const { width, height } = Dimensions.get('window')
import { NavigationActions } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay'
import { FontCustom, FontColor, formatConcurency } from '../../Contanst/index'
import ListProducts from '../ListProductsOrder/ListProductsOrder'
import Global from '../Global'
import FastImage from 'react-native-fast-image'


export default class ListView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            data: [],
            itemCell: '',
            visible: false,
            numberProduct: 0,
            dataSaveOrderProduct: [],
            dataCheck: [],
            modalVisible: false,
            modalFilter: false,
            dataTypeProduct: []
        };
        this.arrayholder = [];
        Global.onPressPlusNumberProduct = this.onPressPlusNumberProduct.bind(this)
        Global.onPressAbsNumberProduct = this.onPressAbsNumberProduct.bind(this)
        Global.deleteItemList = this.deleteItemList.bind(this)
    }

    _keyExtractor(item, index) {
        return index.toString();
    }

    componentDidUpdate() {
        console.log('Thanh ')
        return true
    }

    componentWillMount() {
        this.getAPI()
        this.getTypeProduct()
    }

    GetItem(item) {
        // Alert.alert(item.productName)
    }


    renderItem(item, index) {
        return (
            <View style={styles.itemBlock} >
                <View style={styles.itemMeta} onPress={this.GetItem.bind(this, item.title)}>
                    <Image source={{ 
                        uri: `${baseHost}${urlimage}${item.ImageUrl}`}}
                        style={styles.itemImage} />
                    <View style={styles.viewColorProduct}>
                        <Text style={[styles.textNumberColor, { fontFamily: FontCustom.Regular }, { color: FontColor.ColorTextApp }]}>
                            1 màu
                        </Text>
                        <Text style={[styles.textStatusProduct, {
                            color: item.Status.toUpperCase() ==
                                'con hang'.toUpperCase() ? 'green' : '#FA7600'
                        },
                        { fontFamily: FontCustom.Regular }]}>
                            {item.Status}
                        </Text>
                    </View>
                    <View style={styles.viewNameProduct}>
                        <Text style={[styles.textNameProduct, { color: FontColor.ColorTextApp }, { fontFamily: FontCustom.SemiBold }]}>
                            {item.productName}
                        </Text>
                    </View>
                    <View style={styles.viewLine} />
                    <View style={styles.viewAdd}>
                        <Text style={[styles.textPriceProduct, { color: FontColor.ColorTextFilter }]}>
                            {formatConcurency(item.price)} đ
                        </Text>
                        <TouchableOpacity style={styles.touchAddProduct} onPress={() => this.onPressAddProduct(item)}>
                            <Text style={[styles.textAddProduct, { fontFamily: FontCustom.Regular }]}>
                                Thêm
                            </Text>
                            <Image source={require('../../imagesrc/add.png')} style={styles.imageAddProduct} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    onPressPlusNumberProduct(item) {

        const newCart = this.state.dataSaveOrderProduct.map(e => {
            if (e._id == item._id) {
                e.number = e.number + 1
            }
            return e
        })
        this.setState({
            dataSaveOrderProduct: newCart
        })

    }

    onPressAbsNumberProduct(item) {

        const newCart = this.state.dataSaveOrderProduct.map(e => {
            if (e._id == item._id) {
                if (e.number > 1) {
                    e.number = e.number - 1
                }
            }
            return e
        })
        this.setState({
            dataSaveOrderProduct: newCart
        })

    }

    deleteItemList(index) {
        this.setState({
            dataSaveOrderProduct: this.state.dataSaveOrderProduct.filter((_, i) => i !== index),
            numberProduct: (this.state.dataSaveOrderProduct.filter((_, i) => i !== index).length)
        });
    }

    onPressAddProduct(item) {
        if (!this.handleCheck(item)) {
            this.setState({ dataSaveOrderProduct: this.state.dataSaveOrderProduct.concat(this.customListProduct(item)), numberProduct: this.state.dataSaveOrderProduct.concat(this.customListProduct(item)).length })
        } else {
            this.customListProductPlus(item)
        }
    }

    customListProductPlus(item) {
        list = []
        this.state.dataSaveOrderProduct.map((itemData, index) => {
            if (item._id == itemData._id) {
                itemData.number = itemData.number + 1
            }
            list.push(itemData)
        })

        this.setState({
            dataSaveOrderProduct: list
        })
    }


    customListProduct(item) {
        if (!this.handleCheck(item)) {
            item['number'] = 1
        }
        return item
    }

    customTypeProduct(item) {
        if (!this.handleSelectFilter(item)) {
            item['isSelect'] = false
        }
        return item
    }

    handleCheck(val) {
        return this.state.dataSaveOrderProduct.some(item => val._id === item._id);
    }

    handleSelectFilter(val) {
        return this.state.dataTypeProduct.some(item => val._id === item._id);
    }


    _onRefresh() {
        this.setState({
            refreshing: true
        })
        setTimeout(function () {
            this.setState({
                refreshing: false
            })
        }.bind(this), 1000)
    }

    renderSeparator() {
        return <View style={styles.separator} />
    }

    renderHeader() {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{item.title}</Text>
            </View>
        )
    }

    setModalFilter(visible) {
        this.setState({ modalFilter: visible });
    }

    renderItemFilter(item, index) {
        return (
            <TouchableOpacity style={{ width: (width - 109) / 2, height: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}
                onPress={() => this.onPressSelectFilter(item)}>
                <Image source={item.isSelect == true ? require('../../imagesrc/selectedBox.png') : require('../../imagesrc/ic_unselected_box.png')} style={{ width: 20, height: 20 }} />
                <Text style={{ fontFamily: FontCustom.Medium, fontSize: 15, color: FontColor.ColorTextApp, marginLeft: 15 }}>
                    {item.ProductTypeName}
                </Text>
            </TouchableOpacity>
        )
    }


    onPressSelectFilter(item) {
        const newCart = this.state.dataTypeProduct.map(e => {
            if (e._id == item._id) {
                e.isSelect = !e.isSelect
            }
            return e
        })
        this.setState({
            dataTypeProduct: newCart
        })
    }


    onPressClearAll() {
        const newCart = this.state.dataTypeProduct.map(e => {
            e.isSelect = false
            return e
        })
        this.setState({
            dataTypeProduct: newCart
        })

    }

    onPressApply() {
        dataArr = []
        this.state.dataTypeProduct.forEach(item => {
            if (item.isSelect == true) {
                this.arrayholder.map(el => {
                    if (el.ProductTypeId == item._id) {
                        dataArr.push(el)
                    }
                })
            }
        });
        this.setState({
            data: dataArr,
            modalFilter: false
        })
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {}}
                >
                    <View style={styles.viewFilter}>
                        <View>
                            <ListProducts dataProductsOrder={this.state.dataSaveOrderProduct}
                            />
                            <TouchableOpacity style={styles.closeViewCash} onPress={() => { this.setModalVisible(false) }}>
                                <Image source={require('../../imagesrc/ic_cancel_black.png')} style={styles.imgSearch} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalFilter}
                    onRequestClose={() => {}}
                >
                    <View style={styles.viewFilter}>
                        <View style={[styles.viewContainsFilter, {marginBottom: Platform.OS === 'android' ? 50 : 10}, {marginTop: Platform.OS === 'android' ? 10 : 30}]}>
                            <View style={styles.viewTopFilter}>
                                <Text style={[styles.textTitleFilter, { fontFamily: FontCustom.SemiBold }, { color: FontColor.ColorTextApp }]}>
                                    Bộ lọc
                                </Text>
                                <TouchableOpacity style={styles.touchCloseFilter} onPress={() => this.setModalFilter(false)}>
                                    <Image source={require('../../imagesrc/ic_cancel_black.png')} style={{ width: 24, height: 24 }} />
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.textHeaderFilter, { fontFamily: FontCustom.Bold }, { color: FontColor.ColorTextApp }]}>
                                Chuyên mục
                            </Text>
                            <FlatList style={styles.flastlistFilter}
                                numColumns={2}
                                keyExtractor={this._keyExtractor}
                                data={this.state.dataTypeProduct}
                                renderItem={({ item, index }) => this.renderItemFilter(item, index)} />
                            <TouchableOpacity style={styles.touchApplyFilter} onPress={() => this.onPressApply()}>
                                < Text style={[styles.textApplyFilter, { fontFamily: FontCustom.Regular }]}>
                                    Đồng Ý
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.touchCancelFilter} onPress={() => this.setModalFilter(false)}>
                                < Text style={[styles.textCancelFilter, { fontFamily: FontCustom.Regular }]}>
                                    Huỷ
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.touchClearAllFilter} onPress={() => this.onPressClearAll()}>
                                <Text style={[styles.textClearAllFilter, { fontFamily: FontCustom.Regular }]}>
                                    Xoá tất cả bộ lọc đã chọn
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={styles.viewSearch}>
                    <View style={styles.viewContainsTopSearch}>
                        <View style={styles.viewContainsSearch}>
                            <Image source={require('../../imagesrc/ic_header_search.png')} style={styles.imgSearch} />
                            <TextInput placeholder={'Tìm kiếm...'} style={{ marginRight: 10, width: 200 }}
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.SearchFilterFunction(text)} />
                        </View>
                        <View style={styles.viewHz} />
                        <View style={styles.viewTouchOpacity}>
                            <TouchableOpacity style={styles.touchFilter} onPress={() => this.setModalFilter(true)}>
                                <Text style={[styles.textFilter, { fontFamily: FontCustom.Regular }, { color: FontColor.ColorTextFilter }]}>
                                    Filter
                                 </Text>
                                <Image source={require('../../imagesrc/ic_fillter.png')} style={styles.imageFilter} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <FlatList
                    style={{ marginRight: 4, marginLeft: 4, marginTop: 8 }}
                    numColumns={2}
                    keyExtractor={this._keyExtractor}
                    data={this.state.data}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                />
                <TouchableOpacity style={styles.viewContainsCash} onPress={() => this.onPressCash()}>
                    {this.state.numberProduct == 0 ? <View /> : <View style={styles.viewContainsTextCash} >
                        <Text style={styles.textCash}>
                            {this.state.numberProduct}
                        </Text>
                    </View>
                    }
                    <Image source={require('../../imagesrc/ic_card_of.png')} style={styles.imgCash} />
                </TouchableOpacity>
                <Spinner visible={this.state.visible} color={'black'} size={'small'} animation={'none'} />
            </View>

        )
    }

    async getTypeProduct() {
        try {
            let response = await fetch(
                `${baseHost}${getType}`
            );
            let responseJson = await response.json();
            responseJson.forEach((item, index) => this.setState({
                dataTypeProduct: this.state.dataTypeProduct.concat(this.customTypeProduct(item))
            }))

        } catch (error) {
            console.error('LOI ' + error)
        }
    }


    SearchFilterFunction(text) {

        const newData = this.arrayholder.filter(function (item) {
            const itemData = item.productName.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            data: newData
        })
    }

    onPressCash() {
        if (this.state.dataSaveOrderProduct.length > 0) {
            this.setModalVisible(true);
        }
    }

    async getAPI() {
        try {
            this.setState({ visible: true })
            let response = await fetch(
                `${baseHost}${apiGetall}`
            );
            let responseJson = await response.json();
            this.setState({ data: responseJson });
            this.arrayholder = responseJson
            this.setState({ visible: false });
        } catch (error) {
            console.error('LOI ' + error)
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemBlock: {
        backgroundColor: 'white',
        marginBottom: 8,
        marginRight: 4,
        marginLeft: 4,
        borderRadius: 4,
        width: width / 2 - 12,
    },
    itemImage: {
        width: width / 2 - 12,
        height: width / 2 - 12,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
    },
    itemMeta: {
        flex: 1,
        alignItems: 'center',
    },
    separator: {
        height: 2,
        width: width / 2 - 12,
        backgroundColor: "#555"
    },
    header: {
        padding: 10,
    },
    headerText: {
        fontSize: 30,
        fontWeight: '900'
    },
    viewAdd: {
        flexDirection: 'row',
        marginTop: 12,
        marginBottom: 11,
        marginLeft: 10,
        marginRight: 10
    },
    viewLine: {
        backgroundColor: '#CCCCCC',
        height: 0.5,
        width: width / 2 - 12,
        marginTop: 8
    },
    viewSearch: {
        borderRadius: 4,
        height: 42,
        width,
        marginTop: 8,

    },
    touchFilter: {
        flex: 1,
        flexDirection: 'row',
        height: 42,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textFilter: {
        textAlign: 'left',
        flex: 1,
        fontSize: 17,
        marginLeft: 16,
        marginRight: 11
    },
    imageFilter: {
        width: 24,
        height: 24,
        marginRight: 12
    },
    imgSearch: {
        width: 24,
        height: 24,
        marginLeft: 20,
        marginRight: 20
    },
    viewContainsSearch: {
        flex: 1,
        backgroundColor: 'white',
        height: 42,
        flexDirection: 'row',
        marginLeft: 4,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    viewContainsTopSearch: {
        marginLeft: 8,
        marginRight: 8,
        borderRadius: 4,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    viewHz: {
        width: 2,
        height: 42,
        backgroundColor: '#F1F3F7'
    },
    viewTouchOpacity: {
        width: 106,
        height: 42,
        backgroundColor: 'white',
        marginRight: 4
    },
    viewContainsCash: {
        position: 'absolute',
        bottom: 16,
        right: 21,
        width: 40,
        height: 62,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewContainsTextCash: {
        height: 35,
        backgroundColor: 'red',
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 17.5
    },
    textCash: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
    },
    imgCash: {
        width: 39,
        height: 24,
        position: 'absolute',
        bottom: 0
    },
    closeViewCash: {
        position: 'absolute',
        right: 0,
        marginTop: Platform.OS === 'android' ? 20 : 30
    },
    viewColorProduct: {
        flexDirection: 'row',
        marginTop: 12,
        marginLeft: 10,
        marginRight: 10
    },
    textNumberColor: {
        textAlign: 'left',
        flex: 1,
        fontSize: 14,
    },
    textStatusProduct: {
        textAlign: 'right',
        flex: 1,
        color: 'green',
        fontSize: 14
    },
    viewNameProduct: {
        flexDirection: 'row',
        marginTop: 8,
        marginLeft: 10,
        marginRight: 10
    },
    textNameProduct: {
        textAlign: 'left',
        flex: 1,
        fontSize: 14,
    },
    textPriceProduct: {
        textAlign: 'left',
        flex: 1,
        color: 'gray',
        fontSize: 14
    },
    touchAddProduct: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
        height: 22,
    },
    textAddProduct: {
        textAlign: 'center',
        color: 'gray',
        height: 22,
        fontSize: 14
    },
    imageAddProduct: {
        width: 18,
        height: 18,
        justifyContent: 'center',
        marginLeft: 6
    },
    viewContainsFilter: {
        backgroundColor: 'white',
        height: height - 40,
        width: width - 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 4
    },
    viewFilter: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        height,
        width
    },
    viewTopFilter: {
        height: 52,
        width: width - 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F4F9',
        borderRadius: 4
    },
    textTitleFilter: {
        textAlign: 'center',
        fontSize: 16
    },
    touchCloseFilter: {
        position: 'absolute',
        right: 0,
        marginTop: 16,
        marginRight: 16,
        width: 24,
        height: 24
    },
    textHeaderFilter: {
        fontSize: 14,
        marginLeft: 17,
        marginTop: 16
    },
    flastlistFilter: {
        flex: 1,
        marginTop: 20,
        marginLeft: 17
    },
    touchApplyFilter: {
        width: width - 52,
        marginLeft: 16,
        marginTop: 20,
        backgroundColor: '#00B297',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40
    },
    textApplyFilter: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center'
    },
    touchCancelFilter: {
        marginTop: 10,
        height: 40,
        width: width - 52,
        marginLeft: 16,
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#00B297',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textCancelFilter: {
        fontSize: 14,
        color: '#00B297',
        textAlign: 'center'
    },
    touchClearAllFilter: {
        width: width - 52,
        marginLeft: 16,
        marginTop: 20,
        marginTop: 13,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textClearAllFilter: {
        fontSize: 14,
        color: '#00B297',
        textAlign: 'center'
    }

})
