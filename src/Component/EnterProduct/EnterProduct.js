import React, { Component } from 'react';
import { TextInput, Image, ScrollView, Dimensions, Text,
     TouchableOpacity, View, StyleSheet, FlatList, Alert, RefreshControl } from 'react-native';
const { width, height } = Dimensions.get('window')
import { NavigationActions } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay'
import { FontColor, Background, FontCustom, formatConcurency } from './../../Contanst/index';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet'
import { postWithCheckingToken } from '../Menu/networking'

const dataSize = [{ key: '35', isBackG: false }, { key: '36', isBackG: false }, { key: '37', isBackG: false }, { key: '38', isBackG: false }, { key: '39', isBackG: false },
{ key: '40', isBackG: false }, { key: '41', isBackG: false }, { key: '42', isBackG: false }, { key: '43', isBackG: false }, { key: '44', isBackG: false },]
const widthView = width - 16
const options = ['Đóng', 'Camera', 'Thư viện']
const optionsStatus = ['Đóng', 'Còn hàng', 'Sắp về', 'Hết hàng']
const optionsType = ['Đóng', 'Running', 'Chelsea Boost', 'Sandal']
const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4


export default class EnterProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imgSourceLager: null,
            imgSourceSmall1: null,
            imgSourceSmall2: null,
            select: 0,
            numberProduct: 1,
            sizeSelect: '',
            imageSourceString: '',
            strColor: 'white',
            pressStatus: false,
            dataSizeSelect: [],
            enterPrice: '',
            isShowView: false,
            indexSelect: 0,
            nameProduct: '',
            priceProduct: '',
            discountProduct: '',
            statusProduct: '',
            categoryProduct: '',
            dataTypeProduct: [],
            idTypeProduct: '',
            isVisibleSpinner: false

        };
        this.handlePressA = this.handlePressA.bind(this)
        this.handlePressB = this.handlePressB.bind(this)
        this.handlePressC = this.handlePressC.bind(this)
        this.showASPress = this.showASPress.bind(this)
    }

    componentDidMount() {
        this.getTypeProduct()
    }

    _onHideUnderlay() {
        this.setState({ pressStatus: false });
    }
    _onShowUnderlay() {
        this.setState({ pressStatus: true });
    }

    showASPress(number) {
        this.setState({
            select: number
        })

        this.ActionSheetA.show()

    }

    handlePressA(i) {
        if (i === 2) {
            ImagePicker.openPicker({
                mediaType: 'photo',
                waitAnimationEnd: false,
                includeExif: true,
            }).then((image) => {
                console.log('DAT: ' + image.path)
                if (this.state.select == 1) {
                    this.setState({
                        imgSourceLager: image
                    })
                } else if (this.state.select == 2) {
                    this.setState({
                        imgSourceSmall1: image
                    })
                } else if (this.state.select == 3) {
                    this.setState({
                        imgSourceSmall2: image
                    })
                }

            });
        } else if (i === 1) {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
            }).then(image => {
                console.log('DAT CAMERA: ' + image)
                if (this.state.select == 1) {
                    this.setState({
                        imgSourceLager: image
                    })
                } else if (this.state.select == 2) {
                    this.setState({
                        imgSourceSmall1: image
                    })
                } else if (this.state.select == 3) {
                    this.setState({
                        imgSourceSmall2: image
                    })
                }
            });
        }
    }

    renderItem(item) {
        return (
            <TouchableOpacity style={item.isBackG ? styles.styleItemSelect : styles.styleItem} onPress={() => this.getItem(item)}>
                <Text style={item.isBackG ? [styles.textItemSelect, { fontFamily: FontCustom.Regular }] : [styles.textItem, { fontFamily: FontCustom.Regular }, { color: FontColor.ColorTextApp }]}>
                    {item.key}
                </Text>
            </TouchableOpacity>
        )

    }

    getItem(item) {
        item.isBackG = !item.isBackG
        dataSize.forEach(element => {
            if (element.isBackG) {
                this.setState({
                    dataSizeSelect: this.state.dataSizeSelect.concat(element.key)
                })
            }
        });
        this.setState({
            sizeSelect: item.key
        })
    }

    onPressPlus() {
        this.setState({
            numberProduct: (this.state.numberProduct + 1)
        })
    }

    onPressAbs() {
        if (this.state.numberProduct > 1) {
            this.setState({
                numberProduct: (this.state.numberProduct - 1)
            })
        }
    }
    onPressTouchImgLager() {
        this.setState({ indexSelect: 1, isShowView: false })
        this.showASPress(1)
    }

    onPressTouchSmall1() {
        this.setState({ indexSelect: 1, isShowView: false })
        this.showASPress(2)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ backgroundColor: Background.backgroundColorApp, flex: 1 }}>
                    {this.renderActionSheetA()}
                    {this.renderActionSheetB()}
                    {this.renderActionSheetC()}
                    <View style={[styles.viewContainsImageLager, { borderColor: FontColor.ColorTextApp }]}>
                        <TouchableOpacity style={styles.touchImageLager}
                            onPress={() => this.onPressTouchImgLager()}
                        >
                            <Image source={require('../../imagesrc/iconAdd.png')}
                                style={styles.imgAddLager} />
                            <View style={styles.imgPhotoLager}>
                                <Image source={require('../../imagesrc/iconCamea.png')}
                                    style={{ width: 54, height: 54 }} />
                            </View>
                            <Text style={[styles.textLager, { fontFamily: FontCustom.Regular }]}>
                                Upload Photo
                        </Text>
                        </TouchableOpacity>
                        {this.state.imgSourceLager == null ? null : <Image style={styles.imgShowLager} source={{ uri: this.state.imgSourceLager.path }} />}
                    </View>
                    <View style={styles.viewImgContainsAddPhoto}>
                        <View>
                            <TouchableOpacity style={[styles.touchImgSmall1, { borderColor: FontColor.ColorLineCell }]} onPress={() => this.onPressTouchSmall1()}>
                                <Image source={require('../../imagesrc/iconAdd.png')}
                                    style={{ width: 24, height: 24 }} />
                            </TouchableOpacity>
                            {this.state.imgSourceSmall1 == null ? null : <Image style={styles.imgSmallShow1} source={{ uri: this.state.imgSourceSmall1.path }} />}
                        </View>
                        <View>
                            <TouchableOpacity style={{
                                width: (width - 25) / 2, height: 175,
                                backgroundColor: 'white', borderRadius: 3, borderWidth: 1,
                                borderColor: FontColor.ColorLineCell, alignItems: 'center', justifyContent: 'center'
                            }} onPress={() => { this.setState({ indexSelect: 1 }), this.showASPress(3) }}>
                                <Image source={require('../../imagesrc/iconAdd.png')}
                                    style={{ width: 24, height: 24 }} />

                            </TouchableOpacity>
                            {this.state.imgSourceSmall2 == null ? null : <Image style={{
                                flex: 1, position: 'absolute', width: (width - 25) / 2, height: 175, borderRadius: 3, borderWidth: 1,
                                borderColor: FontColor.ColorLineCell
                            }} source={{ uri: this.state.imgSourceSmall2.path }} />}
                        </View>
                    </View>
                    <View style={{ height: 72, width: widthView, marginTop: 20, marginLeft: 8 }}>
                        <Text style={{ height: 14, fontSize: 12, fontFamily: FontCustom.Regular, color: FontColor.ColorTextFilter }}>
                            Tên sản phẩm
                        </Text>
                        <View style={{
                            marginTop: 8, width: widthView, height: 50, alignItems: 'flex-start', justifyContent: 'center',
                            backgroundColor: 'white', borderRadius: 3, borderWidth: 1, borderColor: FontColor.ColorLineCell
                        }}>
                            <TextInput style={{ width: widthView, height: 50, fontSize: 16, fontFamily: FontCustom.Regular, marginLeft: 13 }} placeholder='Nhập tên'
                                onChangeText={(text) => this.setState({
                                    nameProduct: text
                                })}
                            />
                        </View>
                    </View>
                    <View style={{ height: 72, width: widthView, marginTop: 20, marginLeft: 8 }}>
                        <Text style={{ height: 14, fontSize: 12, fontFamily: FontCustom.Regular, color: FontColor.ColorTextFilter }}>
                            Giá sản phẩm
                        </Text>
                        <View style={{
                            marginTop: 8, width: widthView, height: 50, alignItems: 'center', justifyContent: 'center',
                            backgroundColor: 'white', borderRadius: 3, borderWidth: 1, borderColor: FontColor.ColorLineCell,
                            flexDirection: 'row'
                        }}>
                            <TextInput style={{ flex: 1, fontSize: 16, fontFamily: FontCustom.Regular, marginLeft: 13, height: 50 }}
                                placeholder='Nhập giá' onChangeText={(text) => this.setState({ priceProduct: text })} keyboardType='numeric'
                            />
                            <Text style={{ fontSize: 16, fontFamily: FontCustom.Regular, color: FontColor.ColorTextApp, marginRight: 13 }}>
                                đ
                        </Text>
                        </View>
                    </View>
                    <View style={{ height: 72, width: widthView, marginTop: 20, marginLeft: 8 }}>
                        <Text style={{ height: 14, fontSize: 12, fontFamily: FontCustom.Regular, color: FontColor.ColorTextFilter }}>
                            Khuyến mãi, giảm giá
                        </Text>
                        <View style={{
                            marginTop: 8, width: widthView, height: 50, alignItems: 'center', justifyContent: 'center',
                            backgroundColor: 'white', borderRadius: 3, borderWidth: 1, borderColor: FontColor.ColorLineCell, flexDirection: 'row'
                        }}>
                            <TextInput style={{ flex: 1, fontSize: 16, fontFamily: FontCustom.Regular, marginLeft: 13, width: widthView, height: 50 }} placeholder='Nhập khuyến mãi'
                                keyboardType='numeric' onChangeText={(text) => this.setState({
                                    discountProduct: text
                                }
                                )}
                            />
                            <Text style={{ fontSize: 16, fontFamily: FontCustom.Regular, color: FontColor.ColorTextApp, marginRight: 13 }}>
                                %
                        </Text>
                        </View>
                    </View>
                    <View style={{ height: 72, width: widthView, marginTop: 20, marginLeft: 8 }}>
                        <Text style={{ height: 14, fontSize: 12, fontFamily: FontCustom.Regular, color: FontColor.ColorTextFilter }}>
                            Tình trạng
                        </Text>
                        <TouchableOpacity style={{
                            marginTop: 8, width: widthView, height: 50, alignItems: 'center', justifyContent: 'center',
                            backgroundColor: 'white', borderRadius: 3, borderWidth: 1, borderColor: FontColor.ColorLineCell, flexDirection: 'row'
                        }} onPress={() => {
                            this.setState({ indexSelect: 2 }), this.ActionSheetB.show(), this.setState({ isShowView: true })
                        }}
                        >
                            <TextInput style={{ flex: 1, fontSize: 16, fontFamily: FontCustom.Regular, marginLeft: 13 }} placeholder='Chọn tình trạng' editable={false} selectTextOnFocus={false}
                                value={this.state.statusProduct}
                            />
                            <Image style={{ width: 15, height: 24, marginRight: 13 }} source={require('../../imagesrc/ic_row_down.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 72, width: widthView, marginTop: 20, marginLeft: 8 }}>
                        <Text style={{ height: 14, fontSize: 12, fontFamily: FontCustom.Regular, color: FontColor.ColorTextFilter }}>
                            Chuyên mục
                        </Text>
                        <TouchableOpacity style={{
                            marginTop: 8, width: widthView, height: 50, alignItems: 'center', justifyContent: 'center',
                            backgroundColor: 'white', borderRadius: 3, borderWidth: 1, borderColor: FontColor.ColorLineCell, flexDirection: 'row'
                        }} onPress={() => {
                            this.setState({ indexSelect: 3 }), this.ActionSheetC.show(), this.setState({ isShowView: true })
                        }}
                        >
                            <TextInput style={{ flex: 1, fontSize: 16, fontFamily: FontCustom.Regular, marginLeft: 13 }} placeholder='Chọn chuyên mục' editable={false} selectTextOnFocus={false}
                                value={this.state.categoryProduct}
                            />
                            <Image style={{ width: 15, height: 24, marginRight: 13 }} source={require('../../imagesrc/ic_row_down.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 72, width: widthView, marginTop: 20, marginLeft: 8 }}>
                        <Text style={{ height: 14, fontSize: 12, fontFamily: FontCustom.Regular, color: FontColor.ColorTextFilter }}>
                            Số lượng
                        </Text>
                        <View style={{
                            marginTop: 8, width: widthView, height: 50, alignItems: 'center',
                            backgroundColor: 'white', borderRadius: 3, borderWidth: 1, borderColor: FontColor.ColorLineCell
                            , flexDirection: 'row'
                        }}>
                            <TouchableOpacity style={{ width: 66.5, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
                                onPress={() => this.onPressAbs()}
                            >
                                <Image source={require('../../imagesrc/ic_giam.png')} style={{ width: 31.9, height: 24, marginLeft: 17.3, marginRight: 17.3 }} />
                                <View style={{ width: 2.7, height: 50, backgroundColor: FontColor.ColorLineCell }} />
                            </TouchableOpacity>
                            <Text style={{ flex: 1, textAlign: 'center' }}>
                                {this.state.numberProduct}
                            </Text>
                            <TouchableOpacity style={{ width: 66.5, width: 66.5, marginLeft: 17.3, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
                                onPress={() => this.onPressPlus()}
                            >
                                <View style={{ width: 2.7, height: 50, backgroundColor: FontColor.ColorLineCell }} />
                                <Image source={require('../../imagesrc/ic_cong.png')} style={{ width: 31.9, height: 24, marginLeft: 17.3, marginRight: 17.3 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{
                        height: 14, marginLeft: 28, fontSize: 12, textAlign: 'left',
                        color: FontColor.ColorTextFilter, marginTop: 20
                    }}>
                        Màu sắc
                </Text>
                    <View style={{ height: 48, width: widthView, marginTop: 9, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <TouchableOpacity style={{ height: 32, width: 32, marginLeft: 16, borderRadius: 16, backgroundColor: 'red' }} />
                        <TouchableOpacity style={{ height: 48, width: 48, marginLeft: 28, borderRadius: 24, borderColor: '#899DC1', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ height: 32, width: 32, backgroundColor: '#F67B89', borderRadius: 16 }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{
                        height: 14, marginLeft: 28, fontSize: 12, textAlign: 'left',
                        color: FontColor.ColorTextFilter, marginTop: 20
                    }}>
                        Size
                </Text>
                    <FlatList style={{ flex: 1, marginTop: 8, marginLeft: 2, width: (width - 4), height: ((width - 4) / 6) * 2 + 12 }}
                        numColumns={6}
                        keyExtractor={this._keyExtractor}
                        data={dataSize}
                        renderItem={({ item, index }) => this.renderItem(item, index)}
                    />
                    <View style={{
                        marginTop: 18, width: widthView, marginLeft: 8, height: 50,
                        marginBottom: 47, flexDirection: 'row'
                    }}>
                        <TouchableOpacity style={{
                            width: (widthView - 7.5) / 2, height: 50, borderRadius: 4, borderColor: '#00B297', borderWidth: 1,
                            alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'
                        }} >
                            <Text style={{ color: '#00B297', fontFamily: FontCustom.Regular, fontSize: 16, textAlign: 'center' }}>
                                Huỷ
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: (widthView - 7.5) / 2, height: 50, marginLeft: 7.5, borderRadius: 4,
                            alignItems: 'center', justifyContent: 'center', backgroundColor: '#00B297'
                        }} onPress={() => this.onPressSave()}>
                            <Text style={{ color: 'white', fontFamily: FontCustom.Regular, fontSize: 16, textAlign: 'center' }}>
                                Lưu
                        </Text>
                        </TouchableOpacity>
                    </View>
                    />
                </ScrollView>
                <Spinner visible={this.state.isVisibleSpinner} color={'black'} size={'small'} animation={'none'} />
            </View>
        )
    }


    handleTouch() {

    }

    addMultiImage(requestData) {
        // create formdata
        const formData = new FormData();
        requestData.forEach((image, index) => {
            if (image.id !== -1) {
                console.log('image', image)
                var url = image.uri;
                var urlsplit = url.split("/");

                var lastPath = urlsplit[urlsplit.length - 1];
                formData.append('csv', {
                    uri: image.uri,
                    type: image.mime,
                    name: lastPath
                });
            }
        });
        return postWithCheckingToken(`${baseUrlImg}/files/multiple`, {
        }, formData)
            .then(response => {
                console.log('responseImage', response)
                return response
            })
    }
    onPressSave() {
        this.setState({ isVisibleSpinner: true });
        const { imgSourceLager } = this.state
        const formData = new FormData();
        formData.append('csv', {
            uri: imgSourceLager.path,
            type: imgSourceLager.mime,
            name: imgSourceLager.filename
        });
        return postWithCheckingToken(`http://11.0.4.189/images/fileupload/progress`, {
        }, formData)
            .then(response => {
                console.log(response)
                this.handleSaveProduct()
                return response
            })
    }

    handleSaveProduct() {
        let data = {
            method: 'POST',
            body: JSON.stringify({
                productName: this.state.nameProduct,
                price: this.state.priceProduct,
                ProductTypeId: this.state.idTypeProduct,
                Status: this.state.statusProduct,
                Stock: this.state.numberProduct,
                ImageUrl: this.state.imgSourceLager.filename
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
        this.setState({ isVisibleSpinner: false })
        return fetch('http://11.0.4.189/products', data)
            .then(response => Alert.alert('Thông báo', 'Đăng sản phẩm thành công'))
            .catch((err) => { Alert.alert('Thông báo', 'Đăng sản phẩm không thành công'), console.log('THANH' + err) });
    }


    handlePressB(i) {
        if (optionsStatus[i] != 'Huỷ') {
            this.setState({
                statusProduct: optionsStatus[i]
            })
        }
    }

    handlePressC(i) {
        if (optionsType[i] != 'Huỷ') {
            this.setState({
                categoryProduct: optionsType[i]
            })
        }

        this.state.dataTypeProduct.forEach((item, index) => {
            if (item.ProductTypeName == optionsType[i]) {
                this.setState({
                    idTypeProduct: item._id
                })
            }
        })

    }

    renderActionSheetB() {
        return (
            <ActionSheet
                title={'Chọn trạng thái'}
                ref={o => this.ActionSheetB = o}
                options={optionsStatus}
                cancelButtonIndex={CANCEL_INDEX}
                destructiveButtonIndex={DESTRUCTIVE_INDEX}
                onPress={this.handlePressB}
            />
        );
    }

    renderActionSheetC() {
        return (
            <ActionSheet
                title={'Chọn chuyên mục'}
                ref={o => this.ActionSheetC = o}
                options={optionsType}
                cancelButtonIndex={CANCEL_INDEX}
                destructiveButtonIndex={DESTRUCTIVE_INDEX}
                onPress={this.handlePressC}
            />
        );
    }

    renderActionSheetA() {

        return (
            <ActionSheet
                title={'Upload Photo'}
                ref={o => this.ActionSheetA = o}
                options={options}
                cancelButtonIndex={CANCEL_INDEX}
                destructiveButtonIndex={DESTRUCTIVE_INDEX}
                onPress={this.handlePressA}
            />
        );
    }

    async getTypeProduct() {
        try {
            let response = await fetch(
                `${baseHost}${getType}`
            );
            let responseJson = await response.json();
            this.setState({
                dataTypeProduct: responseJson
            })
            console.log(this.state.dataTypeProduct)
        } catch (error) {
            console.error('LOI ' + error)
        }

    }


}
const styles = StyleSheet.create({
    styleItem: {
        width: (width - 76) / 6, height: (width - 76) / 6, alignItems: 'center',
        justifyContent: 'center', backgroundColor: 'white', borderRadius: 3,
        borderWidth: 1, borderColor: '#E1E3EA', marginLeft: 6, marginRight: 6, marginBottom: 12
    },
    styleItemSelect: {
        width: (width - 76) / 6, height: (width - 76) / 6, alignItems: 'center',
        justifyContent: 'center', backgroundColor: '#899DC1', borderRadius: 3,
        borderWidth: 1, borderColor: '#E1E3EA', marginLeft: 6, marginRight: 6, marginBottom: 12
    },
    textItemSelect: {
        textAlign: 'center', fontSize: 14, color: 'white'
    },
    textItem: {
        textAlign: 'center', fontSize: 14
    },
    viewContainsImageLager: {
        marginTop: 8,
        height: widthView,
        width: widthView,
        backgroundColor: 'white',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8
    },
    touchImageLager: {
        width: 160,
        height: 160,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#9B9B9B'
    },
    imgAddLager: {
        width: 24,
        height: 24,
        marginTop: 10,
        marginRight: 10,
        position: 'absolute',
        right: 0
    },
    imgPhotoLager: {
        width: 160,
        height: 54,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 38
    },
    textLager: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 17,
        color: '#9B9B9B'
    },
    imgShowLager: {
        flex: 1,
        position: 'absolute',
        width: widthView,
        height: widthView
    },
    viewImgContainsAddPhoto: {
        marginTop: 8,
        height: 175,
        width: widthView,
        flexDirection: 'row',
        marginLeft: 8
    },
    touchImgSmall1: {
        width: (width - 25) / 2,
        height: 175,
        marginRight: 9,
        backgroundColor: 'white',
        borderRadius: 3,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgSmallShow1: {
        flex: 1, 
        position: 'absolute', 
        width: (width - 25) / 2, 
        height: 175, 
        borderRadius: 3, 
        borderWidth: 1,
        borderColor: FontColor.ColorLineCell

    }
})
