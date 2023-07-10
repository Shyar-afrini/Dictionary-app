import React, { useState, useEffect } from 'react';
import FetchData from './FetchData';

const Input = ( props ) => {

    const [inputTheme, setInputTheme] = useState(false);
    const [wordChoice, setWordChoice] = useState('');

    useEffect(() => {
        setInputTheme(props.theme)
    }, [props.theme])

    useEffect(() => {
      const detectKeyPress = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault(); // Prevent page refresh
          const inputValue = document.getElementById('word-input').value;
          setWordChoice(inputValue);
          props.onWordChoice(inputValue)
          document.getElementById('word-input').value = ''; // Clear input field
        }
      };
  
      const input = document.getElementById('word-input');
      input.addEventListener('keydown', detectKeyPress);

      return () => {
        input.removeEventListener('keydown', detectKeyPress); // Clean up event listener on component unmount
      };
    }, []);


    // console.log(wordChoice)

  return (
      <div className='flex justify-center pt-24'>
        <input placeholder='Search for a word' type="text" id="word-input" className={`${inputTheme? 'bg-[#020202] text-white placeholder:text-white' : 'bg-white text-[#303030] placeholder:text-[#303030]'}  outline-none opacity-70 focus:opacity-90 focus:py-6 focus:duration-300 focus:ease-in-out rounded-md text-center transition-all ease-in-out duration-500 w-[90%] md:w-[50%] h-8 py-5`} />
      </div>
  );
};

export default Input;
