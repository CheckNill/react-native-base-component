/**
 * Copyright (c) 2019-present, WSJC, Inc.
 * Created by huangwujie on 2019/03/07
 *
 * 函数式编程，脱离RN生命周期，创建即显示  依赖 react-native-program-stylesheet 第三方库
 * Instructions  使用时引入文件  import WSAreaShowTool,{WSAreaPickView} from  '...'
 ```
     let onPickerSelect = (data)=>{

            }
     let onPickerConfirm = (data)=>{
                WSAreaShowTool.share().dismissAreaRow()
            }
     let onPickerCancel = ()=>{
                WSAreaShowTool.share().dismissAreaRow() //隐藏方法
            }
     let para = {}//参数  不传使用默认值

    WSAreaShowTool.share().showAreaRow({para,onPickerSelect,onPickerConfirm,onPickerCancel})//显示方法
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
    Image,
    Picker,
    PixelRatio
} from 'react-native'

import {kWindow} from "./WSBaseComponent";
import {
    kMinorMessageColor,
    kMainColor,
    kTextAssistColor,
    kBgColor,
    kModalBgColor,
    kButtonNormalColorA,
    kCuttingLineColor,
} from "./WSComponentStyle";
import ProgramStyleSheet from 'react-native-program-stylesheet';
import {Manager as ModalManager} from 'react-native-root-modal';


export class WSAreaPickView extends Component{

    constructor(props) {
        super(props)
        this.state = {
            picker: undefined,
            show:true,
            selectedRow:[0,0,0],
            selectedKey:[]
            // selectedKey:['a','a1','1']
        }
    }

    _getBar(){
        let {
            title,
            pickerCancelBtnText,
            pickerConfirmBtnText,
            pickerConfirmBtnColor,
            pickerCancelBtnColor,
            pickerToolBarBg,
            titleTextColor,
            para
        } = this.props

        title=para.title?para.title:title
        pickerCancelBtnText=para.pickerCancelBtnText?para.pickerCancelBtnText:pickerCancelBtnText
        pickerConfirmBtnText=para.pickerConfirmBtnText?para.pickerConfirmBtnText:pickerConfirmBtnText
        pickerConfirmBtnColor=para.pickerConfirmBtnColor?para.pickerConfirmBtnColor:pickerConfirmBtnColor
        pickerCancelBtnColor=para.pickerCancelBtnColor?para.pickerCancelBtnColor:pickerCancelBtnColor
        pickerToolBarBg=para.pickerToolBarBg?para.pickerToolBarBg:pickerToolBarBg
        titleTextColor=para.titleTextColor?para.titleTextColor:titleTextColor

        const {selectedKey} = this.state

        return (
            <View style={[{...styles.bar},{backgroundColor:pickerToolBarBg}]} >
                <TouchableOpacity onPress={this.props.onPickerCancel}>
                    <Text style={[{...styles.cancelText},{color:pickerCancelBtnColor}]} >{pickerCancelBtnText}</Text>
                </TouchableOpacity>

                <Text style={[{...styles.titleText},{color:titleTextColor}]} >{title}</Text>

                <TouchableOpacity onPress={()=>{
                    this.props.onPickerConfirm(selectedKey)
                }}>
                    <Text style={[{...styles.confirmText},{color:pickerConfirmBtnColor}]} >{pickerConfirmBtnText}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _renderPickItems=(data,index)=>{
        //获取对象所有的key值  Object.keys(data)  返回一个数组
        return data.map((item,itemIndex)=>{
            let text = Object.keys(item)[0] + ''//转字符串
             return <Picker.Item key={text} label={text} value={text} />
        })
    }


    _renderLastPickItems=(data2,index)=>{
        return data2.map((item,itemIndex)=>{
            let  text = item + ''//转字符串
            return <Picker.Item  label={text} value={text} />
        })
    }

    _getProvincePickViews(data,index){
        let {selectedRow,selectedKey} = this.state
            let defaultValue = Object.keys(data[0])[0]
            let  selectedValue = selectedKey[0]?selectedKey[0]:defaultValue
        return (
            <Picker
                selectedValue={selectedValue}
                style={[{...styles.pickView},{backgroundColor:'white'}]}
                onValueChange={(itemValue, itemIndex) => {
                    selectedRow[index] = itemIndex
                    selectedKey[index] = itemValue

                    //遍历设置下级别 所有的index 和value
                    let selectedInddex1 = 0
                    selectedRow[index+1] = selectedInddex1

                    let data1 = data[itemIndex][itemValue]
                    let key1 = Object.keys(data1[0])[0]
                    selectedKey[index+1] = key1


                    //获取所有的key 取第一个
                    let selectedInddex2 = 0
                    selectedRow[index+2] = selectedInddex2
                    let data2 = data1[selectedInddex1][key1]

                    let key2 = data2[0]
                    selectedKey[index+2] = key2

                    this.setState({
                        selectedRow: selectedRow,
                        selectedKey:selectedKey
                    })
                }}>
                {this._renderPickItems(data,index)}
            </Picker>
        )
    }

    _getCityPickView(data,index){
        let {selectedRow,selectedKey} = this.state
        let selectedIndex0 = selectedRow[0]  //获取第一级的选中 Index

        let defaultValue0 = Object.keys(data[0])[0]
        let  selectedValue0 = selectedKey[0]?selectedKey[0]:defaultValue0

        let data1 = data[selectedIndex0][selectedValue0]

        let defaultValue = Object.keys(data1[0])[0]
        let  selectedValue = selectedKey[1]?selectedKey[1]:defaultValue  //本级的选中值

        return  <Picker
            selectedValue={selectedValue}
            style={styles.pickView}
            onValueChange={(itemValue, itemIndex) => {
                selectedRow[index] = itemIndex
                selectedKey[index] = itemValue

                //遍历设置下级别 所有的index 和value
                let selectedInddex2 = 0
                selectedRow[index+1] = selectedInddex2
                let data2 = data1[itemIndex][itemValue]

                let key2 = data2[selectedInddex2]
                selectedKey[index+1] = key2

                this.setState({
                    selectedRow: selectedRow,
                    selectedKey:selectedKey
                })
            }}>
            {this._renderPickItems(data1,index)}
        </Picker>
    }


    _getCountySeatPickView(data,index){
        let {selectedRow,selectedKey} = this.state
        let selectedIndex0 = selectedRow[0]  //获取第一级的选中 Index
        let defaultValue0 = Object.keys(data[0])[0]
        let selectedValue0 = selectedKey[0]?selectedKey[0]:defaultValue0


        let data1 = data[selectedIndex0][selectedValue0]
        let selectedIndex1 = selectedRow[1]  //获取第二级的选中值
        let defaultValue1 = Object.keys(data1[0])[0]
        let selectedValue1 = selectedKey[1]?selectedKey[1]:defaultValue1


        let data2 = data1[selectedIndex1][selectedValue1]
        let defaultValue = data2[0]
        let  selectedValue = selectedKey[2]?selectedKey[2]:defaultValue  //获取本级的选中值

        return  <Picker
            selectedValue={selectedValue}
            style={styles.pickView}
            onValueChange={(itemValue, itemIndex) => {
                selectedRow[index] = itemIndex
                selectedKey[index] = itemValue
                this.setState({
                    selectedRow: selectedRow,
                    selectedKey:selectedKey
                })
            }}>
            {this._renderLastPickItems(data2,index)}
        </Picker>

    }

    _getPickViews(){
        let { data,numberRows,para} = this.props

        data = para.data?para.data:data
        numberRows = para.numberRows?para.numberRows:numberRows

        let mapData = []
        for (let i=0;i<numberRows;i++){
            mapData[i] = ''
        }

        let  picks = mapData.map((item,index)=>{

                if(index===0){
                    return this._getProvincePickViews(data,index)
                }else if(index===1){
                    return this._getCityPickView(data,index)
                }else{
                   return this._getCountySeatPickView(data,index)
                }
        })

        return (
            <View style={styles.pickContainer} >
                {picks}
            </View>

        )
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.bootonView} >
                    {this._getBar()}
                    <View style={styles.line} />
                    {this._getPickViews()}
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

    },pickContainer:{
        flexDirection: 'row',
        width:kWindow.width,
        height:215.5,
    },pickView:{
        flex:1,
        backgroundColor: 'white',
    }
    ,bootonView:{
        position: 'absolute',
        bottom:0,
        width:kWindow.width,
        height:264,
    },bar:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center'
    },cancelText:{
        marginLeft: 16,fontSize:16,textAlign:'left'
    },confirmText:{
        marginRight: 16,fontSize:16,textAlign: 'right'
    },titleText:{
        flex:1,fontSize:16,textAlign: 'center'
    },line:{
        width:kWindow.width,height:1 / PixelRatio.get(),backgroundColor:kCuttingLineColor
    }
});

WSAreaPickView.defaultProps={
    para:{},
    //这种树状结构，可以直接使用
    data:[
        {'湖 南':
                [
                    {
                        '长沙': ['雨花区', '某某区', '岳麓区', '市中心']
                    },
                    {
                        '益阳':  ['安化', '桃江', 'XXX', '市中心']
                    }
                 ]
        },
        {'广东':
                [
                    {
                        '深圳': ['宝安区', '福田区', '南山区', '罗湖区','龙岗区']
                    },
                    {
                        '广州':['雨花区', '某某区1', '某某区2', '市中心']
                    }
                 ]
        },
        {'四川':
                [
                    {
                        '成都': ['某某区', '岳麓区', '市中心']
                    },
                    {
                        'XX':['XX', 'XX', 'XXX', '市中心']
                    }
                ]
        },
        {'江苏':
                [
                    {
                        'XX': ['XX', '某某区', 'XX', ]
                    },
                    {
                        'XX':['XX', 'XX', 'XXX', '市中心']
                    }
                ]
        },
    ],
    title:'',
    pickerCancelBtnText:'取消',
    pickerConfirmBtnText:'确认',
    pickerConfirmBtnColor:kButtonNormalColorA,
    pickerCancelBtnColor: kTextAssistColor,
    titleTextColor:'black',
    pickerToolBarBg: 'white',
    pickerBg: 'white',
    numberRows:3,//并排row的个数
}

let singleton = null

/*
 *使用方法   导入头文件   WSAreaShowTool.share().showAreaRow({para(非必填),onPickerSelect,onPickerConfirm,onPickerCancel})
 *  para 参数  可包含
    data
    title:'',
    pickerCancelBtnText:'取消',
    pickerConfirmBtnText:'确认',
    pickerConfirmBtnColor:kButtonNormalColorA,
    pickerCancelBtnColor: kTextAssistColor,
    titleTextColor:'black'
    pickerToolBarBg: 'white',
    pickerBg: 'white',
    numberRows:3,//并排row的个数
 *  onPickerSelect   cell选中时的回调  暂时可以不传
 *  onPickerConfirm  点击确认按钮时的回调
 *  onPickerCancel   点击取消按钮时的回调
 */
export default class WSAreaShowTool extends Component {
    /***
     * 类方法
     */
    static share(){
        if (!singleton){
            singleton = new WSAreaShowTool();
        }
        return singleton;
    }

    constructor(props){
        super(props)
        this.state={
            modal:undefined
        }
    }

    showAreaRow({para,onPickerSelect,onPickerConfirm,onPickerCancel}){

        let modal = new ModalManager(<WSAreaPickView
            onPickerSelect={onPickerSelect}
            onPickerConfirm={onPickerConfirm}
            onPickerCancel={onPickerCancel}
            para={para}
        />);

        this.state.modal = modal
    }

    dismissAreaRow(){
        let  {modal} = this.state
        if (modal){
            modal.destroy()
        }
        this.state.modal = null
    }

}