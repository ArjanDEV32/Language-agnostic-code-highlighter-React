import React from "react"

let charList = {
  "+":1,"-":1,"*":1,"/":1,"(":1,")":1,"[":1,"]":1,"{":1,"}":1,"&":1,"^":1,"%":1,"$":1,"~":1,"\n":1,
  "`":1,"'":1,"!":1,"\"":1,";":1,",":1,".":1,"?":1,"<":1,">":1,":":1,'\\':1,"|":1,"=":1," ":1,"\t":1
}

// adds react span component with the given styles
function Add(code,res,rem,style){
  res.push(<span key={res.length}>{rem}</span>)
  res.push(<span style={style} key={res.length}>{code}</span>) 
}
// pattern matches two strings
function matchPattern(p, code, i){
  for(let j = 0; j<p.length && code[j+i]==p[j]; j++) if(j==p.length-1) return 1
  return 0
}

// checks if list of patterns is present in a given string
function matchPatterns(ends,code,i){
  for(const e of ends) if(matchPattern(e[0],code,i)) return e
  return -1
}

function findMatch(rng,code,i,){
  for(const r of rng) if(matchPattern(r.start[0],code,i)) return r
  return undefined
}

 // capture a range of chars in between two given tokens 
 function Range(code,rem,res,i,rng,tokenTable){
  let value, j = i, end, s = "", f = 0

  if((value=findMatch(rng,code,i))!=undefined) {
    Add(value.start[0],res,rem,value.style=="self"?value.start[1]:value.start[1]||value.style)
    i+=value.start[0].length,rem = ""
  }
  if(value==undefined) return [i,0]

  for(j = i; j<code.length; j++){
    if(value.patterns!=undefined){
      for(const p in value.patterns){
        if(matchPattern(p,code,j)){
          if(value.style=="self"){
            let c = parseCode(s,tokenTable)
            for(const e of c) res.push(<span key={res.length} style={e.props.style}>{e.props.children}</span>) 
          }else res.push(<span style={value.style} key={res.length}>{s}</span>)
          res.push(<span style={value.patterns[p]} key={res.length}>{p}</span>)
          s = "",j+=p.length
          continue
        }
      }
    }
    
    if(
    (value["/ranges/"]!=undefined && findMatch(value["/ranges/"],code,j)!=undefined) || 
    (value.end[0]!=value.start[0] && (f=matchPattern(value.start[0],code,j)==1))){
      if(value.style=="self"){
        let c = parseCode(s,tokenTable)
        for(const e of c) res.push(<span key={res.length} style={e.props.style}>{e.props.children}</span>) 
      }else res.push(<span style={value.style} key={res.length}>{s}</span>)
      let r = Range(code,rem,res,j,f?rng:value["/ranges/"],tokenTable)
      j = r[0], f = 0, s = ""
      if(r[1]) continue
    } 

    if((end=matchPatterns(value.end,code,j))!=-1){
      if(value.style=="self"){
        let c = parseCode(s,tokenTable)
        for(const e of c) res.push(<span key={res.length} style={e.props.style}>{e.props.children}</span>) 
      }else res.push(<span style={value.style} key={res.length}>{s}</span>)
      res.push(<span style={value.style=="self"?end[1]:end[1]||value.style} key={res.length}>{end[0]}</span>) 
      return [j+end[0].length-1,1]
    } else s+=code[j]
  }
  return [j,0]
}

/**
 * 
 * @returns {Array} An array of react span components.
 * @param {string} code src code.
 * @param {Object} tokenTable Object table containing the information to style the given source code.  
 */

export function parseCode(code, tokenTable, List){
  let res = [], token = "", noken = "", loken = "", rem = "", l = 0, x = 0, s
  if(List!=undefined) charList = List
  mainLoop: for(let i = 0; i<code.length; i++){
  
    // capture only chars that are not in the list 
    if(!charList[code[i]]) token+=code[i]
    if(tokenTable["/number/"]!=undefined && (code[i]=='.' || !charList[code[i]])) noken+=code[i]
    
    if((charList[code[i]] || i==code.length-1) && token!=""){
      if(i==code.length-1 && !charList[code[i]]) l = 1

       // capture token if it occurs after a given token 
      if(s!=undefined) Add(token,res,rem.slice(0,rem.length+l-token.length),s), rem = "", s = undefined, x = 1
      if(tokenTable["/after/"]!=undefined){
        if(tokenTable["/after/"].hasOwnProperty(token)) s = tokenTable["/after/"][token]
        if(tokenTable["/after/"].hasOwnProperty(code[i])) s = tokenTable["/after/"][code[i]]
      }

      // capture token if its a number
      if(noken!="" && !isNaN(noken) && code[i]!='.'){
        Add(noken,res,rem.slice(0,rem.length+l-noken.length),tokenTable["/number/"])
        rem = "",  x = 1, token = "" 
      }
      // capture token if its mentioned in the tokenTable
      if(tokenTable.hasOwnProperty(token)){
        Add(token,res,rem.slice(0,rem.length+l-token.length), tokenTable[token])
        rem = "",  x = 1, token = "" 
      }
      // capture token if it occurs before a given token 
      if(tokenTable["/before/"]!=undefined){
        if(tokenTable["/before/"].hasOwnProperty(code[i])) Add(token, res, rem.slice(0,rem.length+l-token.length),tokenTable["/before/"][code[i]]), rem = ""
        if(tokenTable["/before/"].hasOwnProperty(token))  Add(loken, res, rem.slice(0,rem.length+l-loken.length),tokenTable["/before/"][token]), rem = ""
      } 
       
      loken = token, token = "" 
      if(code[i]!='.') noken = ""
    } 
    
     // capture a range of chars in between two given tokens 
     if(tokenTable["/ranges/"]!=undefined){
      let r = Range(code,rem,res,i,tokenTable["/ranges/"],tokenTable) 
      i = r[0], rem = r[1]?"":rem  
      if(r[1]) continue  
    }
     
    // capture chars that are present in a given pattern 
    if(tokenTable["/patterns/"]!=undefined){
      for(const t in tokenTable["/patterns/"]){
        if(matchPattern(t,code,i)){
          Add(t,res,rem,tokenTable["/patterns/"][t])
          rem = "", token="",noken="",i+=t.length-1
          continue mainLoop
        }
      }
    }
    
    if(i==code.length-1 && x) continue
    if(i<=code.length-1) rem+=code[i]
    x = 0 
  }
  res.push(<span key={res.length}>{rem}</span>) 
  return res
}

