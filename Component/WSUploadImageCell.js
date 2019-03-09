/**
 * Copyright (c) 2019-present, WSJC, Inc.
 * Created by huangwujie on 2019/03/07
 *
 * Instructions  使用时引入文件  import {WSUploadImageCell} from  '...'
 ```
    <WSUploadImageCell  onFileReceived={(file, fileName)=>{}} />
 ```
 */
import React,{Component} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ImageBackground
} from  'react-native'

import ProgramStyleSheet from 'react-native-program-stylesheet';
import {kWindow} from "./WSBaseComponent";
import {kMinorMessageColor,kTextDescibeColor,kBgColor,kCuttingLineColor} from "./WSComponentStyle";
import WSImagePickerView from './WSImagePickerView'



export class WSUploadImageCell extends Component{
    constructor(props) {
        super(props)
        this.state = {
            source:null
        }
    }

    render() {
        const {source} = this.state
        const {title,backgroundColor,rightImgSoure} = this.props
        return (
            <View style={styles.container} >
                <Text style={styles.title} >{title}</Text>
                    <ImageBackground style={styles.imgContainer} source={source} imageStyle={styles.imageStyle} >
                        <WSImagePickerView style={{flex: 1}} onFileReceived={(file, fileName) => {
                            this.props.onFileReceived(file, fileName)
                            this.setState({source:{uri:file}})
                        }} />
                    </ImageBackground>
                <Image style={styles.rightImg} source={rightImgSoure} />
            </View>
        )
    }

}


WSUploadImageCell.defaultProps={
    height:ProgramStyleSheet.getSize(100),
    width:ProgramStyleSheet.getSize(100),
    backgroundColor:'white',
    title:'单行图片',
    rightImgSoure:require('../../Assets/btn/ic_porfile_ent.png'),

}

const styles=StyleSheet.create({
    container:{
        flexDirection: 'row',width: kWindow.width,backgroundColor: 'white',justifyContent: 'center',alignItems: 'center'
    },textInputeContainer:{
        marginHorizontal: 12,marginBottom: 12,borderRadius:16,backgroundColor:kBgColor
    },title:{
         flex: 1,marginLeft:24,fontSize:15,color:kTextDescibeColor,marginVertical: 24
    },imgContainer:{
        height:51,width:51,borderRadius: 25.5,backgroundColor:kCuttingLineColor,marginRight:12
    },rightImg:{
        marginRight: 16
    },imageStyle:{
        borderRadius:25.5
    }
})
