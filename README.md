# A language agnostic code syntax highlighter in React.

# install: 
```npm i @arjan32/code-highlighter```
# usage: 
This module is just a function that takes two parameters:  
* ```The source code``` of type ```string```
* ```Object needed to style parts of the source code ``` of type ```object```
* ```Characther list``` of type ```object```

and returns an array of React span components.

This object should contain two types of values:
* ```tokens```
* ```sub-routines```

these values should be given a ```css``` styles object.

# tokens
```tokens``` are strings of characters that are not within a certain list of characters.

the default list contains these characters:

``` 
+ - * " ' ` / ( ) [ ] { } & ^ % $ ~ # (\n new line character)
! ; . ? < > : \ , | = (\s space character) (\t tab character)
```
this list can be changed by passing a new character list as a third parameter to the function  

an example for js:
```javascript
  "new":{color:"rgb(225,135,245)"},
  "return":{color:"rgb(225,135,245)"},
  "if":{color:"rgb(225,135,245)"},
  "for":{color:"rgb(225,135,245)"},
  "else":{color:"rgb(225,135,245)"},
  "let":{color:"rgb(100,180,250)"},
  "const":{color:"rgb(100,180,250)"},
  "of":{color:"rgb(100,180,250)"},
  "function":{color:"rgb(100,180,250)"},
```
 
# sub-routines
```sub-routines``` are just funtions that capture tokens or characters that satisfy the conditions of that function.

so far there are only 5 sub-routines:
* ```/number/```: captures any string-pattern that is a number including hex numbers.
* ```/before/```: captures a token that comes before a given token.
* ```/after/```: captures a token that comes after a given token.
* ```/patterns/``` : captures any given string-pattern.
* ```/ranges/```: captures characters in between two given patterns.

an example for js:
```javascript
 "/number/":{color:"#aef2ae"},
 // functions and function calls
  "/before/":{
       "(":{color:"rgb(220,220,100)",fontWeight:"900"},
  },
  "/after/":{
       "const":{color:"rgb(100,210,250)"},
  },
  "/patterns/":{
        "=>": {color:"rgb(100,180,250)"},
        "+" : {color:"white"},
        "=" : {color:"white"},
        "-" : {color:"white"},
        ";" : {color:"white"},
        "{" : {color:"rgb(100,180,250)"},
        "}" : {color:"rgb(100,180,250)"},
        "(" : {color:"rgb(100,180,250)"},
        ")" : {color:"rgb(100,180,250)"},
        "[" : {color:"rgb(100,180,250)"},
        "]" : {color:"rgb(100,180,250)"},
  },
  "/ranges/":[
     { // string
        start:['"'],
        end:[['"']],
        style:{color:"#fa9866"}, 
        patterns:{'\\"':{color:"rgb(255, 214, 99)"},} 
    },
    
    { // template literal:
        start:["`"],
        end:[["`"]],
        style:{color:"#fa9866"},
        "/ranges/":[
            {
              start:["${",{color:"rgb(90,100,250)"}],
              end:[["}",{color:"rgb(90,100,250)"}]],
              style:"self"
            }
        ],
    },
    // comments
    {start:["/*"], end:[["*/"]], style:{color:"rgb(180,240,190)"}},
    {start:["//"], end:[["\n"]], style:{color:"rgb(180,240,190)"}},
  ],
```

# A bit more on ranges
ranges should be an array of objects and those objects can have 5 values:
* ```start```
* ```end```
* ```style```
* ```ranges```
* ```patterns```

```start```: is the start pattern of the range 
and should be an array of 2 values:
* string-pattern
* styles object

if the second index is empty then the style value will be used by default.

```end```: is the end pattern of the range and should be an array of arrays 
that can contain any amount of the same array that ```start``` uses,
that way the range can stop at any one of those patterns given to ``end``.

```style```: styles object that styles whatever is in between ```start``` and  ```end```, but can also be a string called "self" which will  recursively style the range with the previously mentioned styles.

```ranges```: a sub-range of a range.

```patterns```: captures any string-pattern within the range.

there's also an example and in order to see that example you need to add the script tag below in your html file
```html
<script type="module" src="@arjan32/code-highlighter/Example/example.jsx" defer></script>
```
and then add a div with the id "ch-example-root" 
