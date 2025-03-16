import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <Statistics bad={bad} good={good} neutral={neutral} />
    </div>
  );
};

type StatisticsProps = {
  good: number;
  neutral: number;
  bad: number;
};

const Statistics = ({ good, neutral, bad }: StatisticsProps) => {
  const all = good + neutral + bad;

  return (
    <>
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {good + neutral + bad}</div>
      <div>average {(good - bad) / all}</div>
      <div>positive {(good / all) * 100}%</div>
    </>
  );
};

export default App;
