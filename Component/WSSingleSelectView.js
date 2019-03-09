/**
 * Copyright (c) 2019-present, WSJC, Inc.
 * Created by huangwujie on 2019/03/07
 *
 * Instructions  使用时引入文件  import {WSUploadImageCell} from  '...'
 ```
    <WSSingleSelectView onClick={(index)=>{}} />
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
    ImageBackground, PixelRatio
} from 'react-native'

import ProgramStyleSheet from 'react-native-program-stylesheet';
import {kWindow} from "./WSBaseComponent";
import {kMinorMessageColor,kTextDescibeColor,kBgColor,kCuttingLineColor} from "./WSComponentStyle";
import WSImagePickerView from './WSImagePickerView'



export class WSSingleSelectView extends Component{
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex:0
        }
    }

    _renderView(title,detail,index){
        const {nomalImg,selectedImg,data} = this.props
        let {selectedIndex} = this.state
        let hideLine = index===data.length-1?true:false
        let img = index===selectedIndex?selectedImg:nomalImg
        return (
            <View>
                <TouchableOpacity
                    onPress={()=>{
                        this.props.onClick(index)
                        this.setState({selectedIndex:index})
                    }}
                >
                    <View style={styles.container} >
                        <Text style={styles.title} >{title}</Text>
                        <Text style={styles.detail} >{detail}</Text>
                        <Image style={styles.rightImg} source={img} />
                    </View>
                </TouchableOpacity>
                {hideLine?<View />:<View style={styles.line} />}
            </View>
        )
    }

    render() {
        const {data,backgroundColor} = this.props
        let views = data.map((item,index)=>{
            return this._renderView(item.title,item.detail,index)
        })
        return (
            <View style={{backgroundColor:backgroundColor}} >
                {views}
            </View>
        )
    }

}


WSSingleSelectView.defaultProps={
    backgroundColor:'white',
    nomalImg:require('../Asset/select@2x.png'),
    selectedImg:require('../Asset/selected_pay@2x.png'),
    data:[
        {title:'多行列表',detail:'详细信息'},
        {title:'多行列表',detail:'详细信息'},
    ]

}

const styles=StyleSheet.create({
    container:{
        flexDirection: 'row',width: kWindow.width,backgroundColor: 'white',justifyContent: 'center',alignItems: 'center'
    },title:{
        marginLeft:24,fontSize:15,color:kTextDescibeColor,marginVertical: 14,textAlign: 'left'
    },detail:{
        flex: 1,marginRight:12,fontSize:15,color:kTextDescibeColor,marginVertical: 14,textAlign:'right'
    },rightImg:{
        marginRight: 16
    },line:{
        height:1 / PixelRatio.get(),backgroundColor:kCuttingLineColor
    }
})
