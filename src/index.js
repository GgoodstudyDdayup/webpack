import _ from 'lodash'
import './style/index.css' // loader => css-loader module 要下载 and style-loader
import './style/a.scss'
function createDomElement(){
    let dom = document.createElement('div')
    dom.className = 'box'
    dom.innerHTML=_.join(['welcom','to','webpack'],'-')
    return dom
}
let divDom = createDomElement()
document.body.appendChild(divDom)