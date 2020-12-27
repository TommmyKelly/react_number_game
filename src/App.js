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
  }, []);

  const getRandomNumber = () => {
    const firstNumber = Math.floor(Math.random() * 100 + 1);
    setNumber(firstNumber);
    inputNumber.current.value = "";
    let startMessage = "Are you ready to play?";
    setGuesses([]);
    getDialog("start1", startMessage);
    setText("alert alert-dark role=alert");
    console.log(number);
  };

  // const saveHistory = (guess) => {
  //   guesses.push(guess);
  // };

  const checkNumber = () => {
    let checkText = "";

    if (
      inputNumber.current.value === "" ||
      inputNumber.current.value < 1 ||
      inputNumber.current.value > 100
    ) {
      setinputError(true);
      resetAlert();
      return;
    }

    console.log(inputNumber.current.value);

    if (inputNumber.current.value > number) {
      setGuesses([inputNumber.current.value, ...guesses]);
      console.log("to High");
      checkText = showNumberAbove();
      setText(checkText);
    } else if (inputNumber.current.value < number) {
      setGuesses([inputNumber.current.value, ...guesses]);
      console.log("to Low");
      checkText = showNumberBelow();
      setText(checkText);
    } else if (inputNumber.current.value == number) {
      console.log("correct");
      checkText = showYouWon();
      setText(checkText);
    }
  };

  const resetAlert = () => {
    setTimeout(() => {
      setinputError(false);
    }, 2000);
  };

  const getDialog = (dialogType, text) => {
    let dialog;
    switch (dialogType) {
      case "warning":
        dialog = "alert alert-warning role=alert";
        setTextMessage(text);
        break;
      case "won":
        dialog = "alert alert-success role=alert";
        setTextMessage(text);
        break;
      // case "start":
      //   dialog = "alert alert-dark role=alert";
      //   setTextMessage(text);
      //   break;
      case "start1":
        dialog = "alert alert-warning role=alert";
        setTextMessage(text);
        break;
    }
    // dialog += text;
    // dialog += "</div>";
    return dialog;
  };

  function showYouWon() {
    //
    const text = "YOU GUESSED IT!!!";
    /**
     * Retrieve the dialog using the getDialog() function
     * and save it to variable called dialog
     * HINT: Use the 'won' and text parameters
     */

    //
    let dialog = getDialog("won", text);
    return dialog;
  }

  function showNumberAbove() {
    const text = "Your guess is too high!";
    /**
     * Retrieve the dialog using the getDialog() function
     * and save it to variable called dialog
     * HINT: Use the 'warning' and text parameters
     */

    //
    let dialog = getDialog("warning", text);
    return dialog;
  }

  function showNumberBelow() {
    const text = "Your guess is too low!";
    /**
     * Retrieve the dialog using the getDialog() function
     * and save it to variable called dialog
     * HINT: Use the 'warning' and text parameters
     */

    //
    let dialog = getDialog("warning", text);
    return dialog;
  }

  return (
    <div className='App text-center'>
      <nav class='navbar navbar-dark bg-dark'>
        <a class='navbar-brand' href='#'>
          Guess The Number
        </a>
      </nav>
      <main>
        <h1 class='banner p-3'>1.2.3.</h1>

        <div class='form-group '>
          {inputError && (
            <div id='input-warning' className='alert alert-danger role=alert'>
              Numbers must be greater than 0 and less than 100
            </div>
          )}
          <input
            ref={inputNumber}
            id='number-guess'
            class='form-control form-control-lg'
            type='number'
            placeholder="What's your guess?"
            min='0'
            max='100'
          />
        </div>
        <div id='result' className={text}>
          {textMessage}
        </div>
        <button
          type='button'
          id='number-submit'
          class='btn btn-lg btn-secondary'
          onClick={checkNumber}
        >
          Check Me
        </button>
        <button
          type='button'
          id='restart-game'
          class='btn btn-lg btn-light'
          onClick={getRandomNumber}
        >
          Restart
        </button>
        <div id='trys'>Attempts {guesses.length}</div>
        <div id='history'>
          <ul class='list-group'>
            {guesses.map((guess, index) => (
              <li class='list-group-item'>{guess.toString()}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
