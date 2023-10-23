//console.log(global) globalThis.console.log
//console.log(window) //en node no existe la variable global "windows"

//para exportar módulos se utiliza "module.exports = (nombre del módulo a exposrtar)"
// en EM6 LAS EXTENSIONES SON OBLIGATORIAS
import {sum} from './sum.mjs'

console.log(sum(1, 2))
