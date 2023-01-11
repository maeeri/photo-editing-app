import React, { useEffect, useRef, useContext } from 'react'
import { fabric } from 'fabric'

const canvasContext = React.createContext('')

export const FabricJSCanvas = () => {

  return <canvas width="300" height="300" />
}
