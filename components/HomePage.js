import { useState, useEffect, useRef } from 'react';
import styles from './HomePage.module.css';
import randomWords from 'random-words';
const NUMB_OF_WORDS = 200;

const HomePage = () => {
  const [timer, setTimer] = useState(0);
  const [words, setWords] = useState([]);
  const [countDown, setCountDown] = useState(timer);
  const textRef = useRef(null);

  useEffect(() => {
    setWords(generateWords());
  }, [])

  const generateWords = () => {
    return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const theTime = timer;
    return theTime;
  }

  return (
    <main className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 my-5">
          <div className="text-success text-center mb-5">
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
            <h2 className="fs-2">{timer}</h2>
          </div>
          <div>
            <input
              type="text"
              className="form-control mb-5"
            />
          </div>
          <div>
            <button type="button" className={`btn ${styles.startBtn}`}>Start</button>
          </div>
          <div className="card mt-5">
            <div className="card-body">
              { words.map((word, i) => (
                <span key={i}>
                  {word}
                  {' '}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomePage;
