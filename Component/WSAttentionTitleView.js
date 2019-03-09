import React, {Component} from "react";
import {Image, Text, TouchableOpacity, View} from 'react-native'
import {kColorfffadf, kAllertColor} from "./WSComponentStyle";
import ProgramStyleSheet from 'react-native-program-stylesheet';
import {kWindow} from "./WSBaseComponent";

export default class WSAttentionTitleView extends Component {


    render() {
        return (
            <TouchableOpacity disabled={this.props.isDisable} onPress={() => {
                if (this.props.clickView) {
                    this.props.clickView();
                }
            }}>
                <View style={{
                    height: this.props.height,
                    width: this.getSize(kWindow.width),
                    backgroundColor: this.props.backgroundColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    paddingRight: this.props.marginRight,
                    paddingLeft: this.props.marginRight
                }}>
                    <TouchableOpacity style={this.props.imageTouchStyle} onPress={() => {
                        if (this.props.clickLeft) {
                            this.props.clickLeft();
                        }
                    }}>
                        <Image style={this.props.imageStyle} source={this.props.sourceLeft}/>
                    </TouchableOpacity>
                    <Text style={this.props.titleStyle}>{this.props.title}</Text>
                    <TouchableOpacity style={this.props.imageTouchStyle} disabled={this.props.isDisableRight}
                                      onPress={() => {
                                          if (this.props.clickRight) {
                                              this.props.clickRight();
                                          }
                                      }}>
                        <Image style={this.props.imageStyle} source={this.props.sourceRight}/>
                    </TouchableOpacity>

                </View>
            </TouchableOpacity>
        )
    }
}


WSAttentionTitleView.defaultProps = {
    height: 32,
    backgroundColor: kColorfffadf,
    title: '',
    titleStyle: {
        backgroundColor: '#eee',
        fontSize: 14,
        color: kAllertColor,
        textAlign: 'center',
        flex: 1
    },
    isDisable: false,
    sourceLeft: require('../Asset/notification_bar_close.png'),
    isDisableRight: false,
    sourceRight: require('../Asset/notification_bar_next.png'),
    marginRight: 12,
    imageStyle: {
        height: 20,
        width: 20,
    },
    imageTouchStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,
        width: 32,
    },

}
