const firePixelsArray = []
const fireWidth = 41
const fireHeight = 40
let debug = false
let fireOrigin = 0
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

function start(){
    createFireDataStructure()
    createFireSource()

    //calculateFirePropagation()
    setInterval(calculateFirePropagation, 80)
}

function createFireDataStructure(){
    const numberOfPixels = fireWidth*fireHeight

    for(let i=0; i<numberOfPixels; i++){
        firePixelsArray[i] = 0
    }
}

function createFireSource(){
    const positionWidth = parseInt(fireWidth/2)
    const positionHeight = (4*(fireHeight/5))*fireWidth

    const pixelIndex = positionHeight - positionWidth - 1
    firePixelsArray[pixelIndex] = fireOrigin

    // console.log(`${positionWidth} - ${positionHeight} - ${pixelIndex}`)
}

function renderFire(){
    let html = '<table cellpadding=0 cellspacing=0>'

    for(let row=0; row<fireHeight; row++){
        html+='<tr>'
        for(let column=0; column<fireWidth; column++){
            const pixelIndex = column+(fireWidth*row)
            const fireIntensity = firePixelsArray[pixelIndex]
            const color = fireColorsPalette[fireIntensity]
            const colorString = `${color.r},${color.g},${color.b}`

            //console.log(`${pixelIndex} - ${fireIntensity}`)

            if(debug === true){
                html+='<td>'
                html+=`<div class=pixel-index>${pixelIndex}</div>`
                html+=fireIntensity
                html+='</td>'
            }else{
                html+=`<td class="pixel" style="background-color: rgb(${colorString})">`
                html+='</td>'
            }
        }
        html+='</tr>'
    }
    html+='</table>'

    document.querySelector('#fireCanvas').innerHTML = html
}

function changeWindDirection(value){
    sentido = value
}

function updateFireUp(currentPixelIndex){
    const bellowPixelIndex = currentPixelIndex + fireWidth

    const decay = (Math.floor(Math.random()*3))
    const bellowPixelFireIntensity = firePixelsArray[bellowPixelIndex]
    const newFireIntensity = bellowPixelFireIntensity-decay >= 0 ?bellowPixelFireIntensity-decay : 0

    firePixelsArray[currentPixelIndex] = newFireIntensity
//    console.log(`${currentPixelIndex} - ${firePixelsArray[currentPixelIndex]} - ${bellowPixelFireIntensity}`)
}

function updateFireLeft(currentPixelIndex){
    const bellowPixelIndex = currentPixelIndex + 1

    const decay = (Math.floor(Math.random()*4))+2
    const bellowPixelFireIntensity = firePixelsArray[bellowPixelIndex]
    const newFireIntensity = bellowPixelFireIntensity-decay >= 0 ?bellowPixelFireIntensity-decay : 0

    firePixelsArray[currentPixelIndex] = newFireIntensity
}

function updateFireDown(currentPixelIndex){
    const bellowPixelIndex = currentPixelIndex -fireWidth

    const decay = (Math.floor(Math.random()*3))+5
    const bellowPixelFireIntensity = firePixelsArray[bellowPixelIndex]
    const newFireIntensity = bellowPixelFireIntensity-decay >= 0 ?bellowPixelFireIntensity-decay : 0

    firePixelsArray[currentPixelIndex] = newFireIntensity
}

function updateFireRight(currentPixelIndex){
    const bellowPixelIndex = currentPixelIndex - 1

    const decay = (Math.floor(Math.random()*4))+2
    const bellowPixelFireIntensity = firePixelsArray[bellowPixelIndex]
    const newFireIntensity = bellowPixelFireIntensity-decay >= 0 ?bellowPixelFireIntensity-decay : 0

    firePixelsArray[currentPixelIndex] = newFireIntensity
}

function calculateFirePropagation() {
    const positionWidth = parseInt(fireWidth/2)
    const positionHeight = (4*(fireHeight/5))*fireWidth
    const pixelFireIndex = positionHeight - positionWidth - 1
    

    for (let column = 0; column < fireWidth; column++) {
        for (let row = 0; row < fireHeight; row++) {
            const pixelIndex = column + ( fireWidth * row )
    
            if(pixelIndex!=pixelFireIndex){
                if(pixelIndex<(positionHeight-fireWidth))
                    updateFireUp(pixelIndex)
                if((pixelIndex<pixelFireIndex) && (pixelIndex>=(positionHeight-fireWidth)))
                    updateFireLeft(pixelIndex)
                if(pixelIndex>=positionHeight)
                    updateFireDown(pixelIndex)
                if((pixelIndex>pixelFireIndex) && (pixelIndex<positionHeight)){
                    updateFireRight(positionHeight-((pixelIndex-positionWidth)-(positionHeight-fireWidth)))
                    // console.log(((pixelIndex-positionWidth)-(positionHeight-fireWidth)))
                }
            }

        }
    }
  
    renderFire()
}

function updateFireOrigin(){
    if(fireOrigin<36){
        fireOrigin++
        createFireSource()
    }

}

function degradeFireOrigin(){
    if(fireOrigin>0){
        fireOrigin--
        createFireSource()
    }
}

function minFireOrigin(){
    fireOrigin = 0;
    createFireSource()
}

function maxFireOrigin(){
    fireOrigin = 36
    createFireSource()
}

start()