import WSBaseComponent from "../WSBaseComponent";
import React from 'react'
import {Text} from 'react-native'
import {kClearColor, kTextAssistColor, kTitleColor} from "../WSComponentStyle";
import PropTypes from 'prop-types'

export default class WSText extends WSBaseComponent{

    constructor(props){
        super(props)
    }

    static defaultProps = {
        style : {},
        text : '',
        textStyle: "normal",
    }

    static propTypes = {
        style : PropTypes.any,
        text : PropTypes.string,
        textStyle: PropTypes.oneOf(["normal","support"])
    }

    render(): React.ReactNode {
        let textColor = kTitleColor
        if (this.props.textStyle === "support"){
            textColor = kTextAssistColor
        }
        return (
            <Text
                {...this.props}
                style={[{fontSize:this.getSize(15),color:textColor,backgroundColor:kClearColor},this.props.style]}
            >
                {this.props.text}
                {this.props.children}
            </Text>
        );
    }

}