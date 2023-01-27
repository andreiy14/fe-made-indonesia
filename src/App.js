import React, { useEffect, useState } from "react";
const dataDummy = [
  {
    question: " How many hours do you spend on social media every day",
    answer: ["1 hour", "2-3 hours", "more than 5 hours"],
  },
  {
    question: " Which social media channels are you most active on?",
    answer: ["Facebook", "Instagram", "Snapchat"],
  },
  {
    question: " How useful is social media for learning?",
    answer: ["Very useful", "Somewhat Useful", "Not useful"],
  },
  {
    question: " What do you use social media for?",
    answer: ["Networking", "Business", "Learning"],
  },
  {
    question: " How many social platforms are you on?",
    answer: ["1", "2", "3"],
  },
  {
    question: " How often do you use social media?",
    answer: ["Everyday", "Weekly", "Monthly"],
  },
  {
    question: " How often do you post on social media?",
    answer: ["Very often", "Somewhat often", "Rarely"],
  },
  {
    question:
      " To what extent does social media influence your behaviors and actions?",
    answer: ["To a large extent", "Seldomly", "Never"],
  },
  {
    question: "To what extent has social media affected your self-esteem?",
    answer: ["To a large extent", "Seldomly", "Never"],
  },
  {
    question: " How old are you?",
    answer: ["18-25", "25-40", "40-60"],
  },
  {
    question: "Kindly indicate your employment status?",
    answer: ["Unemployed", "Self-employed", "Employed"],
  },
];
function App() {
  const minutes = 5;
  const seconds = 0;
  const [current, setCurrent] = useState(0);
  const [dataShow, setDataShow] = useState(dataDummy[0]);
  const [value, setValue] = useState("");
  const [valueSurvey, setValueSurvey] = useState([]);
  const [isClick, setIsClick] = useState({
    condition: false,
    indexClick: null,
  });
  const [isMaksCurrent, setIsMaksCurrent] = useState(false);

  const [over, setOver] = React.useState(false);
  const [time, setTime] = React.useState({
    minutes: parseInt(minutes),
    seconds: parseInt(seconds),
  });

  const tick = () => {
    if (over) return;
    if (time.minutes === 0 && time.seconds === 0) {
      setOver(true);
    } else if (time.minutes === 0 && time.seconds === 0)
      setTime({
        minutes: 59,
        seconds: 59,
      });
    else if (time.seconds === 0)
      setTime({
        minutes: time.minutes - 1,
        seconds: 59,
      });
    else
      setTime({
        minutes: time.minutes,
        seconds: time.seconds - 1,
      });
  };

  const reset = () => {
    setTime({
      minutes: parseInt(minutes),
      seconds: parseInt(seconds),
    });

    setOver(false);
  };

  React.useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    const currentNum = JSON.parse(localStorage.getItem("current"));
    const survey = JSON.parse(localStorage.getItem("valueSurvey"));

    if (items && currentNum) {
      setDataShow(items);
      setCurrent(currentNum);
      setValueSurvey(survey);
    }
  }, []);

  const handleFinish = () => {
    let check = false;
    const dataFilter = dataDummy[dataDummy.length - 1]?.answer.filter((item) =>
      dataShow?.answer?.find((el) => item === el)
    );

    if (dataFilter?.length > 0 && isMaksCurrent) check = true;

    return check;
  };

  const handleReset = () => {
    localStorage.clear();
    setCurrent(0);
    setIsClick({ condition: false, indexClick: null });
    setValueSurvey([]);
    setValue("");
    setIsMaksCurrent(false);
    setDataShow(dataDummy[0]);
    reset();
  };

  return (
    <div className="max-2-6xl mx-auto py-8 h-auto px-6 bg-white ">
      <main className="shadow flex flex-col bg-cyan h-5/6 py-10 rounded-xl px-5     ">
        <div className="flex justify-center">
          <h1 className="font-semibold text-3xl">Survey App</h1>
        </div>
        {handleFinish() || over ? (
          <div className="h-80 flex justify-center items-center">
            <span className="font-mono md:text-2xl">Thank you!</span>
          </div>
        ) : (
          <>
            <div className="flex text-center justify-center mt-8 md:text-2xl ">
              <h3>{dataShow?.question}</h3>
            </div>

            <div className="flex gap-10 flex-col justify-center mt-12 md:w-full items-center ">
              {dataShow?.answer?.map((item, index) => (
                <button
                  onClick={() => {
                    setValue(item);
                    setCurrent(current + 1);
                    setIsClick({ condition: true, indexClick: index });
                  }}
                  key={index}
                  className={`1 button ${
                    isClick?.indexClick === index ? "bg-white" : " bg-green"
                  }  min-w-30 hover:bg-white w-auto text-sm  px-4 py-4 md:w-84 h-18 rounded-md`}
                >
                  {item}
                </button>
              ))}
            </div>
          </>
        )}
        <div>
          <p>{`${time.minutes.toString().padStart(2, "0")}:${time.seconds
            .toString()
            .padStart(2, "0")}`}</p>
        </div>

        <div className="flex gap-10 flex-col justify-center mt-12 md:w-full items-center ">
          {handleFinish() || over ? (
            <button
              onClick={() => {
                handleReset();
              }}
              className="w-64 hover:bg-opacity-30 h-10 bg-red rounded-md text-xl text-white "
            >
              Reset
            </button>
          ) : (
            <button
              disabled={isClick === false}
              onClick={() => {
                const values = [...valueSurvey];
                values.push(value);
                setValueSurvey(values);
                setIsClick({ indexClick: null, condition: false });

                if (current <= 10) {
                  setDataShow(dataDummy[current]);
                  localStorage.setItem(
                    "items",
                    JSON.stringify(dataDummy[current])
                  );
                  localStorage.setItem("current", JSON.stringify(current));
                  localStorage.setItem("valueSurvey", JSON.stringify(values));
                }

                if (current > 10) {
                  setIsMaksCurrent(true);
                }
              }}
              className="w-64 hover:bg-opacity-30 h-10 bg-blue rounded-md text-xl text-white "
            >
              Next
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
