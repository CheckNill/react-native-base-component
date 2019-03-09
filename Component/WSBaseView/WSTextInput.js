import WSBaseComponent from "../WSBaseComponent";
import React from 'react'
import {TextInput} from "react-native"
import {kTextAssistColor, kTextInputPlaceholdColor} from "../WSComponentStyle";
import PropTypes from 'prop-types'

export default class WSTextInput extends WSBaseComponent{

    constructor(props){
        super(props)

    }

    static defaultProps = {
        placeholder:'' ,
        placeholderTextColor:kTextInputPlaceholdColor,
        textColor:kTextAssistColor,
        onChangeText:(text:PropTypes.string)=>{},
        keyboardType:null,
        clearButtonMode:"unless-editing",
        underlineColorAndroid:'transparent'

    }

    static propTypes = {
        placeholder:PropTypes.string,
        placeholderTextColor:PropTypes.color,
        textColor:PropTypes.color,
        onChangeText:PropTypes.func,
        keyboardType:PropTypes.string,
        clearButtonMode:PropTypes.string,
        underlineColorAndroid:PropTypes.any,

    }

    render(): React.ReactNode {
        return (
            <TextInput
                {...this.props}
                style={[{textAlign:'left',fontSize:this.getSize(15)},this.props.style]}
            />
        );
    }


}