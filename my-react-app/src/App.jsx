import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  const decreaseCount = () => setCount((current) => current - 1);
  const increaseCount = () => setCount((current) => current + 1);
  const resetCount = () => setCount(0);

  const message = count % 2 === 0 ? 'Even number' : 'Odd number';
  const greeting = name.trim() ? `Hello, ${name}! Welcome to my React app.` : '';
  const currentYear = new Date().getFullYear();

  return (
    <div className="app-shell">
      <main className="app-card">
        <h1>My First React App</h1>
        <p className="intro">
          I am learning React and building an interactive app to practice JavaScript, state,
          events, and conditional rendering.
        </p>

        <div className="counter-section">
          <div className="counter-box">
            <button type="button" onClick={decreaseCount} aria-label="Decrease count">
              −
            </button>
            <span className="count-value" aria-live="polite">
              {count}
            </span>
            <button type="button" onClick={increaseCount} aria-label="Increase count">
              +
            </button>
          </div>

          <button type="button" className="reset-btn" onClick={resetCount}>
            Reset
          </button>
        </div>

        <div className="input-section">
          <label htmlFor="name-input">Your name</label>
          <input
            id="name-input"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Type your name"
          />
        </div>

        <p className={`message ${count % 2 === 0 ? 'even' : 'odd'}`}>{message}</p>

        {greeting && <p className="greeting">{greeting}</p>}

        <footer>© {currentYear}</footer>
      </main>
    </div>
  );
}

export default App;
