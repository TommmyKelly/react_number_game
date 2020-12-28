import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState("");
  const [text, setText] = useState("");
  const [textMessage, setTextMessage] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [inputError, setinputError] = useState(false);

  const inputNumber = useRef();

  useEffect(() => {
    getRandomNumber();
    inputNumber.current.focus();
    // eslint-disable-next-line
  }, []);

  const getRandomNumber = () => {
    const firstNumber = Math.floor(Math.random() * 100 + 1);
    setNumber(firstNumber);
    inputNumber.current.value = "";
    let startMessage = "Are you ready to play?";
    setTextMessage(startMessage);
    setGuesses([]);

    setText("alert alert-dark role=alert");
    console.log(number);
  };

  const checkNumber = () => {
    if (
      inputNumber.current.value === "" ||
      inputNumber.current.value < 1 ||
      inputNumber.current.value > 100
    ) {
      setinputError(true);
      resetAlert();
      inputNumber.current.value = "";
      return;
    }

    console.log(inputNumber.current.value);

    if (inputNumber.current.value > number) {
      setGuesses([inputNumber.current.value, ...guesses]);

      setText("alert alert-warning role=alert");
      setTextMessage("Guess is to high");
    } else if (inputNumber.current.value < number) {
      setGuesses([inputNumber.current.value, ...guesses]);

      setText("alert alert-warning role=alert");
      setTextMessage("Guess is to Low");
    } else if (inputNumber.current.value == number) {
      setText("alert alert-success role=alert");
      setTextMessage("Guess is correct");
    }
    inputNumber.current.value = "";
  };

  const resetAlert = () => {
    setTimeout(() => {
      setinputError(false);
    }, 2000);
  };

  const handelKeyPress = (event) => {
    event.key === "Enter" && checkNumber();
  };

  return (
    <div className='App text-center'>
      <nav className='navbar navbar-dark bg-dark'>
        <a className='navbar-brand' href='#'>
          Guess The Number
        </a>
      </nav>
      <main>
        <h1 className='banner p-3'>1-2-3</h1>
        <div className='form-group '>
          {inputError && (
            <div id='input-warning' className='alert alert-danger role=alert'>
              Numbers must be greater than 0 and less than 100
            </div>
          )}
          <input
            ref={inputNumber}
            id='number-guess'
            className='form-control form-control-lg'
            type='number'
            placeholder="What's your guess?"
            min='0'
            max='100'
            onKeyDown={handelKeyPress}
          />
        </div>
        <div id='result' className={text + " mb-2"}>
          {textMessage}
        </div>
        <button
          type='button'
          id='number-submit'
          className='btn btn-secondary'
          onClick={checkNumber}
        >
          Check Me
        </button>{" "}
        <button
          type='button'
          id='restart-game'
          className='btn btn-info'
          onClick={getRandomNumber}
        >
          Restart
        </button>
        <div id='trys' className='alert alert-secondary role=alert mt-2'>
          Attempts {guesses.length}
        </div>
        <div id='history'>
          <ul className='list-group'>
            {guesses.map((guess, index) => (
              <li key={index} className='list-group-item'>
                You gussed {guess.toString()}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
