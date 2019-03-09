import {StyleSheet} from "react-native"

//主色
export const kBgColor = '#F5F5F5'//背景颜色  淡灰色 (近白)
export const kMainColor = '#FE9949'//主色  橙色
export const kNaviColor = '#262D48'//导航栏颜色
export const kSuportAColor = '#208CF2'//辅色 A
export const kSuportBColor = '#59C999'//辅色 B
export const kAllertColor = '#EF5050'//警示色
export const kClearColor = 'transparent' // 透明颜色
export const kBlackColor = 'black' // 黑色
export const kModalBgColor = 'rgba(0,0,0,0.4)' // 黑色

// 按钮背景颜色
export const kButtonNormalColorA = '#FE9949'
export const kButtonNormalColorB = '#FE8934'
export const kButtonHighlightedColorA = 'rgba(254,153,73,0.9)'
export const kButtonHighlightedColorB = 'rgba(254,153,73,0.9)'
export const kButtonDisabledColor = 'rgba(254,153,73,0.4)'


// 字体颜色
export const kTitleColor = '#333333'
export const kTextMainColor = 'rgba(254,153,73,0.4)'
export const kTextAssistColor =  '#666666' //辅助信息 深灰色
export const kTextHighlightedColor = '#208CF2' //可点击状态 蓝色
export const kTextHighlightedColorA = '#208CD0'
export const kTextDescibeColor = '#222222' //描述信息颜色
export const kTextInputPlaceholdColor = '#999999'//输入框默认颜色

export const kMinorMessageColor  = '#999999' //次要信息 浅灰色 颜色编号 C
export const kHighlightColor  = '#ffffff' //反白字体 白色 颜色编号 D
export const kOrangeHighlightColor  = '#ff5500' //高亮字体 橙色 颜色编号 E
export const kRedHighlightColor  = '#eb2e2e' //高亮字体 红色 颜色编号 F
export const kCuttingLineColor  = '#ECECEC' // 分割线颜色
export const kCuttionLineHeight  = 1 // 分割线宽度

export const kColoreeeeee  = '#eeeeee'
export const kColorbbbbbb  = '#bbbbbb'
export const kColorfb5555  = '#fb5555'
export const kColorffe400  = '#ffe400'
export const kColorf2f2f2  = '#f2f2f2'
export const kColorf46432  = '#f46432'
export const kColorfffadf  = '#fffadf'
export const kColorffc7c7  = '#ffc7c7'
export const kColorf6f7fb  = '#f6f7fb'
export const kColorffa8a8  = '#ffa8a8'
export const kColorfdfcec  = '#fdfcec'
export const kColor007aff  = '#007aff'
export const kColorf0f0f0  = '#f0f0f0'
export const kColoradadad  = '#adadad'
export const kColorfff3dc  = '#fff3dc'
export const kColorfff950  = '#fff950'
export const kColord9d9d9  = '#d9d9d9'
export const kColordf4f4f4  = '#f4f4f4'
export const kColordf4f5f6  = '#f4f5f6'

export const kStaticFlatListMaxHeight = 1200

export const WSComponentStyle = StyleSheet.create({
    view: {
        flex:1,
        backgroundColor: kBgColor,
    },
    view0: {
        backgroundColor: kBgColor,
    },
    flatList: {
        backgroundColor: kBgColor,
        marginTop:12,
        marginLeft: 12,
        marginRight: 12,

    },
    segmentLineStyle: {
        backgroundColor:'#d9d9d9',
        height:StyleSheet.hairlineWidth,
        left:0,
        right:0,
        bottom:0,
    },
    textForAssistMessageColor:{
        fontSize:14,
        color:kTextAssistColor,
        justifyContent: 'center',
    },
    textForMainColor:{
        fontSize:16,
        color:kMainColor,
        justifyContent: 'center',
    },
    textForColor_51:{
        fontSize:14,
        color:kTextMainColor,
        justifyContent: 'center',
    },
    orangeTextStyle: {
        color:kOrangeHighlightColor,
    },
});