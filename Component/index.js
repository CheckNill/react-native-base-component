import {
    WSButton,
    WSInputCell,
    WSSegmentationLine,
    WSText,
    WSTextInput
} from './WSBaseView'

import WSAlertView, {
    WSAlertControlAction,
    WSAlertHeaderView,
    WSAlertViewImageHeaderView,
    WSAlertViewProgressHeaderView,
} from './WSAlertView'

import WSAniBtnLine from './WSAniBtnLine'
import WSAreaBtn from './WSAreaBtn'

import WSAreaShowTool, {WSAreaPickView} from './WSAreaPickView'

import WSAreaSelectedView, {WSAreaSelectedViewCell} from './WSAreaSelectedView'

import WSAttentionTitleView from './WSAttentionTitleView'

import WSBaseComponent from './WSBaseComponent'

import {WSBottomButton} from './WSBottomButton'
import {WSCardCell} from './WSCardCell'

import WSCarouselView from './WSCarouselView'
import WSCircleImage from './WSCircleImage'

import WSCircleProgressView from './WSCircleProgressView'

import {WSDataPickerView} from './WSDataPickerView'
import WSShowErrorTool, {WSErrorView} from './WSErrorView'
import {WSHeadPlaceView} from './WSHeadPlaceView'

import WSHomeItem from './WSHomeItem'
import WSImagePickerView from './WSImagePickerView'

import WSKeyboadView from './WSKeyboadView'
import WSMapView from './WSMapView'

import {WSPlaceCell, WSPlaceCore, WSTwoPlaceCell} from './WSPlaceCell'

import WSRippleAniView from './WSRippleAniView'
import WSRippleBtn from './WSRippleBtn'

import WSSearchBar from './WSSearchBar'
import WSSegmentView from './WSSegmentView'

import {WSSingleSelectView} from './WSSingleSelectView'
import WSUpdateCircle from './WSUpdateCircle'
import {WSUploadImageCell} from './WSUploadImageCell'

import WSWeChatStyleViewTool, {WSWeChatStyleView} from './WSWeChatStyleView'
import {WSWedge} from './WSWedge'

import {
    kBgColor,//'#F5F5F5',//背景颜色  淡灰色 (近白)
    kMainColor,//'#FE9949',//主色  橙色
    kNaviColor,//'#262D48',//导航栏颜色
    kSuportAColor,//'#208CF2',//辅色 A
    kSuportBColor,//'#59C999',//辅色 B
    kAllertColor,//'#EF5050',//警示色
    kClearColor,//'transparent' ,// 透明颜色
    kBlackColor,//'black' ,// 黑色
    kModalBgColor,//'rgba(0,0,0,0.4)' ,// 黑色

    // 按钮背景颜色
    kButtonNormalColorA,//'#FE9949'
    kButtonNormalColorB,//'#FE8934'
    kButtonHighlightedColorA,//'rgba(254,153,73,0.9)'
    kButtonHighlightedColorB,//'rgba(254,153,73,0.9)'
    kButtonDisabledColor,//'rgba(254,153,73,0.4)'


    // 字体颜色
    kTitleColor,//'#333333'
    kTextMainColor,//'rgba(254,153,73,0.4)'
    kTextAssistColor,// '#666666' ,//辅助信息 深灰色
    kTextHighlightedColor,//'#208CF2' ,//可点击状态 蓝色
    kTextHighlightedColorA,//'#208CD0'
    kTextDescibeColor,//'#222222' ,//描述信息颜色
    kTextInputPlaceholdColor,//'#999999',//输入框默认颜色

    kMinorMessageColor ,//'#999999' ,//次要信息 浅灰色 颜色编号 C
    kHighlightColor ,//'#ffffff' ,//反白字体 白色 颜色编号 D
    kOrangeHighlightColor ,//'#ff5500' ,//高亮字体 橙色 颜色编号 E
    kRedHighlightColor ,//'#eb2e2e' ,//高亮字体 红色 颜色编号 F
    kCuttingLineColor ,//'#ECECEC' ,// 分割线颜色
    kCuttionLineHeight ,//1 ,// 分割线宽度

    kColoreeeeee ,//'#eeeeee'
    kColorbbbbbb ,//'#bbbbbb'
    kColorfb5555 ,//'#fb5555'
    kColorffe400 ,//'#ffe400'
    kColorf2f2f2 ,//'#f2f2f2'
    kColorf46432 ,//'#f46432'
    kColorfffadf ,//'#fffadf'
    kColorffc7c7 ,//'#ffc7c7'
    kColorf6f7fb ,//'#f6f7fb'
    kColorffa8a8 ,//'#ffa8a8'
    kColorfdfcec ,//'#fdfcec'
    kColor007aff ,//'#007aff'
    kColorf0f0f0 ,//'#f0f0f0'
    kColoradadad ,//'#adadad'
    kColorfff3dc ,//'#fff3dc'
    kColorfff950 ,//'#fff950'
    kColord9d9d9 ,//'#d9d9d9'
    kColordf4f4f4 ,//'#f4f4f4'
    kColordf4f5f6 ,//'#f4f5f6'
    kStaticFlatListMaxHeight,//1200
    WSComponentStyle,
} from './WSComponentStyle'

import {
    Dictionary,
    WSError,
    nil
} from './WSComponentType'

export {
    WSButton,
    WSInputCell,
    WSSegmentationLine,
    WSText,
    WSTextInput,
    WSAlertControlAction,
    WSAlertHeaderView,
    WSAlertViewImageHeaderView,
    WSAlertViewProgressHeaderView,
    WSAlertView,
    WSAniBtnLine,
    WSAreaBtn,
    WSAreaShowTool,
    WSAreaPickView,
    WSAreaSelectedView,
    WSAreaSelectedViewCell,
    WSAttentionTitleView,
    WSBottomButton,
    WSCardCell,
    WSCarouselView,
    WSCircleImage,
    WSCircleProgressView,
    WSDataPickerView,
    WSShowErrorTool, WSErrorView,
    WSHeadPlaceView,
    WSHomeItem,
    WSImagePickerView,
    WSKeyboadView,
    WSMapView,
    WSPlaceCell,
    WSPlaceCore,
    WSTwoPlaceCell,
    WSRippleAniView,
    WSRippleBtn,
    WSSearchBar,
    WSSegmentView,
    WSSingleSelectView,
    WSUpdateCircle,
    WSUploadImageCell,
    WSWeChatStyleViewTool,
    WSWeChatStyleView,
    WSBaseComponent,

    kBgColor,//'#F5F5F5',//背景颜色  淡灰色 (近白)
    kMainColor,//'#FE9949',//主色  橙色
    kNaviColor,//'#262D48',//导航栏颜色
    kSuportAColor,//'#208CF2',//辅色 A
    kSuportBColor,//'#59C999',//辅色 B
    kAllertColor,//'#EF5050',//警示色
    kClearColor,//'transparent' ,// 透明颜色
    kBlackColor,//'black' ,// 黑色
    kModalBgColor,//'rgba(0,0,0,0.4)' ,// 黑色

    // 按钮背景颜色
    kButtonNormalColorA,//'#FE9949'
    kButtonNormalColorB,//'#FE8934'
    kButtonHighlightedColorA,//'rgba(254,153,73,0.9)'
    kButtonHighlightedColorB,//'rgba(254,153,73,0.9)'
    kButtonDisabledColor,//'rgba(254,153,73,0.4)'


    // 字体颜色
    kTitleColor,//'#333333'
    kTextMainColor,//'rgba(254,153,73,0.4)'
    kTextAssistColor,// '#666666' ,//辅助信息 深灰色
    kTextHighlightedColor,//'#208CF2' ,//可点击状态 蓝色
    kTextHighlightedColorA,//'#208CD0'
    kTextDescibeColor,//'#222222' ,//描述信息颜色
    kTextInputPlaceholdColor,//'#999999',//输入框默认颜色

    kMinorMessageColor ,//'#999999' ,//次要信息 浅灰色 颜色编号 C
    kHighlightColor ,//'#ffffff' ,//反白字体 白色 颜色编号 D
    kOrangeHighlightColor ,//'#ff5500' ,//高亮字体 橙色 颜色编号 E
    kRedHighlightColor ,//'#eb2e2e' ,//高亮字体 红色 颜色编号 F
    kCuttingLineColor ,//'#ECECEC' ,// 分割线颜色
    kCuttionLineHeight ,//1 ,// 分割线宽度

    kColoreeeeee ,//'#eeeeee'
    kColorbbbbbb ,//'#bbbbbb'
    kColorfb5555 ,//'#fb5555'
    kColorffe400 ,//'#ffe400'
    kColorf2f2f2 ,//'#f2f2f2'
    kColorf46432 ,//'#f46432'
    kColorfffadf ,//'#fffadf'
    kColorffc7c7 ,//'#ffc7c7'
    kColorf6f7fb ,//'#f6f7fb'
    kColorffa8a8 ,//'#ffa8a8'
    kColorfdfcec ,//'#fdfcec'
    kColor007aff ,//'#007aff'
    kColorf0f0f0 ,//'#f0f0f0'
    kColoradadad ,//'#adadad'
    kColorfff3dc ,//'#fff3dc'
    kColorfff950 ,//'#fff950'
    kColord9d9d9 ,//'#d9d9d9'
    kColordf4f4f4 ,//'#f4f4f4'
    kColordf4f5f6 ,//'#f4f5f6'
    kStaticFlatListMaxHeight,//1200
    WSComponentStyle,
    Dictionary,
    WSError,
    nil
}
