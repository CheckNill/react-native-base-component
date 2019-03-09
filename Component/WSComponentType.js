/**
 * @Author QiuHongyu
 * @copyright WSJC
 * */
import PropTypes from 'prop-types'

export type Dictionary = PropTypes.map

export type WSError = {
    status:PropTypes.bool,
    localizedDescription:PropTypes.string,
    code:PropTypes.int
}

export type nil = null //空指针,或者无意义的尾闭包参数，表述闭包函数参数结尾

export const DefaultBlock = ()=>{} //默认空代码块