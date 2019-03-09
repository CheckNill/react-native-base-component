
import React,{Component} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from  'react-native'

import ProgramStyleSheet from 'react-native-program-stylesheet';


export default class WSAreaBtn extends Component{


    render() {
        return (
            <TouchableOpacity
                onPress={()=>{
                    this.props.click()
                }}
            >
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height:this.props.height,
                    width:this.props.width,
                    backgroundColor:this.props.backgroundColor,
                    flexDirection:'row',
                    borderRadius:1,
                }} >
                    <Text style={this.props.titleStyle} >{this.props.title}</Text>
                    <Image style={this.props.imageStyle}
                        // source={this.props.source}
                        source={require('../Assets/pick_icon_slide.png')}
                    />
                </View>
            </TouchableOpacity>
        )
    }

}


WSAreaBtn.defaultProps={
    height:ProgramStyleSheet.getSize(30),
    width:ProgramStyleSheet.getSize(50),
    backgroundColor:'orange',
    source:{},
    imageStyle:{
        height:ProgramStyleSheet.getSize(30),
        width:ProgramStyleSheet.getSize(10),
        // backgroundColor:'red'
    },
    title:'粤',
    titleStyle:{
        fontSize:ProgramStyleSheet.getSize(18),
        color:'white',
        // textAlign: 'center'
    },

}
