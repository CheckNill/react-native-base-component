
import React,{Component} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from  'react-native'

import ProgramStyleSheet from 'react-native-program-stylesheet';


export default class WSHomeItem extends Component{


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
                }} >
                    <Image style={this.props.imageStyle}
                    />
                    <Text style={this.props.titleStyle} >{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

}


WSHomeItem.defaultProps={
    height:ProgramStyleSheet.getSize(100),
    width:ProgramStyleSheet.getSize(100),
    backgroundColor:'gray',
    source:{},
    imageStyle:{
        height:ProgramStyleSheet.getSize(50),
        width:ProgramStyleSheet.getSize(50),
        marginBottom:ProgramStyleSheet.getSize(10),
    },
    title:'分享推荐',
    titleStyle:{
        fontSize:ProgramStyleSheet.getSize(18),
        color:'black',
        // textAlign: 'center'
    },

}
