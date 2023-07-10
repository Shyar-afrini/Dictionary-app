import React, { useState, useEffect } from 'react';
import getRandomWord from './RandomWord';
import Input from './Input';
import playButton from  '../assest/play-button.png'
import pauseButton from  '../assest/pause.png'
// import Audio from '../assest/cringe.mp3'


const FetchData = (props) => {
  const [data, setData] = useState(null);
  const [wordTheme, setWordTheme] = useState(false);
  const [randomWord, setRandomWord] = useState('');
  const [play, setPlay] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  // console.log(getRandomWord());

  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const word = await getRandomWord();
        if (word) {
          setRandomWord(word);
        }
      } catch (error) {
        console.log('Error fetching random word:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setWordTheme(props.theme);
    // console.log(wordTheme);
  }, [props.theme]);

  useEffect(() => {
    const fetchDefinition = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        // console.log(result);
        setData(result);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    if (randomWord !== '') {
      fetchDefinition();
    }
  }, [randomWord]);

  if (data === null) {
    return (
      <div className={`font-bold text-xl cursive italic h-[10rem] flex items-center px-6 md:px-10 animate-pulse ${wordTheme ? 'text-black' : 'text-gray-200'}`}>
        Loading...
      </div>
    );
  }

  const handleWordChoice = (value) => {
    setRandomWord(value);
  }

  const handlePlay = () => {
    setPlay((prevPlay) => !prevPlay);
    setAutoPlay(!autoPlay);
    if(play === false){
      playSound()
    }
  };


  const playSound = () => {
    const sound = document.getElementById('music');
    if(handlePlay){
      sound.play()
    }else{
      sound.pause()
    }
  }

  

  let word = data[0]?.word;
  let phonetic = data[0]?.phonetics[1]?.text;
  let Audio = data[0]?.phonetics[0]?.audio;
  let definitionVerb = data[0]?.meanings[0]?.definitions[0]?.definition;
  let definitionNoun = data[0]?.meanings[0]?.definitions[1]?.definition;

  const nounDefinitionFound = Boolean(definitionNoun);
  const verbDefinitionFound = Boolean(definitionVerb);


  return (
    <div className={`grid md:grid-cols-2 h-fit italic cursive font-semibold text-xl px-6 md:px-10 pt-[4rem] transition-all duration-300 ${wordTheme ? 'text-black' : 'text-gray-200'}`}>
      <div>
        <h1 className={`text-3xl italic cursive ${verbDefinitionFound ? 'flex' : 'hidden'} justify-between`}>
           
          <div>
            Word:
            <span className="pl-2 font-[500] text-3xl">{word}</span>{' '}
            <span className="text-[1rem] montserrat font-normal pl-2">{phonetic}</span>
          </div>
          <span className=' md:mr-[10%] lg:mr-[20%]'>
            <audio id='music' src={Audio}></audio>
            <img onClick={handlePlay} src={playButton} alt="play-button" className={`w-12 h-12 cursor-pointer ${wordTheme ? ' invert-[20%]' : 'invert-[90%]'} ${play? 'hidden' : 'inline'}`} />
            <img onClick={handlePlay} src={pauseButton} alt="play-button" className={`w-12 h-12 cursor-pointer ${wordTheme ? ' invert-[20%]' : 'invert-[90%]'} ${play? 'inline' : 'hidden'}`} />
          </span>
        </h1>
        <div className={`font-bold text-xl cursive italic h-[10rem] flex items-center px-6 md:px-10 ${wordTheme ? 'text-black' : 'text-gray-200'} ${verbDefinitionFound ? 'hidden' : 'block'}`}>
          Sorry, no definitions found for the verb.
        </div>
        <br />
        <br />
        <h1 className={`cursive text-5xl font-semibold ${verbDefinitionFound ? 'block' : 'hidden'}`}>Verb</h1>
        <h1 className={`text-3xl italic cursive pt-12 w-full md:w-[60%] ${verbDefinitionFound ? 'block' : 'hidden'}`}>
          Definition: <span className="text-[1rem] montserrat font-normal pl-2">{definitionVerb}</span>
        </h1>
      </div>
      <div>
        <h1 className={`text-3xl italic cursive opacity-0 ${nounDefinitionFound ? 'block' : 'hidden'}`}>
          Word: <span className="pl-2 font-[500] text-3xl">{word}</span>{' '}
          <span className="text-[1rem] montserrat font-normal pl-2">{phonetic}</span>
        </h1>
        <div className={`font-bold text-xl cursive italic h-[10rem] flex items-center px-6 md:px-10 ${wordTheme ? 'text-black' : 'text-gray-200'} ${nounDefinitionFound ? 'hidden' : 'block'}`}>
          Sorry, no definitions found for the noun.
        </div>
        <br />
        <br />
        <h1 className={`cursive text-5xl font-semibold ${nounDefinitionFound ? 'block' : 'hidden'}`}>Noun</h1>
        <h1 className={`text-3xl italic cursive pt-12 w-full md:w-[60%] ${nounDefinitionFound ? 'block' : 'hidden'}`}>
          Definition: <span className="text-[1rem] montserrat font-normal pl-2">{definitionNoun}</span>
        </h1>
      </div>
      <div className='hidden'>
        <Input onWordChoice={handleWordChoice} />
      </div>
    </div>
  );
};

export default FetchData;
