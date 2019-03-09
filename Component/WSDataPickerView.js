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


export class WSDataPickerView extends Component{

    constructor(props) {
        super(props)
        this.state = {
            picker: undefined,
            show:true,
            selectedRow:[],
            selectedKey:[]
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
        return data.map((item,itemIndex)=>{
        let text = item
            return <Picker.Item key={text} label={text} value={text} />
        })
    }

    _getPickView(data,index){
        let {selectedKey,selectedRow} = this.state
        let defaultValue = data[0]
        let  selectedValue = selectedKey[index]?selectedKey[index]:defaultValue
        return (
            <Picker
                selectedValue={selectedValue}
                style={[{...styles.pickView},{backgroundColor:'white'}]}
                onValueChange={(itemValue, itemIndex) => {
                    let {selectedKey,selectedRow} = this.state
                    selectedKey[index] = itemValue
                    selectedRow[index]=itemIndex
                    this.setState({
                        selectedRow: selectedRow,
                        selectedKey:selectedKey
                    })
                }}
            >
                {this._renderPickItems(data,index)}
            </Picker>
        )
    }

    _getPickViews(){
        let { data,para} = this.props
        data = para.data?para.data:data
        let numberRows = data.length

        let mapData = []
        for (let i=0;i<numberRows;i++){
            mapData[i] = ''
        }

        let  picks = mapData.map((item,index)=>{
            return this._getPickView(data[index],index)
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

WSDataPickerView.defaultProps={
    para:{},
    //这种树状结构，可以直接使用
    data:[
        ['2月份','3月份','4月份'],
        ['1号','2号','3号','4号','5号','6号','7号','8号','9号',],
        ['1点','2点','3点','4点',],
        ['1分','2分','3分','4分',]
    ],
    title:'',
    pickerCancelBtnText:'取消',
    pickerConfirmBtnText:'确认',
    pickerConfirmBtnColor:kButtonNormalColorA,
    pickerCancelBtnColor: kTextAssistColor,
    titleTextColor:'black',
    pickerToolBarBg: 'white',
    pickerBg: 'white',

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
 *  onPickerSelect   cell选中时的回调  暂时可以不传
 *  onPickerConfirm  点击确认按钮时的回调
 *  onPickerCancel   点击取消按钮时的回调
 */
export default class WSDataPickerTool extends Component {
    /***
     * 类方法
     */
    static share(){
        if (!singleton){
            singleton = new WSDataPickerTool();
        }
        return singleton;
    }

    constructor(props){
        super(props)
        this.state={
            modal:undefined
        }
    }

    showDataPick({para,onPickerSelect,onPickerConfirm,onPickerCancel}){

        let modal = new ModalManager(<WSDataPickerView
        onPickerSelect={onPickerSelect}
        onPickerConfirm={onPickerConfirm}
        onPickerCancel={onPickerCancel}
        para={para}
        />);

        this.state.modal = modal
    }

    dismissDataPick(){
        let  {modal} = this.state
        if (modal){
            modal.destroy()
        }
        this.state.modal = null
    }

}