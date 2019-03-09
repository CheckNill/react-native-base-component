import WSBaseComponent from "../WSBaseComponent";
import {TouchableWithoutFeedback,View,Image,Text} from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'
import LinearGradient from "react-native-linear-gradient";
import {
    kButtonDisabledColor,
    kButtonHighlightedColorA,
    kButtonHighlightedColorB,
    kButtonNormalColorA,
    kButtonNormalColorB,
    kClearColor
} from "../WSComponentStyle";


export default class WSButton extends WSBaseComponent{

    static defaultProps = {

        title:null,

        icon:null,

        iconSrc:null,

        iconStyle:null,

        rightIconSrc:null,

        rightIconStyle:null,

        style:{},

        textStyle:null,

        titleStyle:null,

        cornerRadius:0,

        borderWidth:0,

        borderColor:"",

        titleFont: 16,

        textAlign:'center',

        backgroundColor:null,

        backgroundColors:[kButtonNormalColorA,kButtonNormalColorB,kButtonNormalColorB],

        highlightedColor:null,

        highlightedColors:[kButtonHighlightedColorA,kButtonHighlightedColorB,kButtonNormalColorB],

        disabledColor:null,

        disabledColors:[kButtonDisabledColor],

        titleColor:"#FFFFFF",

        hightlightedTitleColor:"#FFFFEE",

        disabledTitleColor:"",

        disabled:false,

        clearBackgroundColor:false,

        onPress:()=>{},

        /**
         * Called as soon as the touchable element is pressed and invoked even before onPress.
         * This can be useful when making network requests.
         */
        onPressIn:()=>{},

        /**
         * Called as soon as the touch is released even before onPress.
         */
        onPressOut: ()=>{},

        onLongPress: ()=>{},

        /**
         * Delay in ms, from the start of the touch, before onPressIn is called.
         */
        delayPressIn: 0,

        /**
         * Delay in ms, from the release of the touch, before onPressOut is called.
         */
        delayPressOut: 0,

        /**
         * Delay in ms, from onPressIn, before onLongPress is called.
         */
        delayLongPress: 0,

    }

    static propTypes = {

        title:PropTypes.string,

        icon:PropTypes.element,

        iconSrc:PropTypes.string,

        iconStyle:PropTypes.any,

        rightIconSrc:PropTypes.string,

        rightIconStyle:PropTypes.any,

        style:PropTypes.any,

        cornerRadius:PropTypes.number,

        textStyle:PropTypes.any,

        titleStyle:PropTypes.any,

        textAlign: PropTypes.oneOf(['center','left','right','top','bottom','leftTop','leftBottom','rightTop','rightBottom']),

        titleFont: PropTypes.any,

        backgroundColor: PropTypes.string,

        backgroundColors: PropTypes.array,

        highlightedColor: PropTypes.string,

        highlightedColors: PropTypes.array,

        disabledColor: PropTypes.string,

        disabledColors: PropTypes.array,

        titleColor: PropTypes.string,

        hightlightedTitleColor: PropTypes.string,

        disabledTitleColor: PropTypes.string,

        disabled: PropTypes.bool,

        clearBackgroundColor: PropTypes.bool,

        onPress: PropTypes.func,

        /**
         * Called as soon as the touchable element is pressed and invoked even before onPress.
         * This can be useful when making network requests.
         */
        onPressIn: PropTypes.func,

        /**
         * Called as soon as the touch is released even before onPress.
         */
        onPressOut: PropTypes.func,

        /**
         * Long in ms,
         * */
        onLongPress: PropTypes.func,

        /**
         * Delay in ms, from the start of the touch, before onPressIn is called.
         */
        delayPressIn: PropTypes.number,

        /**
         * Delay in ms, from the release of the touch, before onPressOut is called.
         */
        delayPressOut: PropTypes.number,

        /**
         * Delay in ms, from onPressIn, before onLongPress is called.
         */
        delayLongPress: PropTypes.number,

    }

    constructor(props){

        super(props)

        this.state = {
            status:PropTypes.int = 1,//1normal 2tap 3disEnabled
        }

    }

    render(): React.ReactNode {

        let locations = [0,0.1,1]
        let backgroundColor = this.props.backgroundColor
        let backgroundColors = backgroundColor?[backgroundColor,backgroundColor,backgroundColor]:this.props.backgroundColors
        let titleColor = this.props.titleColor
        switch (this.state.status) {
            case 2:
                backgroundColor = this.props.highlightedColor
                backgroundColors = backgroundColor?[backgroundColor,backgroundColor,backgroundColor]:this.props.highlightedColors
                titleColor = this.props.hightlightedTitleColor
                break;
            case 3:
                backgroundColor = this.props.disabledColor
                backgroundColors = this.props.disabledColors
                titleColor = this.props.disabledTitleColor
                break;
        }
        if (this.props.clearBackgroundColor){
            backgroundColor = kClearColor
            backgroundColors = [kClearColor]
        }

        let verticalAlign = 'center'
        let horizonAlign = 'center'

        if (this.props.textAlign === 'center'){
            verticalAlign = "center"
            horizonAlign = "center"
        }
        else if (this.props.textAlign === 'left'){
            verticalAlign = "left"
            horizonAlign = "left"
        }
        else if (this.props.textAlign === 'right'){
            verticalAlign = "right"
            horizonAlign = "right"
        }
        else if (this.props.textAlign === 'top'){
            verticalAlign = "top"
            horizonAlign = "top"
        }
        else if (this.props.textAlign === 'bottom'){
            verticalAlign = "bottom"
            horizonAlign = "bottom"
        }
        else if (this.props.textAlign === 'leftTop'){
            verticalAlign = "top"
            horizonAlign = "left"

        }
        else if (this.props.textAlign === 'leftBottom'){
            verticalAlign = "bottom"
            horizonAlign = "left"
        }
        else if (this.props.textAlign === 'rightTop'){
            verticalAlign = "top"
            horizonAlign = "right"
        }
        else if (this.props.textAlign === 'rightBottom'){
            verticalAlign = "bottom"
            horizonAlign = "right"
        }

        return (
            <TouchableWithoutFeedback
                style={[{flex:1,flexDirection:'row', justifyContent:verticalAlign,alignItems:horizonAlign,backgroundColor:backgroundColor},this.props.style]}
                onPress={()=>{
                    this.props.onPress&&this.props.onPress()
                }}
                onPressIn={()=>{
                    this.setState({status:2})
                    this.props.onPressIn&&this.props.onPressIn()
                }}
                onPressOut={()=>{
                    setTimeout(()=>{
                        this.setState({status:1})
                    },100)
                    this.props.onPressOut&&this.props.onPressOut()
                }}
                onLongPress={()=>this.props.onLongPress()}
                disabled={this.props.disabled}
                underlayColor={this.props.highlightedColor}
            >
                <LinearGradient
                    style={[{alignItems:"center",justifyContent:'center'},this.props.style]}
                    colors={backgroundColors}
                    locations={locations}
                >
                    <View style={{flexDirection:'row'}}>
                        {this.props.iconSrc?<Image style={this.props.iconStyle} source={this.props.iconSrc}/>:null}
                        {this.props.icon?this.props.icon:null}
                        {this.props.title?<View style={{width:2.5}}/>:null}
                        {this.props.title?
                            <Text style={[{color:titleColor,fontSize:this.props.titleFont,textAlign:horizonAlign},this.props.titleStyle,this.props.textStyle]}>
                                {this.props.title}</Text>:null}
                        {this.props.title?<View style={{width:2.5}}/>:null}
                        {this.props.rightIconSrc?<Image style={this.props.rightIconStyle} source={this.props.rightIconSrc}/>:null}
                    </View>
                </LinearGradient>
            </TouchableWithoutFeedback>
        );

    }

}