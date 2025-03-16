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
        <Button text={"good"} onClick={() => setGood(good + 1)} />
        <Button text={"neutral"} onClick={() => setNeutral(neutral + 1)} />
        <Button text={"bad"} onClick={() => setBad(bad + 1)} />
      </div>
      <Statistics bad={bad} good={good} neutral={neutral} />
    </div>
  );
};

type ButtonProps = {
  onClick: () => void;
  text: string;
};

const Button = ({ onClick, text }: ButtonProps) => (
  <button onClick={onClick}>{text}</button>
);

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

      {all === 0 && <div>No feedback given</div>}

      {all !== 0 && (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={(good - bad) / all} />
            <StatisticLine
              text="positive"
              value={(good / all) * 100}
              unit="%"
            />
          </tbody>
        </table>
      )}
    </>
  );
};

type StatisticLineProps = {
  text: string;
  value: number;
  unit?: string;
};

const StatisticLine = ({ text, value, unit }: StatisticLineProps) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
    <td>{unit}</td>
  </tr>
);

export default App;
