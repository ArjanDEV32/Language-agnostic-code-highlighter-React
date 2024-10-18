
const CPP = {
  code:`
  #include <iostream>
  #include <string>   
  #include <map>
  #include <vector>
  
  void reverse(std::string *s){
    char t = 0;
    int l = (*s).length()-1;
    for(int i  = 0, h = l/2 ; i<=h; i++){
      t = (*s)[i];
      (*s)[i] = (*s)[l-i];
      (*s)[l-i] = t;
    }
  }
      
  std::string add(std::string n1, std::string n2) {
    if(n1[0]=='0') return n2;
    if(n2[0]=='0') return n1;
    std::string res;
    for(int i = 0, n1b = 0, n2b = 0, n = 0, r = 0, f1 = 0, f2 = 0; n1b+n2b<2; i++){
      if(n1[i]=='\\0' && !n1b) n1b = 1;
      if(n2[i]=='\\0' && !n2b) n2b = 1;
      if(!n1b) n+= n1[(n1.length()-1)-i] - 48;
      if(!n2b) n+= n2[(n2.length()-1)-i] - 48;
      if(n>=10) r = n/10, n%=10;
      if(n1b+n2b<2 || n>0)res+= (n + 48);
      n = 0, n +=r, r = 0;
    }
    reverse(&res);
    return res;
  } 
  
  std::string mul(std::string n1, std::string n2){
    std::string res = "0", max, min, n, f, s;
    max = n1.length()>=n2.length() ? n1 : n2;
    min = n1.length()>=n2.length() ? n2 : n1;
    int maxl = max.length()-1, minl = min.length()-1; 
    for(int i = 0; i<min.length(); i++){
      for(int j = 0, p = 1, r = 0; j<max.length(); j++){
        p = r + (max[maxl-j]-48)*(min[minl-i]-48);
        r = 0;
        if(max[j+1]!='\\0') r = p/10, p%=10;
        s = std::to_string(p), reverse(&s),n+= s;
      }
      reverse(&n);
      if(i>0) f+="0", n+=f;
      res = add(res,n);
      n = "";
    }
    return res;
  }


  `,
  dark:{  
    "std":{color:"rgb(90,90,220)"},
    "return":{color:"rgb(225,135,245)"},
    "if":{color:"rgb(225,135,245)"},
    "switch":{color:"rgb(225,135,245)"},
    "default":{color:"rgb(225,135,245)"},
    "case":{color:"rgb(220,155,245)"},
    "while":{color:"rgb(225,135,245)"},
    "for":{color:"rgb(225,135,245)"},
    "else":{color:"rgb(225,135,245)"},
    "break":{color:"rgb(225,135,245)"},
    "const":{color:"rgb(100,180,250)"},
    "int":{color:"rgb(100,180,250)"},
    "char":{color:"rgb(100,180,250)"},
    "void":{color:"rgb(100,180,250)"},
    "/patterns/":{
      "+" : {color:"white"},
      "=" : {color:"white"},
      "&" : {color:"white"},
      ";" : {color:"white"},
      "?" : {color:"white"},
      "/" : {color:"white"},
      "*" : {color:"white"},
      "{" : {color:"rgb(100,180,250)"},
      "}" : {color:"rgb(100,180,250)"},
      "(" : {color:"rgb(100,180,250)"},
      ")" : {color:"rgb(100,180,250)"},
      "[" : {color:"rgb(100,180,250)"},
      "]" : {color:"rgb(100,180,250)"},
    },
    "/after/":{
      "std":{color:"rgb(100,180,250)"}
    },
    "/number/":{color:"#aef2ae"},
    "/before/":{"(": {color:"rgb(220,220,100)",fontWeight:"900"}},
    "/ranges/":[
      {start:["#include",{color:"rgb(225,135,245)"}], end:[["\n"]], style:{color:"#fa9866"}},
      {start:[`"`], end:[[`"`]], style:{color:"#fa9866"}},
      {start:[`'`], end:[[`'`]], style:{color:"#fa9866"}},  
    ],
  },
  light: { 
    "return":{color:"rgb(190,40,190)"},
    "if":{color:"rgb(190,40,190)"},
    "for":{color:"rgb(190,40,190)"},
    "break":{color:"rgb(190,40,190)"},
    "string":{color:"rgb(190,40,190)"},
    "int":{color:"rgb(140,30,255)"},
    "char":{color:"rgb(140,30,255)"},
    "void":{color:"rgb(140,30,255)"},
    "/patterns/":{
      "std::":{color:"rgb(90,90,220)"},
      "+" : {color:"black"},
      "=" : {color:"black"},
      "&" : {color:"black"},
      ";" : {color:"black"},
      "?" : {color:"black"},
      "/" : {color:"black"},
      "*" : {color:"black"},
      "{" : {color:"rgb(50,58,150)"},
      "}" : {color:"rgb(50,58,150)"},
      "(" : {color:"rgb(50,58,150)"},
      ")" : {color:"rgb(50,58,150)"},
      "[" : {color:"rgb(50,58,150)"},
      "]" : {color:"rgb(50,58,150)"},
    },
    "/number/":{color:"rgb(30,100,250)"},
    "/before/":{"(": {color:"rgb(200,30,120)",fontWeight:"900"}},
    "/ranges/":[
      {start:["#include",{color:"rgb(190,40,190)"}], end:[["\n"]], style:{color:"#fa9866"}},
      {start:[`"`], end:[[`"`]], style:{color:"#fa9866"}},
      {start:[`'`], end:[[`'`]], style:{color:"#fa9866"}},
    ],
  },
}

const JS = {
code:`
const fs = require("fs")
const http = require("http")
const ws = require("ws")
const wss =	new ws.Server({port:4000}) 
const Clients = {}

// This is a comment
/* This is also a comment */ 

function getFiles(dirName){
  let files = {}
  let name = "", key = ""  
  let dir = fs.readdirSync(dirName)
  for(const file of dir){
    name = \`\${dirName\}/\${file}\`
    key = \`/\${file}\`
    if(file.split(".")[1]=="html") key = "html"  
    files[key] = name 
  } 
  return files
}

try {

  let Ufiles = getFiles(\`$\{process.cwd()}/U\`)
  let fileStream
  let html

  http.createServer(function (req, res) {  
    if(req.url=="/"){ 
      html = fs.readFileSync(Ufiles.html,"utf-8")
      res.writeHead(200, {"Content-Type": "text/html"})
      res.end(html)
    }
    if(Ufiles[req.url]!=undefined){    
      res.writeHead(200, {"Content-Type": \`text/$\{Ufiles[req.url].split(".")[1]}\`})
      fileStream = fs.createReadStream(Ufiles[req.url], "UTF-8");
      fileStream.pipe(res);
    }
  }).listen(8080,()=>{console.log("U1: http://localhost:8080/")})


  http.createServer(function (req, res) {  
    if(req.url=="/"){ 
      html = fs.readFileSync(Ufiles.html,"utf-8")
      res.writeHead(200, {"Content-Type": "text/html"})
      res.end(html)
    }
    if(Ufiles[req.url]!=undefined){     
      res.writeHead(200, {"Content-Type": \`text/$\{Ufiles[req.url].split(".")[1]}\`})
      fileStream = fs.createReadStream(Ufiles[req.url], "UTF-8");
      fileStream.pipe(res);
    }
  }).listen(5000, ()=>{console.log("U2: http://localhost:5000/")})

  wss.on("connection",(con, req)=>{
    if(Clients[req.headers["sec-websocket-key"]]==undefined) Clients[req.headers["sec-websocket-key"]] = con
    con.on("message",(msg)=>{
      for(const client in Clients) if(client!=req.headers["sec-websocket-key"]) Clients[client].send(msg.toString())
    })    
  })

  
} catch(err){console.log(err), process.exit(1)}
 `,
dark:{  
  "try":{color:"rgb(225,135,245)"},
  "new":{color:"rgb(225,135,245)"},
  "catch":{color:"rgb(225,135,245)"},
  "return":{color:"rgb(225,135,245)"},
  "if":{color:"rgb(225,135,245)"},
  "switch":{color:"rgb(225,135,245)"},
  "default":{color:"rgb(225,135,245)"},
  "case":{color:"rgb(220,155,245)"},
  "while":{color:"rgb(225,135,245)"},
  "for":{color:"rgb(225,135,245)"},
  "else":{color:"rgb(225,135,245)"},
  "break":{color:"rgb(225,135,245)"},
  "let":{color:"rgb(100,180,250)"},
  "const":{color:"rgb(100,180,250)"},
  "of":{color:"rgb(100,180,250)"},
  "in":{color:"rgb(100,180,250)"},
  "function":{color:"rgb(100,180,250)"},
  "undefined":{color:"rgb(100,180,250)"},
  "/number/":{color:"#aef2ae"},
  "/before/":{"(": {color:"rgb(220,220,100)",fontWeight:"900"}},
  "/after/":{
    "const":{color:"rgb(100,210,250)"},
  },
  "/patterns/":{
    "=>": {color:"rgb(100,180,250)"},
    "+" : {color:"white"},
    "=" : {color:"white"},
    "&" : {color:"white"},
    ";" : {color:"white"},
    "{" : {color:"rgb(100,180,250)"},
    "}" : {color:"rgb(100,180,250)"},
    "(" : {color:"rgb(100,180,250)"},
    ")" : {color:"rgb(100,180,250)"},
    "[" : {color:"rgb(100,180,250)"},
    "]" : {color:"rgb(100,180,250)"},
  },
  "/ranges/":[
    {start:['"'], end:[['"']], style:{color:"#fa9866"} , patterns:{ 
      '\\"':{color:"rgb(255, 214, 99)"},        
    }},
    {start:["`"], end:[["`"]], style:{color:"#fa9866"}, "/ranges/":[
      {start:["${",{color:"rgb(90,100,250)"}], end:[["}",{color:"rgb(90,100,250)"}]], style:"self", "/ranges/":[
        {start:["{",{color:"rgb(100,180,250)"}], end:[["}",{color:"rgb(100,180,250)"}]], style:"self"}
      ]}
    ]},
    {start:["/*"], end:[["*/"]], style:{color:"rgb(180,240,190)"}},
    {start:["//"], end:[["\n"]], style:{color:"rgb(180,240,190)"}},
  ],
},


light: { 
  "new":{color:"rgb(190,40,190)"},
  "return":{color:"rgb(190,40,190)"},
  "if":{color:"rgb(190,40,190)"},
  "switch":{color:"rgb(190,40,190)"},
  "default":{color:"rgb(190,40,190)"},
  "for":{color:"rgb(190,40,190)"},
  "while":{color:"rgb(190,40,190)"},
  "break":{color:"rgb(190,40,190)"},
  "let":{color:"rgb(90,90,220)"},
  "const":{color:"rgb(90,90,220)"},
  "of":{color:"rgb(90,90,220)"},
  "in":{color:"rgb(90,90,220)"},
  "function":{color:"rgb(90,90,220)"},
  "undefined":{color:"rgb(90,90,220)"},
  "/patterns/":{
    "=>": {color:"rgb(200,30,90)"},
    "+" : {color:"black"},
    "=" : {color:"black"},
    "&" : {color:"black"},
    ";" : {color:"black"},
    "{" : {color:"rgb(50,58,150)"},
    "}" : {color:"rgb(50,58,150)"},
    "(" : {color:"rgb(50,58,150)"},
    ")" : {color:"rgb(50,58,150)"},
    "[" : {color:"rgb(50,58,150)"},
    "]" : {color:"rgb(50,58,150)"},
  },
  "/number/":{color:"rgb(30,100,250)"},
  "/before/":{"(": {color:"rgb(200,30,90)",fontWeight:"900"},},
  "/after/":{
    "const":{color:"rgb(10,120,160)"},
  },
  "/ranges/":[
    {start:['"'], end:[['"']], style:{color:"#fa9866"} , patterns:{ 
      "\\\"":{color:"rgb(255, 214, 99)"},        
    }},
    {start:["`"], end:[["`"]], style:{color:"#fa9866"}, "/ranges/":[
      {start:["${",{color:"rgb(90,100,250)"}], end:[["}",{color:"rgb(90,100,250)"}]], style:"self", "/ranges/":[
        {start:["{",{color:"rgb(100,180,250)"}], end:[["}",{color:"rgb(100,180,250)"}]], style:"self"}
      ]}
    ]},
    {start:["/*"], end:[["*/"]], style:{color:"rgb(80,140,90)"}},
    {start:["//"], end:[["\n"]], style:{color:"rgb(80,140,90)"}},
  ],
},
}

const PY = {
code:`
from __future__ import annotations

class Node:
    def __init__(self, data: int) -> None:
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def insert(self, new_data: int) -> None:
        new_node = Node(new_data)
        new_node.next = self.head
        self.head = new_node

    def printLL(self) -> None:
        temp = self.head
        if temp == None:
            return 'Linked List is empty'
        while temp.next:
            print(temp.data, '->', end='')
            temp = temp.next
        print(temp.data)
        return

# Merge two sorted linked lists
def merge(left, right):
    if not left:
        return right
    if not right:
        return left

    if left.data < right.data:
        result = left
        result.next = merge(left.next, right)
    else:
        result = right
        result.next = merge(left, right.next)

    return result

# Merge sort for linked list
def merge_sort(head):
    if not head or not head.next:
        return head

    # Find the middle of the list
    slow = head
    fast = head.next
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    left = head
    right = slow.next
    slow.next = None

    left = merge_sort(left)
    right = merge_sort(right)

    return merge(left, right)

if __name__ == "__main__":
    ll = LinkedList()
    print("Enter the space-separated values of numbers to be inserted in the linked list prompted below:")
    arr = list(map(int, input().split()))
    for num in arr:
        ll.insert(num)

    print("Linked list before sorting:")
    ll.printLL()

    ll.head = merge_sort(ll.head)

    print('Linked list after sorting:')
    ll.printLL()
`,
dark:{  
  "def":{color:"rgb(100,180,250)"},
  "self":{color:"rgb(225,135,245)"},
  "in":{color:"rgb(100,180,250)"},
  "class":{color:"rgb(225,135,245)"},
  "return":{color:"rgb(225,135,245)"},
  "from":{color:"rgb(225,135,245)"},
  "import":{color:"rgb(225,135,245)"},
  "if":{color:"rgb(225,135,245)"},
  "switch":{color:"rgb(225,135,245)"},
  "default":{color:"rgb(225,135,245)"},
  "case":{color:"rgb(220,155,245)"},
  "while":{color:"rgb(225,135,245)"},
  "for":{color:"rgb(225,135,245)"},
  "else":{color:"rgb(225,135,245)"},
  "elif":{color:"rgb(225,135,245)"},
  "break":{color:"rgb(225,135,245)"},
  "const":{color:"rgb(100,180,250)"},
  "/patterns/":{
    "(" : {color:"rgb(100,180,250)"},
    ")" : {color:"rgb(100,180,250)"},
    "[" : {color:"rgb(100,180,250)"},
    "]" : {color:"rgb(100,180,250)"},
    "+" : {color:"white"},
    "=" : {color:"white"},
    "&" : {color:"white"},
    "->":{color:"rgb(100,180,250)"},
  },
  "/number/":{color:"#aef2ae"},
  "/before/":{"(": {color:"rgb(220,220,100)",fontWeight:"900"}},
  "/after/":{
    "from":{color:"rgb(50,180,250)"},
    "class":{color:"rgb(50,180,250)"},
  },
  "/ranges/":[
    {start:[`"`], end:[[`"`]], style:{color:"#fa9866"}},
    {start:[`'`], end:[[`'`]], style:{color:"#fa9866"}},
    {start:["#"], end:[["\n"]], style:{color:"rgb(180,240,190)"}}
  ],
},
light: { 
  "self":{color:"rgb(190,40,190)"},
  "class":{color:"rgb(190,40,190)"},
  "from":{color:"rgb(190,40,190)"},
  "import":{color:"rgb(190,40,190)"},
  "return":{color:"rgb(190,40,190)"},
  "def":{color:"rgb(90,90,220)"},
  "in":{color:"rgb(90,90,220)"},
  "if":{color:"rgb(190,40,190)"},
  "elif":{color:"rgb(190,40,190)"},
  "for":{color:"rgb(190,40,190)"},
  "/patterns/":{
    "+" : {color:"black"},
    "=" : {color:"black"},
    "(" : {color:"rgb(50,58,150)"},
    ")" : {color:"rgb(50,58,150)"},
    "[" : {color:"rgb(50,58,150)"},
    "]" : {color:"rgb(50,58,150)"},
    "->":{color:"rgb(90,90,220)"}
  },
  "/number/":{color:"rgb(30,100,250)"},
  "/before/":{"(": {color:"rgb(200,30,90)",fontWeight:"900"}},
  "/after/":{
    "from":{color:"rgb(90,90,220)"},
    "class":{color:"rgb(90,90,220)"},
  },
  "/ranges/":[
    {start:[`'`], end:[[`'`]], style:{color:"#fa9866"}},
    {start:[`"`], end:[[`"`]], style:{color:"#fa9866"}},
    {start:["#"], end:[["\n"]], style:{color:"rgb(80,140,90)"}}
  ],
},
}

const GO = {
code:`
package main
import (
  "fmt"
  "math/rand"
)

type Node struct{
  data int
  nextnode *Node
  prevnode *Node
}

type LL struct{
  tail *Node
  head *Node
}

func (list *LL) add(data int){
  var newNode = new(Node) 
  newNode.data = data
 if list.head == nil {
   list.head = newNode
   list.tail = newNode
   return
 }
 var temp *Node = list.tail
 list.tail.nextnode = newNode
 list.tail = newNode
 list.tail.prevnode = temp
}


func (list *LL) printList(){
  var temp *Node = list.head 
  for temp != nil {
    fmt.Println(temp.data)
    temp = temp.nextnode
  }
}


func main() {
  var l LL
  for i:=0; i<10; i++ {
    l.add(rand.Intn(200))
  }
  l.printList()
}
`,
dark:{  
  "type":{color:"rgb(225,135,245)"},
  "import":{color:"rgb(225,135,245)"},
  "package":{color:"rgb(225,135,245)"},
  "return":{color:"rgb(225,135,245)"},
  "if":{color:"rgb(225,135,245)"},
  "while":{color:"rgb(225,135,245)"},
  "for":{color:"rgb(225,135,245)"},
  "else":{color:"rgb(225,135,245)"},
  "break":{color:"rgb(225,135,245)"},
  "string":{color:"rgb(225,135,245)"},
  "map":{color:"rgb(225,135,245)"},
  "var":{color:"rgb(100,180,250)"},
  "const":{color:"rgb(100,180,250)"},
  "bool":{color:"rgb(100,180,250)"},
  "int":{color:"rgb(100,180,250)"},
  "nil":{color:"rgb(100,180,250)"},
  "struct":{color:"rgb(100,180,250)"},
  "func":{color:"rgb(100,180,250)"},
  "/patterns/":{
    "+" : {color:"white"},
    "=" : {color:"white"},
    "&" : {color:"white"},
    ";" : {color:"white"},
    "{" : {color:"rgb(100,180,250)"},
    "}" : {color:"rgb(100,180,250)"},
    "(" : {color:"rgb(100,180,250)"},
    ")" : {color:"rgb(100,180,250)"},
    "[" : {color:"rgb(100,180,250)"},
    "]" : {color:"rgb(100,180,250)"},
  },
  "/number/":{color:"#aef2ae"},
  "/before/":{"(": {color:"rgb(220,220,100)",fontWeight:"900"}},
  "/after/":{
    "package":{color:"rgb(50,180,250)"},
    "type":{color:"rgb(50,180,250)"},
    "var":{color:"rgb(50,180,250)"},
  },
  "/ranges/":[
    {start:[`"`], end:[[`"`]], style:{color:"#fa9866"}},
  ],
},
light: { 
  "import":{color:"rgb(190,40,190)"},
  "package":{color:"rgb(190,40,190)"},
  "return":{color:"rgb(190,40,190)"},
  "if":{color:"rgb(190,40,190)"},
  "for":{color:"rgb(190,40,190)"},
  "break":{color:"rgb(190,40,190)"},
  "var":{color:"rgb(90,90,220)"},
  "func":{color:"rgb(90,90,220)"},
  "nil":{color:"rgb(90,90,220)"},
  "bool":{color:"rgb(90,90,220)"},
  "string":{color:"rgb(190,40,190)"},
  "map":{color:"rgb(190,40,190)"},
  "type":{color:"rgb(190,40,190)"},
  "int":{color:"rgb(140,30,255)"},
  "struct":{color:"rgb(140,30,255)"},
  "/patterns/":{
    "+" : {color:"black"},
    "=" : {color:"black"},
    "&" : {color:"black"},
    ";" : {color:"black"},
    "{" : {color:"rgb(50,58,150)"},
    "}" : {color:"rgb(50,58,150)"},
    "(" : {color:"rgb(50,58,150)"},
    ")" : {color:"rgb(50,58,150)"},
    "[" : {color:"rgb(50,58,150)"},
    "]" : {color:"rgb(50,58,150)"},
  },
  "/number/":{color:"rgb(30,100,250)"},
  "/before/":{"(": {color:"rgb(200,30,120)",fontWeight:"900"}},
  "/after/":{
    "package":{color:"rgb(50,180,250)"},
    "type":{color:"rgb(50,180,250)"},
    "var":{color:"rgb(50,180,250)"},
  },
  "/ranges/":[
    {start:[`"`], end:[[`"`]], style:{color:"#fa9866"}},
  ],
},
}

export const lanList = [PY,JS, CPP, GO]