/**
 * Copyright (c) 2019-present, WSJC, Inc.
 * Created by huangwujie on 2019/03/07
 *
 * 函数式编程，脱离RN生命周期，创建即显示  依赖 react-native-program-stylesheet 第三方库
 * Instructions  使用时引入文件  import WSWeChatStyleViewTool,{WSWeChatStyleView} from  '...'
 ```
 let action = (index)=>{
            if (index === -1){ //cancel

            }else {

            }
            WSWeChatStyleViewTool.share().dismiss()//隐藏方法
        }
 let para = {}
 WSWeChatStyleViewTool.share().show(para,{action})//显示方法
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
    Image, PixelRatio
} from 'react-native'

import {kWindow} from "./WSBaseComponent";
import {
    kBgColor,
    kModalBgColor,
    kTitleColor,
    kCuttingLineColor,
} from "./WSComponentStyle";
import ProgramStyleSheet from 'react-native-program-stylesheet';
import {Manager as ModalManager} from "react-native-root-modal";

export class WSWeChatStyleView extends Component{


    _getTouchButton(title,index,color){
        return (
            <View>
                <TouchableOpacity style={styles.btnContainer}
                  onPress={()=>{
                      this.props.action(index)
                  }}
                >
                    <Text style={[{...styles.text},{color:color}]} >{title}</Text>
                </TouchableOpacity>
                <View style={styles.line1Pix} />
            </View>
        )
    }

    _renderCancelView(){
        let {para,cancelColor} = this.props
        cancelColor=para.cancelColor?para.cancelColor:cancelColor
        return this._getTouchButton("取消",-1,cancelColor)
    }

    _renderViews(){
        let {para,data,textColor} = this.props
        data=para.data?para.data:data
        textColor=para.textColor?para.textColor:textColor

        return data.map((item,index)=>{
            return this._getTouchButton(item,index,textColor)
        })
    }

    render(){
        return (
            <View style={styles.container} >
                <View style={styles.bottomContainer} >
                    {this._renderViews()}
                    <View style={styles.line12Pix} />
                    {this._renderCancelView()}
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        top:0,
        width:kWindow.width,
        height:kWindow.height,
        backgroundColor:kModalBgColor,
        position: 'absolute',
        flexDirection: 'column-reverse',

    },text:{
        color:kTitleColor,fontSize:15,textAlign:'center'
    },btnContainer:{
        borderColor:'white',height: 51.5,width: kWindow.width,justifyContent: 'center',alignItems:'center'
    },line1Pix:{
        width:kWindow.width,height:1 / PixelRatio.get(),backgroundColor:kCuttingLineColor
    },line12Pix:{
        width:kWindow.width,height:12,backgroundColor:kBgColor
    },bottomContainer:{
        backgroundColor:'white'
    }
});

WSWeChatStyleView.defaultProps={
    para:{},
    data:['按钮一','按钮二'],
    textColor:kTitleColor,
    cancelColor:kTitleColor,
}

let singleton = null
export default class WSWeChatStyleViewTool extends Component {

    /***
     * 类方法
     */
    static share(){
        if (!singleton){
            singleton = new WSWeChatStyleViewTool();
        }
        return singleton;
    }

    constructor(props){
        super(props)
        this.state={
            modal:undefined
        }
    }

    show({para,action}){
        let modal = new ModalManager(<WSWeChatStyleView para={para} action={action} />);
        this.state.modal = modal
    }


    dismiss(){
        let  {modal} = this.state
        if (modal){
            modal.destroy()
        }
        this.state.modal = null
    }

}