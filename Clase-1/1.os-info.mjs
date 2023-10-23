import os from 'node:os'
function cocMem (mem){
    return(mem /1024/1024)
}

function cocTime (time){
    return(time /60/60)
}

console.log('información del sistema operativo:')
console.log('--------------------------')

console.log('Nombre del sistema operativo', os.platform())
console.log('Versión del sistema operativo', os.release())
console.log('Arquitectura', os.arch())
console.log('CPUs', os.cpus())
console.log('Memoria Libre', cocMem(os.freemem()), 'MB')
console.log('Memoria Total', cocMem(os.totalmem()), 'MB')
console.log('Uptime', cocTime(os.uptime()), 'hs')