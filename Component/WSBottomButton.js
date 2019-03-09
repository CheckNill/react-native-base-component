import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Stylesheet,
    Alert,
} from "react-native";
import {kHighlightColor, kMainColor} from "./WSComponentStyle";


export class WSBottomButton extends React.Component{
    constructor(props){
        super(props)

    }
    static defaultProps = {
        title:'',
        titleColor:kHighlightColor,
        backgroundColor:kMainColor,
        onPress:undefined,
        titleFont:14,
        fontWeight:undefined,
        height:50,
    }

    render(){
        return (
            <TouchableOpacity style={{backgroundColor:this.props.backgroundColor,height:this.getSize(this.props.height),justifyContent:'center'}} onPress={()=>{
                if(this.props.onPress&&this.props.onPress!=undefined)this.props.onPress()}}>
                <Text style={{color:this.props.titleColor,alignSelf:'center',backgroundColor:this.props.backgroundColor,fontSize:this.getSize(this.props.titleFont),margin:0}}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        )
    }

}
