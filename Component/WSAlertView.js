//
//  WSAlertView.js
//  WSAlertView
//
//  Created by QiuHongyu on 2019/2/13.
//  Copyright © 2019 万顺叫车. All rights reserved.
//  Usage
//  render(){
//      return(
//      <View>
//        <WSAlertView ref={alertView => this.alertView = alertView}/>
//        /**在你的视图容器中创建alertView 并指定为 this.alertView **/
//      </View>
//      )
//  }
//  showAlertView(){
//      //简单的显示两个按钮的弹窗
//      this.alertView.alertTwoActionSample('dia','ddd','确定',()=>{
//             {**你要做的事情**}
//      })
//      //高级定义两个按钮的弹窗
//      let leftAction = new WSAlertControlAction('取消',()=>{
//             console.warn('quxiao')
//         })
//      let rightAction = new WSAlertControlAction('确定',()=>{
//             console.warn('queding')
//      })
//
//  }
import WSBaseComponent, {kWindow} from "./WSBaseComponent";
import PropTypes from 'prop-types'
import {Modal,StyleSheet,View,TouchableOpacity,Text,PixelRatio,Image} from 'react-native'
import React from 'react'
import {
    kCuttingLineColor,
    kHighlightColor,
    kTextHighlightedColor,
    kTextMainColor,
    kTitleColor,
    WSComponentStyle
} from "./WSComponentStyle";
import type {nil} from "./WSComponentType";

const kAlertWidth = 240
const kAlertActionHeight = 44
const kRadius = 8

export class WSAlertControlAction extends React.Component{

    title:PropTypes.string;

    action:()=>{};

    titleColor:PropTypes.color = kTitleColor;

    titleFont:PropTypes.font = 14;

    /**
     * 自定义的按钮style
     * */
    style = {};

    /**
     * 自定义的按钮文本style
     * */
    textStyle = {};

    constructor(title:PropTypes.string,action:()=>{}){

        super()

        this.title = title
        this.action = action

    }

}

export class WSAlertHeaderView extends WSBaseComponent{

    static propTypes = {
        contentAlignment:'center'

    }

    static defaultProps = {
        style:{},
        contentAlignment:'center'

    }

}

export class WSAlertViewImageHeaderView extends WSAlertHeaderView{

    constructor(props){
        super(props)

    }

    static propTypes = {
        image:Image
    }

    static defaultProps = {
        image:null,
    }

    render(): React.ReactNode {
        return (
            <View style={[{alignItems:this.props.contentAlignment},this.props.style]}>
                {this.props.image ? this.props.image : null}
            </View>
        );
    }

}

export class WSAlertViewProgressHeaderView extends WSAlertHeaderView{

    constructor(props){
        super(props)

    }

    static propTypes = {
        circleProgressView:PropTypes.element
    }

    static defaultProps = {
        circleProgressView:null,
    }

    render(): React.ReactNode {
        return (
            <View style={this.props.style}>
                {this.props.circleProgressView ? this.props.circleProgressView : null}
            </View>
        );
    }

}

export default class WSAlertView extends WSBaseComponent {

    static propTypes = {
        title: PropTypes.string,
        message: PropTypes.string,
        titleStyle: PropTypes.object,
        messageStyle: PropTypes.object,
        headerView: WSAlertHeaderView,
    }

    static defaultProps = {

        title : '',

        message : '',

        /**
         * StyleSheet style
         * */
        titleStyle: {},

        /**
         * StyleSheet style
         * */
        messageStyle : {},

        /**
         * HeaderView
         * */
        headerView: null,

    }

    constructor(props){
        super(props)
        this.state = {
            modalVisible: false,
            alertControlActions: [],
            alertButtons: [],
            animationType : PropTypes.oneOf(['none', 'slide', 'fade']),
        }

    }

    render(): React.ReactNode {

        //status 1 表示列表排列按钮 status 0 表示横排排列按钮
        let status = this.state.alertButtons.length===2 ? 0 : 1
        let actionsHeight = this.state.alertButtons.length*kAlertActionHeight
        if (status === 0){
            actionsHeight = kAlertActionHeight
        }

        return (
            /**模态视图容器，用于在当前界面弹出新的视图**/
            <Modal
                transparent={true}
                animationType={this.state.animationType}
                visible={this.state.modalVisible}
                onRequestClose={() => this.hide(false)}
            >
                /**背景容器**/
                <View style={modalStyle.container}>
                    /**弹窗**/
                    <View style={status===1?modalStyle.dialogContainer1:modalStyle.dialogContainer}>
                        /**头部视图**/
                        {
                            this.props.headerView ? this.props.headerView : null
                        }
                        /**标题**/
                        {this.state.title ?
                            <Text style={[modalStyle.dialogTitle, this.props.titleStyle]}>{this.state.title}</Text> : null
                        }
                        /**消息**/
                        {this.state.message ?
                            <Text style={[modalStyle.dialogPrompt, this.props.messageStyle]}>{this.state.message}</Text> : null
                        }
                        /**按钮容器**/
                        <View style={[status===1?modalStyle.actionsContainForOtherBtn:modalStyle.actionsContainForTwoBtn,{height:this.getSize(actionsHeight)}]}>
                            /**按钮集合**/
                            {this.state.alertButtons}
                            /**横排排列两个按钮时候的竖直线**/
                            {status===0?<View style={modalStyle.columnSegmentLine}></View>:null}
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    /**
     * 修改标题文本
     * */
    setTitle(title) {
        this.setState({
            title: title
        })
    }

    /**
     * 修改消息文本
     * */
    setMessage(message) {
        this.setState({
            message: message
        })
    }

    /**
     * 显示
     */
    show() {
        this.setState({
            animationType: "fade",
            modalVisible: true,
        })

        setTimeout(()=>{
            this.setState({
                animationType: "none",
            })
        },100)

    }

    /**
     * 隐藏
     */
    hide() {

        this.setState({
            animationType: "none",
            modalVisible: false,
        })

        setTimeout(()=>{
            this.setState({
                animationType: "fade",
            })
        },100)

    }

    /**
     * 弹出一个由左右两个按钮构成的弹窗
     * @param title String nullable
     * @param detail String nullable
     * @param leftControlAction WSAlertActions notnull
     * @param rightControlAction WSAlertControlAction notnull
     * */
    alert(title:PropTypes.string,message:PropTypes.string,leftControlAction:WSAlertControlAction,rightControlAction:WSAlertControlAction){
        this.alertWithActions(title,message,[leftControlAction,rightControlAction])
    }

    /**
     * 弹出一个由左右两个按钮构成的弹窗
     * @param title String nullable
     * @param detail String nullable
     * @param buttonTitle
     * @param (nil)=>{}
     * */
    alertTwoActionSample(title:PropTypes.string,message:PropTypes.string,buttonTitle:PropTypes.string,buttonAction:()=>{}) {
        let leftAction = new WSAlertControlAction('取消', null)
        let rightAction = new WSAlertControlAction('确定', buttonAction)
        rightAction.titleColor = kTextHighlightedColor
        this.alert(title,message,leftAction,rightAction)
    }

    /**
     * 弹出一个由按钮集合构成的弹窗
     * @param title String nullable
     * @param detail String nullable
     * @param alertActions WSAlertActions Array notnull
     * */
    alertWithActions(title:PropTypes.string, message:PropTypes.string, alertActions=[]){

        let alertButtons = []
        let actionWidth
        let status = alertActions.length === 2 ?0:1
        let actionHeight = kAlertActionHeight
        if (status === 1){
            actionWidth = kAlertWidth

        }
        else {
            actionWidth = kAlertWidth / 2.0
        }

        alertActions.map((child:WSAlertControlAction,index)=>{

            let btn =
                <View style={[WSComponentStyle.view,{marginTop:0,width:this.getSize(kAlertWidth),height:actionHeight,backgroundColor:'transparent'}]}>
                    <View style={{height:1 / PixelRatio.get(),backgroundColor:kCuttingLineColor}}></View>
                    <TouchableOpacity style={[{borderBottomLeftRadius:status===1?8:index===0?8:0,
                        borderBottomRightRadius:status===1?8:index===1?8:0,backgroundColor:'white',flex:1,flexDirection: 'row',justifyContent:'center',alignItems: 'center',width:this.getSize(actionWidth),height:this.getSize(kAlertActionHeight),},child.style]} onPress={()=>{
                        this.hide()
                        if (child.action){
                            child.action()
                        }
                    }}>
                        <Text style={[{color:child.titleColor,fontSize:this.getSize(child.titleFont)},child.textStyle]}>
                            {child.title}
                        </Text>
                    </TouchableOpacity>
                </View>
            alertButtons.push(btn)

        })
        this.setState({alertButtons:alertButtons,title:title,message:message})
        this.show()

    }

    /**
     * 弹出一个按钮没有点击事件的弹窗
     * @param title String nullable
     * @param detail String nullable
     * @param btnTitle String notnull
     * */
    alertOneActionSample(title:PropTypes.string,message:PropTypes.string,btnTitle){
        let tapAction = new WSAlertControlAction(btnTitle,null)
        tapAction.titleColor = kHighlightColor
        this.alertWithActions(title,message,[tapAction],'default')
    }

}

const modalStyle = StyleSheet.create({
    container: {
        width: kWindow.width,
        height: kWindow.height,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dialogContainer: {
        width:240,
        marginLeft:(kWindow.width-kAlertWidth)/2.0,
        borderTopLeftRadius:kRadius,
        borderTopRightRadius:kRadius,
        backgroundColor: 'white',
        alignItems:"center",
    },
    dialogContainer1:{
        width:240,
        marginLeft:(kWindow.width-kAlertWidth)/2.0,
        borderTopLeftRadius:kRadius,
        borderTopRightRadius:kRadius,
        borderBottomLeftRadius:kRadius,
        borderBottomRightRadius:kRadius,
        backgroundColor: 'white',
        alignItems:"center",
    },
    dialogTitle: {
        fontSize: 16,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'center',
        marginTop:15,
        marginBottom: -12,
        marginLeft:10,
        marginRight:10,
        fontWeight:'600',
        color: kTitleColor,
    },
    dialogPrompt: {
        fontSize: 14,
        marginTop: 16,
        marginBottom: 16,
        alignSelf: 'center',
        marginLeft:29,
        marginRight:29,
        fontWeight:'100',
        lineHeight:22,
        color: kTitleColor,
        textAlign:'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    dialogConfirmButtonText: {
        color: kTextHighlightedColor,
        fontSize: 16,
    },
    actionsContainForTwoBtn: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 0,
    },
    actionsContainForOtherBtn: {
        flex: 0,
    },
    columnSegmentLine: {
        width: 1 / PixelRatio.get(),
        position:'absolute',
        marginTop:5,
        height:kAlertActionHeight-10,
        marginLeft:kAlertWidth/2,
        backgroundColor:kCuttingLineColor,
    },

});