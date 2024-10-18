import { createRoot } from 'react-dom/client'
import {useRef, useState, useEffect} from 'react'
import { parseCode } from '../ch'
import {lanList} from './codes'
import { DarkTheme, LightTheme, lanSvgList} from './svg'
import "./index.css"
   
function APP(){
  const [bg,setbg] = useState("rgb(35,31,49)")
  const [txtc,settxtc] = useState("rgb(215, 232, 250)")
  const [lan, setLan]  = useState(lanList[1])
  const theme = useRef("dark")
  const selected = useRef(1)
  const [sbc, setSBC] = useState({
    bg:"rgb(45,41,59)",buttons:{
      cbg:"rgb(55,51,79)",
      s:"rgb(35,31,59)",
      bg:Array.from({length: lanList.length},(e,i) => e = i==selected.current?"rgb(35,31,59)":"rgb(55,51,79)"),
      svg:"rgb(240,240,255)"
    }  
  })
  const [txt,settxt] = useState(parseCode(lan.code,lan.dark))
  const [style,setStyle] = useState(lan.dark)
  useEffect(()=>{settxt(parseCode(lan.code,style))},[style])

  
  function dark(t){
    setStyle(t),settxtc("rgb(215, 232, 250)"), setbg("rgb(35,31,49)"),theme.current="dark"
    setSBC({
      bg:"rgb(45,41,59)",buttons:{
        cbg:"rgb(55,51,79)",
        s:"rgb(35,31,59)",
        bg:Array.from({length: lanList.length},(e,i) => e = i==selected.current?"rgb(35,31,59)":"rgb(55,51,79)"),
        svg:"rgb(240,240,255)"
      }
    })
  }
  function light(t){
    setStyle(t),settxtc("rgb(15, 32, 90)"),setbg("rgb(245,241,255)"),theme.current="light", 
    setSBC({
      bg:"rgb(240,240,240)", buttons:{
        cbg:"rgb(220,220,220)",
        s:"rgb(190,190,190)",
        bg:Array.from({length: lanList.length},(e,i) => e = i==selected.current?"rgb(190,190,190)":"rgb(220,220,220)"),
        svg:"rgb(40,40,90)"
      }
    })
  }
  function changeLanButton(i,l){
    let n = []
    for(let i = 0; i<lanList.length; i++) n.push(sbc.buttons.cbg)
    n[i] = sbc.buttons.s
    theme.current=="dark" ? dark(l.dark) : light(l.light)
    setLan(lanList[i])
    selected.current = i
    sbc.buttons.bg = n
    setSBC(sbc)
  }
  function LanButtonList(){
    let list = []
    for(let i = 0; i<lanList.length; i++){  
      list.push(
        <div  key={i} onClick={()=>{changeLanButton(i,lanList[i])}} style={{marginInline:"auto", marginBlock:"5px",transition:"all 500ms", backgroundColor:sbc.buttons.bg[i] ,width:"33px",height:"33px",cursor:"pointer",color:"rgb(12,34,60)",borderRadius:"5px", }}>
          <div style={{color:sbc.buttons.svg}}>{lanSvgList[i]}</div>
        </div>
      )
    }
    return list
  }
  return(
    <div style={{display:"flex",justifyContent:"center",position:"absolute", left:"calc((100vw - (60vw + 45px)) / 2)", top:"calc((100vh - 80vh) / 2)"}}>
      <div style={{transition: "background-color 699ms",backgroundColor:sbc.bg, display:"block", width:"45px", borderRadius:"10px 0 0 10px"}}>
        <div onClick={()=>{light(lan.light)}} style={{marginInline:"auto", marginBlock:"5px",display:"flex", justifyContent:"center",alignItems:"center",transition:"all 500ms",width:"33px",height:"33px",backgroundColor:sbc.buttons.cbg, cursor:"pointer",color:sbc.buttons.svg, borderRadius:"5px"}}>
        <LightTheme/>
        </div>
        <div onClick={()=>{dark(lan.dark)}} style={{marginInline:"auto", marginBottom:"10px", display:"flex", justifyContent:"center",alignItems:"center", transition:"all 500ms",width:"33px",height:"33px",backgroundColor:sbc.buttons.cbg,cursor:"pointer",color:sbc.buttons.svg,borderRadius:"5px"}}>
          <DarkTheme/>
        </div>
        <LanButtonList/>
        </div>
      <div>
        <div className="CD-display" style={{
          backgroundColor:bg,
          color:txtc,
          wordBreak:"break-all",
          whiteSpace: "pre",
          height:"80vh",
          width:"60vw",
          fontSize:"13px",
          fontWeight:"200",
          fontFamily:"monospace",
        }}>{txt}</div>
      </div>
    </div>
  )
}

createRoot(document.getElementById('ch-example-root')).render(<APP/>)
