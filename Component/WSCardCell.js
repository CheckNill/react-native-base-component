/**
 * Copyright (c) 2019-present, WSJC, Inc.
 * Created by huangwujie on 2019/03/07
 *

 * Instructions  使用时引入文件  import {WSCardCell} from  '...'
 ```
    <WSCardCell />
 ```
 */

import React,{Component} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity, StyleSheet, PixelRatio
} from 'react-native'

import ProgramStyleSheet from 'react-native-program-stylesheet';
import {kWindow} from "./WSBaseComponent";
import {kBgColor,kTitleColor,kTextAssistColor,kColordf4f5f6,kHighlightColor,kTextDescibeColor,kCuttingLineColor} from "./WSComponentStyle";


export class WSCardCell extends Component{

    _renderTitleView(timeDetail,title){
        return (
            <View style={styles.container} >
                <View style={styles.timeContainer} >
                    <Text style={styles.timeText} >{timeDetail}</Text>
                </View>
                <TouchableOpacity
                    onPress={()=>{

                    }}
                >
                    <View style={styles.cardContainer} >
                        <Text style={[{...styles.titleText},{marginBottom:20}]} >{title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    _renderTitleDescribeView(timeDetail,title,describeTitle){
        return (
            <View style={styles.container} >
                <View style={styles.timeContainer} >
                    <Text style={styles.timeText} >{timeDetail}</Text>
                </View>
                <TouchableOpacity
                    onPress={()=>{

                    }}
                 >
                    <View style={styles.cardContainer} >
                        <Text style={styles.titleText} >{title}</Text>
                        <Text style={styles.describeText} >{describeTitle}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    _renderTitleDescribeDetailView(timeDetail,title,describeTitle,detalTitle,source){
        return (
            <View style={styles.container} >
                <View style={styles.timeContainer} >
                    <Text style={styles.timeText} >{timeDetail}</Text>
                </View>
                <TouchableOpacity
                    onPress={()=>{

                    }}
                >
                    <View style={styles.cardContainer} >
                        <Text style={styles.titleText} >{title}</Text>
                        <Text style={[{...styles.describeText},{marginBottom:this.getSize(15.5)}]} >{describeTitle}</Text>
                        <View style={styles.line} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.detailView} >
                        <Text style={styles.detailText} >{detalTitle}</Text>
                        <Image  source={source} />
                    </View>
                </TouchableOpacity>
            </View>
            )
    }

    _renderTitleImageDescribeView(timeDetail,title,describeTitle,detalTitle,source,imgSource){
        return (
            <View style={styles.container} >
                <View style={styles.timeContainer} >
                    <Text style={styles.timeText} >{timeDetail}</Text>
                </View>
                <TouchableOpacity
                    onPress={()=>{

                    }}
                >
                        <View style={styles.cardContainer} >
                            <View style={styles.imgContainer} >
                                <Image  source={imgSource} resizeMode='center' />
                            </View>
                            <Text style={styles.titleText} >{title}</Text>
                            <Text style={[{...styles.describeText},{marginBottom:this.getSize(15.5)}]} >{describeTitle}</Text>
                            <View style={styles.line} />
                            <View style={styles.detailView} >
                                <Text style={styles.detailText} >{detalTitle}</Text>
                                <Image   source={source} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render(){
        let {title,describeTitle,detalTitle,timeDetail,type,source,imgSource} = this.props

        let views = undefined
        if (type===0){
            views = this._renderTitleView(timeDetail,title,describeTitle,detalTitle,source)
        } else if(type===1){
            views = this._renderTitleDescribeView(timeDetail,title,describeTitle,detalTitle,source)
        }else if(type===2){
            views = this._renderTitleDescribeDetailView(timeDetail,title,describeTitle,detalTitle,source)
        }else {
            views = this._renderTitleImageDescribeView(timeDetail,title,describeTitle,detalTitle,source,imgSource)
        }

        return(
            <View>
                {views}
            </View>
        )
    }
}



WSCardCell.defaultProps={
    title:'卡片标题',
    describeTitle:'内容描述内容描述内容描述内容描描述内容描述内容描述内容描述内容描述内容描述',
    detalTitle:'查看详情',
    timeDetail:'时间段',
    type:0 ,// 0 纯标题样式   1 标题 描述样式  2 标题、描述、查看详情样式  3、图片、标题、描述、查看详情样式
    source:require('../Assets/ic_ent.png'),
    imgSource:require('../Assets/ic_add_record.png')
}




const styles = StyleSheet.create({
    btnContainer:{
        width:kWindow.width,backgroundColor:kBgColor
    },timeContainer:{
        height:49,justifyContent:'center',alignItems:'center',
    },timeText:{
        fontSize:12,color:kTextAssistColor
    },cardContainer:{
        flex:1,marginHorizontal:12,justifyContent:'center',backgroundColor:'white'
    },titleText:{
        marginTop:20,marginBottom:12,marginHorizontal:20,textAlign:'left',color:kTextDescibeColor
    },describeText:{
        marginBottom:24,marginHorizontal:20,textAlign:'left',color:kTextAssistColor
    },container:{
        width:kWindow.width,backgroundColor:kBgColor
    },line:{
        height:1 / PixelRatio.get(),backgroundColor:kCuttingLineColor
    },detailView:{
        flexDirection:'row',flex:1,marginHorizontal:12,height:43.5,backgroundColor:'white',alignItems:'center',
    },detailText:{
        marginLeft:20,marginRight:6,color:kTitleColor,fontSize:12,textAlign:'left'
    },backImg:{
        height:6,width:4
    },imgContainer:{
        height:120,backgroundColor:'red',justifyContent:'center',alignItems:'center',
    }
});