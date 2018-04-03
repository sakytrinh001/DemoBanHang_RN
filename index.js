import { Platform,AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('DemoBanHang', () => App);

baseHost='http://11.0.4.189'
apiGetall='/good/getall'
urlimage= '/images/'
getType = '/good/getTypes'
uploadImage = '/images/fileupload/progress'
insertProduct = '/products'

export const FontCustom = {
    SemiBold: Platform.OS === 'android' ? 'SF-UI-Text-Semibold' : 'SFUIText-Semibold',
    Bold: Platform.OS === 'android' ? 'SF-UI-Text-Bold' : 'SFUIText-Bold',
    Medium: Platform.OS === 'android' ? 'SF-UI-Text-Medium' : 'SFUIText-Medium',
    Regular: Platform.OS === 'android' ? 'SF-UI-Text-Regular' : 'SFUIText-Regular',
    Light: Platform.OS === 'android' ? 'SF-UI-Text-Light' : 'SFUIText-Light',
    
  }
export const FontColor = {
    ColorTextApp: '#333333',//515151
    ColorTextFilter: '#5F5F5F',
    ColorLineCell: '#E1E3EA'//225 227 234
}

export const Background = {
    backgroundColorApp: '#F1F4F9'
}

export function formatConcurency(balanceNumber) {
    return balanceNumber.toFixed(0).replace(/./g, (c, i, a) => {                
        return i && c !== '.' && ((a.length - i) % 3 === 0) ? '.' + c : c;            
    });
}