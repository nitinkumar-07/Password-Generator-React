import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FaCopy } from "react-icons/fa";

const App = () => {
  const [length, setLength] = useState(6);
  const [numAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {

    let pass = "";
    let str = "";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}|;:,.<>";
    if (upperCase) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowerCase) str += "abcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass)


  }, [length, numAllowed, charAllowed, upperCase, lowerCase, setPassword])


  const copyPasswordToClipboard = useCallback(() => {

    passwordRef.current.select()
    window.navigator.clipboard.writeText(password);

  }, [password])

  useEffect(() => {

    passwordGenerator();

  }, [length, numAllowed, charAllowed, upperCase, lowerCase, passwordGenerator])


  return (

    //body 
    <div className=' bg-[#3B3B98] flex h-screen items-center justify-center '>

      {/* main div of password generator */}
      <div className='bg-[#23235B] w-[90%] md:max-w-[400px] p-8 text-white text-center text-2xl rounded-md shadow-lg '>
        <h1>Password Generator</h1>

        {/* input field div */}
        <div className="relative mt-3">
          <input
            type="text"
            ref={passwordRef}
            className="bg-[#18183d] outline-none text-white w-full pr-10 p-2 rounded text-xl input-text"
            value={password}
            placeholder='password'
            readOnly

          />

          <FaCopy
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#d8d8f7] cursor-pointer transition-all duration-300 ease-in-out  hover:text-blue-400 hover:drop-shadow-[0_0_1px_#3b82f6]"
            onClick={copyPasswordToClipboard}
          />

        </div>

        {/* div of all checkbox  */}
        <div className='flex text-xl gap-x-2 gap-y-3 flex-col mobile-view'>

          <div className='flex items-center gap-x-2 mt-4 '>

            <input type="range"
              min={6}
              max={25}
              value={length}
              className='cursor-pointer w-48 length'
              onChange={(e) => { setLength(e.target.value) }}
            />

            <label>Length : {length}</label>
          </div>

          <div className='flex items-center gap-x-32'>
            <label htmlFor="numberInput">Include Numbers</label>
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id='numberIn'
              className='flex mt-2 size-4'
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />

          </div>

          <div className=' flex items-center gap-x-28 '>
            <label htmlFor="charInput">Include Characters</label>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id='charInput'
              className='flex mt-2 ml-1 size-4'

              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />

          </div>

          <div className=' flex items-center gap-x-28 '>
            <label htmlFor="charInput">Include UpperCase</label>
            <input
              type="checkbox"
              defaultChecked={upperCase}
              id='uppercaseIn'
              className='flex mt-2 size-4'

              onChange={() => {
                setUpperCase((prev) => !prev);
              }}
            />

          </div>


          <div className=' flex items-center gap-x-28 '>
            <label htmlFor="charInput">Include lowerCase</label>
            <input
              type="checkbox"
              defaultChecked={lowerCase}
              id='lowercaseIn'
              className='flex mt-2 ml-1.5 size-4'

              onChange={() => {
                setLowerCase((prev) => !prev);
              }}
            />

          </div>

        </div>

        <button className='bg-[#3B3B98] mt-5 w-full pr-10 p-2 rounded text-xl transition-all duration-300 ease-in-out  hover:bg-[#4949a6] btn'>Generate Password</button>

      </div>

    </div>

  )
}

export default App