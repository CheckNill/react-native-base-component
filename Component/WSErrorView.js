/**
 * Copyright (c) 2019-present, WSJC, Inc.
 * Created by huangwujie on 2019/03/07
 *
 * 函数式编程，脱离RN生命周期，创建即显示  依赖 react-native-program-stylesheet 第三方库
 * Instructions  使用时引入文件  import WSShowErrorTool,{WSErrorView} from  '...'
 ```
 let onReload = ()=>{

  }
 let para = {}
 let style = {}
 WSShowErrorTool.share().showError({style,para,onReload});
 ```
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Image
} from 'react-native'

import {kWindow} from "./WSBaseComponent";
import {
    kMinorMessageColor,
    kTextAssistColor,
    kBgColor
} from "./WSComponentStyle";
import ProgramStyleSheet from 'react-native-program-stylesheet';
import {Manager as ModalManager} from "react-native-root-modal";

export class WSErrorView extends Component{


    render(){
        const {para} = this.props
        let  title = para.title
        let  btnTitle= para.btnTitle
        let  imgSource = para.imgSource
        let offsetY = para.offsetY
        let  btnHiden = para.btnHiden
        {/*<View style={[{...styles.container},{marginTop:this.props.offsetY,height: ProgramStyleSheet.getSize(kWindow.height-offsetY)}]} >*/}
        {/*<View style={this.props.style} >*/}
        return (
            <View style={[{...styles.container},{marginTop:this.props.offsetY,height: ProgramStyleSheet.getSize(kWindow.height-offsetY)},{...this.props.style}]} >
                <Image style={styles.image} source={imgSource} />
                <Text style={styles.text1} >{title}</Text>
                {btnHiden?<View />:
                    <TouchableOpacity style={styles.btnContainer} onPress={this.props.onReload} >
                        <Text style={styles.text} >{btnTitle}</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        // flex:1,
        width:kWindow.width,
        height:kWindow.height,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:kBgColor,
    },text1:{
        color:kTextAssistColor,fontSize:15,marginTop:20,marginBottom: 18
    },text:{
        color:kTextAssistColor,fontSize:15
    },image:{
        // height:103,width: 83
    },btnContainer:{
        borderColor:kMinorMessageColor,borderWidth: 1,borderRadius:4,paddingHorizontal:22,paddingVertical:5
    }
});

WSErrorView.defaultProps={
    para:{
        title:'内容页面，根据实际文案安排',
        btnTitle:'重新加载',
        imgSource:require('../Asset/ic_bg_car1.png'),
        offsetY:100,
        btnHiden:false
    },


}

let singleton = null
export default class WSShowErrorTool extends Component {

    /***
     * 类方法
     */
    static share(){
        if (!singleton){
            singleton = new WSShowErrorTool();
        }
        return singleton;
    }

    constructor(props){
        super(props)
        this.state={
            modal:undefined
        }
    }

    showError({style,para,onReload}){
        let modal = new ModalManager(<WSErrorView style={style} para={para} onReload={onReload} />);
        this.state.modal = modal
    }

    updateError({style,para,onReload}){
        let  {modal} = this.state
        if (modal){
            modal.update(<WSErrorView style={style} para={para} onReload={onReload} />)
        }
    }

    dismissError(){
        let  {modal} = this.state
        if (modal){
            modal.destroy()
        }
        this.state.modal = null
    }

}