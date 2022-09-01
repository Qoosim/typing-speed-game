import { useState, useEffect, useRef } from 'react';
import styles from './HomePage.module.css';
import randomWords from 'random-words';
const NUMB_OF_WORDS = 100;

const HomePage = () => {
  const [timer, setTimer] = useState(0);
  const [timerValue, setTimerValue] = useState(0);
  const [words, setWords] = useState([]);
  const [currInput, setCurrInput] = useState("");
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [currChar, setCurrChar] = useState("");
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState(0);
  const [gameStatus, setGameStatus] = useState("Waiting");
  const textRef = useRef(null);

  useEffect(() => {
    setWords(generateWords());
  }, [])

  useEffect(() => {
    if (gameStatus === 'started') {
      textRef.current.focus();
    }
  }, [gameStatus])

  const generateWords = () => {
    return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const timeCounter = timer;
    setTimerValue(timeCounter);
    setTimer(0);
  }

  const start = () => {
    if (gameStatus === 'finished') {
      setWords(generateWords());
      setCurrWordIndex(0);
      setCorrectWords(0);
      setIncorrectWords(0);
      setCurrCharIndex(-1);
      setCurrChar("");
      setTimer(0);
    }

    if (gameStatus !== 'started') {
      setGameStatus('started');
      let interval = setInterval(() => {
        setTimerValue((prevState) => {
          if (prevState === 0) {
            clearInterval(interval);
            setGameStatus('finished');
            setCurrInput("");
            setTimerValue(0);
          } else {
            return prevState - 1;
          }
        });
      }, 1000)
    }
  }

  const handleKeyDown = ({ keyCode, key }) => {
    // space bar
    if (keyCode === 32) {
      checkMatch();
      setCurrInput("");
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(-1);
      // backspace
    } else if (keyCode === 8) {
      setCurrCharIndex(currCharIndex - 1);
      setCurrChar("");
    } else {
      setCurrCharIndex(currCharIndex + 1);
      setCurrChar(key);
    }
  }

  const checkMatch = () => {
    const wordToCompare = words[currWordIndex];
    const doesItMatch = wordToCompare === currInput.trim();
    if (doesItMatch) {
      setCorrectWords(correctWords + 1);
    } else {
      setIncorrectWords(incorrectWords + 1);
    }
  }

  const getCharClass = (wordIdx, charIdx, char) => {
    if (wordIdx === currWordIndex && charIdx === currCharIndex &&
    currChar && gameStatus !== 'finished') {
      if (char === currChar) {
        return 'bg-success';
      } else {
        return 'bg-danger';
      }
    } else if (wordIdx === currWordIndex && currWordIndex >= words[currWordIndex].length) {
      return 'bg-danger';
    } else {
      return "";
    }
  }

  return (
    <main className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 my-4">
          <div className="text-center mb-5">
            <h2 className={styles.title}>How fast do you type?</h2>
            <form
              onSubmit={handleSubmit}
              className="d-flex justify-content-center mb-3"
            >
              <input
                type="text"
                pattern="[0-9]*"
                value={timer}
                className="form-control w-25"
                onChange={(e) =>
                  setTimer((val) =>
                    e.target.validity.valid ? e.target.value : val)}
              />
              <button
                type="submit"
                className={`btn ${styles.addBtn}`}
              >
                Add
              </button>
            </form>
            <h2 className={`fs-2 ${styles.timer}`}>{timerValue}</h2>
          </div>
          <div>
            <input
              ref={textRef}
              type="text"
              className="form-control mb-5"
              onKeyDown={handleKeyDown}
              value={currInput}
              onChange={(e) => setCurrInput(e.target.value)}
              disabled={gameStatus !== 'started'}
            />
          </div>
          <div>
            <button
              type="button"
              className={`btn ${styles.startBtn}`}
              onClick={start}
            >
              Start
            </button>
          </div>
          { gameStatus === 'started' && (
            <div className="card mt-5">
              <div className="card-body">
                { words.map((word, i) => (
                    <span key={i}>
                      { word.split("").map((char, idx) => (
                          <span
                            key={idx}
                            className={getCharClass(i, idx, char)}
                          >
                            {char}
                          </span>
                        ))
                      }
                      {' '}
                    </span>
                  ))
                }
              </div>
            </div>
          )}
          { gameStatus === 'finished' && (
            <div className="p-5 d-flex justify-content-between">
              <div className="text-center">
                <h2 className="fs-3">WPM</h2>
                <p className={`fs-2 ${styles.wpm}`}>{correctWords}</p>
              </div>
              <div className="text-center">
                <h2 className="fs-3">Accuracy</h2>
                <p className={`fs-2 ${styles.accuracy}`}>
                  { Math.round((correctWords / (correctWords + incorrectWords)) * 100) } %
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default HomePage;
