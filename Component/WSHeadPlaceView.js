/**
 * Copyright (c) 2019-present, WSJC, Inc.
 * Created by huangwujie on 2019/03/07
 *
 * Instructions  使用时引入文件  import {WSHeadPlaceView} from  '...'
 ```
     <WSHeadPlaceView click={(tag)=>{

     }} />
 ```
 */


import React,{Component} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    PixelRatio,
    FlatList
} from 'react-native'

import ProgramStyleSheet from 'react-native-program-stylesheet';
import {kWindow} from "./WSBaseComponent";
import {kCuttingLineColor,kTextAssistColor, kModalBgColor,kTitleColor,kTextInputPlaceholdColor,kColordf4f5f6,kHighlightColor,kBgColor,kColorf0f0f0} from "../WSStyles/WSStyles";
import {WSPlaceCell, WSPlaceCore} from "./WSPlaceCell";


export class WSHeadPlaceView extends Component{

    _renderItems=({item,index})=>{
        const {marginVertical,numColumns,mariginLeft} = this.props

        let width = (kWindow.width -  marginVertical*2 - mariginLeft*(numColumns+1)) / numColumns
        return (
                <TouchableOpacity
                    style={[{...styles.listItem},{width:width}]}
                    onPress={()=>{

                    }}
                >
                    <Text style={styles.listItemText} >{item}</Text>
                </TouchableOpacity>
        )
    }

    _renderHeader(){
       const {source,title,detalTitle,data,marginVertical} = this.props
       return (
            <View style={{width: this.getSize(kWindow.width-marginVertical*2)}} >
                <WSPlaceCore source={source} title={title} detalTitle={detalTitle} tag={0} click={this.props.click} />
            </View>
        )
    }


    _getSeperateLine(){
        return (<View style={{height: 10}} />)
    }


    _getFootView(){
        return (
            <View style={styles.footView} >
                <View style={styles.footline} />
            </View>
        )
    }

    render(){
        const {source,title,detalTitle,data,numColumns} = this.props
        return(
                <FlatList
                    style={{backgroundColor:'white'}}
                    renderItem={this._renderItems}
                    data={data}
                    numColumns={numColumns}
                    ListHeaderComponent={this._renderHeader()}
                    ItemSeparatorComponent={this._getSeperateLine}
                    ListFooterComponent={this._getFootView()}
                />
        )
    }

}

WSHeadPlaceView.defaultProps={
    // source:require('../Asset/ic_add_record@2x.png'),
    title:'深圳北站',
    detalTitle:'广东省深圳市宝安区致远中路',
    data:['A1出口','A2出口','A3出口','A4出口','A5出口','A6出口','A7出口'],
    marginVertical:ProgramStyleSheet.getSize(12),
    numColumns:3,
    mariginLeft:ProgramStyleSheet.getSize(10),
}


const styles = StyleSheet.create({
    titleText:{
        flex:1,fontSize:16,textAlign: 'center'
    },line:{
        height:1 / PixelRatio.get(),backgroundColor:kCuttingLineColor
    },btnContainer:{
        flex: 1,
        flexDirection: 'row',justifyContent: 'flex-start',alignItems:'center',backgroundColor:kHighlightColor
    },image:{
        marginLeft: 14
    },titlesContainer:{
        flex: 1,justifyContent: 'center',alignItems: 'flex-start',flexDirection: 'column',margin:14
    },title:{
        fontSize: 15,color:kTitleColor,textAlign: 'left'
    },detalTitle:{
        fontSize: 15,color:kTextInputPlaceholdColor,textAlign: 'left',marginTop: 6
    },container:{
        backgroundColor:kColordf4f5f6
    },lineWith1:{
        height: 32,width:1 / PixelRatio.get(),backgroundColor:kCuttingLineColor
    },twoCellContainer:{
        flexDirection:'row',width:kWindow.width-24,justifyContent:'center',alignItems:'center',backgroundColor:'white'
    },listItem:{
        marginLeft:10,height:30,
        justifyContent:'center',alignItems:'center',backgroundColor:kBgColor,borderRadius:2,borderColor:kColorf0f0f0,borderWidth:1
    },listItemText:{
        color:kTextAssistColor,fontSize:12
    },footView:{
        height: 16,justifyContent: 'flex-end'
    },footline:{
        height:1,backgroundColor:kCuttingLineColor
    }
});