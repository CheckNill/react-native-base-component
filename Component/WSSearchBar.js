/**
 * Copyright (c) 2019-present, WSJC, Inc.
 * Created by huangwujie on 2019/03/07
 *
 * Instructions  使用时引入文件  import {WSHeadPlaceView} from  '...'
 ```
 <WSSearchBar placeholderText={'placeholderText'} onChangeText={(text)=>{} />
 ```
 */
import React,{Component} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet
} from  'react-native'

import ProgramStyleSheet from 'react-native-program-stylesheet';
import {kWindow} from "./WSBaseComponent";
import {kMinorMessageColor,kBgColor,} from "./WSComponentStyle";




export default class WSSearchBar extends Component{
    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
        }
    }

    render() {
        const {searchText} = this.state
        const {placeholderText,backgroundColor} = this.props
        return (
            <View style={[{...styles.container},{backgroundColor:backgroundColor}]} >
                <View style={styles.textInputeContainer} >
                    <TextInput placeholder={placeholderText}
                               clearButtonMode = 'while-editing'
                               underlineColorAndroid='transparent'
                               style={styles.textInput}
                               onChangeText={this.props.onChangeText?this.props.onChangeText:null}
                    />
                </View>
            </View>
        )
    }

}


WSSearchBar.defaultProps={
    height:ProgramStyleSheet.getSize(100),
    width:ProgramStyleSheet.getSize(100),
    backgroundColor:'white',
    placeholderText:'输入城市名或拼音',

}

const styles=StyleSheet.create({
    container:{
        width: kWindow.width,backgroundColor: 'white'
    },textInputeContainer:{
        marginHorizontal: 12,marginBottom: 12,borderRadius:16,backgroundColor:kBgColor
    },textInput:{
        padding: 0, marginLeft:24,marginRight:16,height: 32
    }
})
