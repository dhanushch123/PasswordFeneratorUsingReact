
import { useState,useCallback,useRef } from 'react'
import './App.css'

import { useEffect } from 'react';

function App() {
  const[length,setLength] = useState(8);
  const[numberAllowed,setNumberAllowed] = useState(false);
  const[characterAllowed,setCharacterAllowed] = useState(false);
  const[password,setPassword] = useState("")

 

  const passwordGenerator = useCallback(()=>{
    let passwd = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="0123456789"
    if(characterAllowed) str+="!@#$%^&*(){}+=-~"
    for(let i =0;i<length;i++)
    {
      let ind = Math.floor(Math.random()*str.length);
      passwd+=str[ind];
    }
    setPassword(passwd);
    console.log(passwordReference["current"].value);

  },[length,numberAllowed,characterAllowed,setPassword]);

  useEffect(()=>{
    passwordGenerator();
  },[numberAllowed,characterAllowed,length])

  const passwordReference = useRef(null);
  const copyPasswordToClipBoard = useCallback(()=>{
    let ele = passwordReference.current;
    ele?.select()
    ele?.setSelectionRange(0,5); 
    window.navigator.clipboard.writeText(password)

  },[password])

 

  return (
   <div className='section'>
    <h1 className='heading'  > Password Generator </h1>
    <input onChange={passwordGenerator}   ref={passwordReference}    type='text' value = {password} readOnly placeholder='password'/>
    <button   onClick={()=>{
      copyPasswordToClipBoard()
    }}  id = 'copy'>copy</button>
    <div className='flex' >
      <div>
      <input type='range' 
      onChange={(e)=>{
        setLength(e.target.value)
       
      }}
      name='length' min={6}  max={70} value={length} />
      <label htmlFor='length'> Length : {length} </label>
      </div>
      
      <div className='char'>
      
      <input onChange={()=>{
        setCharacterAllowed(!characterAllowed);
      }} type='checkbox' />
      <label htmlFor='Character'> Characters allowed</label>
      </div>
      <div className='char'>
        
        <input onChange={()=>{
          setNumberAllowed(!numberAllowed)
        }} type='checkbox'/>
        <label htmlFor='Number'> NumbersAllowed </label>

      </div>

    </div>
   </div>
  )
}

export default App
 