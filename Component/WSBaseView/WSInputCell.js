import WSBaseComponent from "../WSBaseComponent";
import {TextInput,View,Text,StyleSheet,TouchableWithoutFeedback} from 'react-native'
import React from 'react'
import WSButton from "./WSButton";
import {
    kClearColor,
    kTextHighlightedColor,
    kTextHighlightedColorA,
    kTextInputPlaceholdColor
} from "../WSComponentStyle";
import StyleSheet375 from 'react-native-program-stylesheet'
import PropTypes from 'prop-types'
import WSText from "./WSText";
import WSTextInput from "./WSTextInput";
import WSSegmentationLine from "./WSSegmentationLine";


export default class WSInputCell extends WSBaseComponent{

    static defaultProps = {
        /**
         * PropTypes.oneOf(["Default","DefaultArrow","Input","InputArrow"]),
         * */
        cellStyle:"Default",
        style:{height:StyleSheet375.getSize(44)},
        titleStyle:{width:StyleSheet375.getSize(80)},
        title:null,
        subtitle:null,
        rightTitle:null,
        icon:null,
        rightElement:null,
        onPress:()=>{},
        key:PropTypes.int,
        placeholder:'',
        placeholderTextColor:kTextInputPlaceholdColor,
        inputText:'',
        inputTextStyle:{},
        detailText:'',
        detailTextStyle:{},
        rightButtonTitle:null,
        rightButtonTitleStyle:{color:'white',backgroundColor: kClearColor,fontSize: StyleSheet375.getSize(18)},
        rightButtonStyle:{},
        rightButtonBackgroundColor:kTextHighlightedColor,
        rightButtonHighlightedColor:kTextHighlightedColorA,
        rightButtonDisabled:false,
        rightIcon:null,
        rightIconStyle:{width: StyleSheet375.getSize(20),height:StyleSheet375.getSize(20),marginLeft:15,marginRight: StyleSheet375.getSize(12)},
        defaultArrowType:'none',//PropTypes.oneOf(["none",">","!","?"]),
        /**
         * Cell 顶部分割线
         * */
        topLine:null,
        /**
         * Cell 底部分割线
         * */
        bottomLine:<WSSegmentationLine/>,
        /**
         * 输入框文字改变的回调事件
         * */
        didChangeInputText:(text:PropTypes.string,nil)=>{},
        onChangeText:(text:PropTypes.string)=>{},
        /**
         * 点击右边箭头按钮的回调事件
         * */
        onPressRightArrowButton:()=>{},
        keyboardType:null,
        clearButtonMode: null,
        underlineColorAndroid:null,
        secureTextEntry: false,
        onPressCell:()=>{},
    }

    static propTypes = {
        key:PropTypes.int,
        cellStyle:PropTypes.oneOf(["Default","DefaultArrow","Input","InputArrow"]),
        style:PropTypes.any,
        title:PropTypes.string,
        titleStyle:PropTypes.any,
        placeholder:PropTypes.string,
        placeholderTextColor:PropTypes.string,
        inputText: PropTypes.string,
        inputTextStyle: PropTypes.any,
        rightIcon:PropTypes.image,
        rightIconStyle: PropTypes.any,
        rightButtonTitle:PropTypes.string,
        rightButtonTitleStyle: PropTypes.any,
        rightButtonStyle: PropTypes.any,
        rightButtonBackgroundColor: PropTypes.string,
        rightButtonHighlightedColor: PropTypes.string,
        rightButtonDisabled:PropTypes.bool,
        defaultArrowType:PropTypes.oneOf(["none",">","!","?"]),
        topLine:WSSegmentationLine,
        bottomLine:WSSegmentationLine,
        didChangeInputText:PropTypes.func,
        onChangeText:PropTypes.func,
        onPressRightArrowButton:PropTypes.func,
        keyboardType:PropTypes.string,
        clearButtonMode:PropTypes.string,
        underlineColorAndroid:PropTypes.any,
        onPressCell:PropTypes.func,
        detailText:PropTypes.string,
        detailTextStyle:PropTypes.any,
        secureTextEntry:PropTypes.bool,
        subtitle:null,
        rightTitle:null,
        icon:PropTypes.element,
        rightElement:PropTypes.element,
    }

    constructor(props){
        super(props)
        this.state = {
            text:this.props.inputText
        }

    }

    render(): React.ReactNode {
        let {topLine,bottomLine,rightButtonTitle,rightButtonTitleStyle,rightButtonStyle} = {...this.props}
        let arrowIcon = this.props.rightIcon
        let _rightButtonStyle = [{height:this.props.style.height,position: 'relative',marginLeft:0,marginRight: 0},rightButtonStyle]
        if (arrowIcon === null){
            if (this.props.defaultArrowType === '>'){
                arrowIcon = require('../../../Assets/icon/icon_arrow_right.png')
            }
        }
        if (rightButtonTitle){
            _rightButtonStyle = [{marginLeft:0,marginRight: StyleSheet375.getSize(30),height:StyleSheet375.getSize(34)},rightButtonStyle]
        }

        return (
            <TouchableWithoutFeedback onPress={()=>{
                this.props.onPress && this.props.onPress()
                this.props.onPressCell && this.props.onPressCell()
            }}>
                <View>
                    {topLine?topLine:null}
                    <View style={[{flexDirection: 'row',backgroundColor:'white',alignItems: 'center'},this.props.style]}>
                        {this.props.title ? <WSText style={[{marginLeft:this.getSize(12),textAlign:'left'},this.props.titleStyle]}>
                            {this.props.title}
                        </WSText> :null}
                        {this.props.placeholder||this.props.inputText||this.props.subtitle ?
                            <WSTextInput
                                style={[{flex: 1,marginLeft:this.getSize(16),marginRight: 10},this.props.inputTextStyle]}
                                placeholder={this.props.placeholder}
                                keyboardType={this.props.keyboardType}
                                clearButtonMode={this.props.clearButtonMode}
                                underlineColorAndroid={this.props.underlineColorAndroid}
                                secureTextEntry={this.props.secureTextEntry}
                                onChangeText={(text)=>{
                                    this.props.didChangeInputText&&this.props.didChangeInputText(text)
                                    this.props.onChangeText&&this.props.onChangeText(text)
                                    this.state.text = text
                                }}
                            />
                            :<WSText
                                text={this.props.detailText?this.props.detailText:this.props.subtitle}
                                textStyle={"support"}
                                style={[{flex: 1,marginLeft:this.getSize(16),marginRight: this.getSize(10)},this.props.detailTextStyle]}
                            />}
                        {this.props.rightTitle?<WSText
                            text={this.props.rightTitle}
                            textStyle={"support"}
                            style={[{flex: 1,marginLeft:this.getSize(16),marginRight: this.getSize(10)},this.props.detailTextStyle]}
                        />:null}
                        {this.props.rightElement?this.props.rightElement:null}
                        {arrowIcon||rightButtonTitle?<WSButton
                            title={rightButtonTitle}
                            textStyle={rightButtonTitleStyle}
                            iconSrc={arrowIcon}
                            iconStyle={this.props.rightIconStyle}
                            clearBackgroundColor={!(this.props.rightButtonTitle!=null)}
                            backgroundColor={this.props.rightButtonBackgroundColor}
                            highlightedColor={this.props.rightButtonHighlightedColor}
                            style={_rightButtonStyle}
                            onPress={this.props.onPressRightArrowButton}
                            disabled={this.props.rightButtonDisabled}
                        />:null}
                    </View>
                    {bottomLine?bottomLine:null}
                </View>
            </TouchableWithoutFeedback>
        );
    }


}