import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Image,
    PixelRatio
} from 'react-native'
import {kWindow} from "./WSBaseComponent";
import ProgramStyleSheet from 'react-native-program-stylesheet';


export class WSKeyboadViewCell extends Component{

    _getCellViews=(data)=>{
        return data.map((item,index)=>{
            return (
                <TouchableOpacity
                    style={this.props.btnContainer10}
                    disabled={item===undefined || item===null}
                    onPress={()=>{
                        this.props.cellClick(item)
                    }}
                >
                    <View style={{flex:1,flexDirection:'row'}} >
                        <View style={{flex:1,flexDirection:'column'}} >
                            <View style={styles.textContainer} >
                                <Text style={styles.text} >{item}</Text>
                            </View>
                            <View style={this.props.lineHeight1} />
                        </View>
                        <View style={this.props.lineWidth1} />
                    </View>
                </TouchableOpacity>
            )
        })
    }

    render() {
        const {data,index} = this.props
        var views = this._getCellViews(data)

        if (index===0){
            return (
                <View>
                    <View style={{flexDirection:'row'}} >
                        {views}
                    </View>
                    <View style={cellStyles.heightWhite10} />
                </View>
            )
        }else if(index<3){
            return (
                <View style={{flexDirection:'row'}} >
                    {views}
                </View>
            )
        }else{
            return (
                <View style={{flexDirection:'row'}} >
                    {views}
                    <TouchableOpacity
                        style={cellStyles.deletBtn}
                        onPress={()=>{
                            this.props.cellBtnClick()
                        }}
                    >
                        <View style={cellStyles.imgae} >
                            <Image style={cellStyles.imgae}
                                   resizeMode={"center"}
                            />
                            <View style={cellStyles.imgLine} />
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

const cellStyles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-end'
    },text:{
        color:'black'
    },headView:{
        height:50,backgroundColor:'white',justifyContent:'center',alignItems: 'flex-end'
    },done:{
        color:'black',marginRight: 20
    },flatList:{
        position:'absolute',bottom:0,left:0,right:0
    },textContainer:{
        flex: 1,backgroundColor:'gray',justifyContent:'center',alignItems: 'center'
    },heightWhite10:{
        height:10,backgroundColor:'white'
    },deletBtn:{
        flex:3,height:50,backgroundColor:'red'
    },imgae:{
        backgroundColor:'red',flex:1
    },imgLine:{
        height:2,backgroundColor:'white'
    }
});

WSKeyboadViewCell.defaultProps={
    btnContainer10:{
        // width:kWindow.width/10,height:50,backgroundColor:'gray'
        flex:1,height:ProgramStyleSheet.getSize(50),backgroundColor:'gray'
    },
    line:{
        height:1/PixelRatio.get(),backgroundColor:'gray',width:ProgramStyleSheet.getSize(kWindow.width)
    },
    index:0,
    lineHeight1:{
        height:1/PixelRatio.get(),backgroundColor:'white'
    },lineWidth1: {
        width: 1/PixelRatio.get(), backgroundColor: 'white'
    }
}



export default class WSKeyboadView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedItems:[],
            selectedItem:'',
        }
    }

    readArea= ({item, index})=>{

        return (
            <WSKeyboadViewCell
                data={item} index={index}
                cellClick={this.props.click}
                cellBtnClick={this.props.btnclick}
                lineHeight1={this.props.lineHeight1}
                lineWidth1={this.props.lineWidth1}
            />)
    }

    _listHeaderComponent=()=>{
       return(
           <View>
                <View style={this.props.line} />
                <View style={styles.headView} >
                    <TouchableOpacity
                        onPress={()=>{
                            //弹框消失
                            this.props.cancer()
                        }}
                    >
                        <Text style={styles.done} >确定</Text>
                    </TouchableOpacity>
                </View>
         </View>
       )
    }

    render() {
        return (
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={this.props.modalVisible}

            >
                <View style={styles.container}>
                    <FlatList
                        style={styles.flatList}
                        bounces = {false}
                        data = {this.props.data}
                        renderItem= {this.readArea}
                        ListHeaderComponent={
                           this._listHeaderComponent()
                        }
                    />

                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-end'
    },text:{
        color:'black'
    },headView:{
        height:50,backgroundColor:'white',justifyContent:'center',alignItems: 'flex-end'
    },done:{
        color:'black',marginRight: 20
    },flatList:{
        position:'absolute',bottom:0,left:0,right:0
    },textContainer:{
        flex: 1,backgroundColor:'gray',justifyContent:'center',alignItems: 'center'
    }
});

WSKeyboadView.defaultProps={
    modalVisible:true,
    data:[
        ['1','2','3','4','5','6','7','8','9','0',],
        ['A','B','C','D','E','F','G','H','J'],
        ['K','L','M','N','P','Q','R','S','T'],
        ['U','V','W','X','Y','Z',],
    ],
    line:{
        height:1/PixelRatio.get(),backgroundColor:'gray',width:ProgramStyleSheet.getSize(kWindow.width)
    },lineHeight1:{
        height:1/PixelRatio.get(),backgroundColor:'white'
    },lineWidth1: {
        width: 1/PixelRatio.get(), backgroundColor: 'white'
    }
}