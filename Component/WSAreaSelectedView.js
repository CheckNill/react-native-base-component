import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Modal,
} from 'react-native'
import {kWindow} from "./WSBaseComponent";

export class WSAreaSelectedViewCell extends Component{

    _getCellView=(data)=>{
        return data.map((item,index)=>{
            return (
                <TouchableOpacity
                    style={this.props.btnContainer}
                    disabled={item===undefined || item===null}
                    onPress={()=>{
                        this.props.cellClick(item)
                    }}
                >
                    <View style={{flex:1,flexDirection:'row'}} >
                        <View style={{flex:1,flexDirection:'column'}} >
                            <View style={cellStyles.textContainer} >
                                <Text style={cellStyles.text} >{item}</Text>
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
        let data = this.props.data
        var views = this._getCellView(data)

        return (
            <View style={{flexDirection:'row'}} >
                {views}
            </View>
        )
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
    }
});

WSAreaSelectedViewCell.defaultProps={
    btnContainer:{
        width:kWindow.width/7,height:kWindow.width/7,backgroundColor:'gray'
    },lineHeight1:{
        height:1,backgroundColor:'white'
    },lineWidth1:{
        width:1,backgroundColor:'white'
    }
}

export default class WSAreaSelectedView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedItems:[],
            selectedItem:'',
        }
    }


    readArea= ({item, index})=>{
        return <WSAreaSelectedViewCell
                    data={item}
                    cellClick={this.props.click}
                    btnContainer={this.props.btnContainer}
                    lineHeight1={this.props.lineHeight1}
                    lineWidth1={this.props.lineWidth1}
                />
    }

    _listHeaderComponent=()=>{
        return (
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
            <Modal  animationType={'slide'} transparent={true} visible={this.props.modalVisible}>
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



WSAreaSelectedView.defaultProps={
    modalVisible:true,
    data:[
        ['粤','晋','继','晋','蒙','辽','吉',],
        ['京','晋','继','晋','蒙','辽','吉',],
        ['浙','晋','继','晋','蒙','辽','吉',],
        ['湘','晋','继','晋','蒙','辽','吉',]],
    btnContainer:{
        // width:kWindow.width/7,height:kWindow.width/7,backgroundColor:'gray',
        flex:1,aspectRatio:1,backgroundColor:'gray'

    },line:{
        height:0.5*2,backgroundColor:'gray',width:kWindow.width
    },lineHeight1:{
        height:1,backgroundColor:'white'
    },lineWidth1:{
        width:1,backgroundColor:'white'
    }
}