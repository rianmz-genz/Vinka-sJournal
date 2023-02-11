import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FiPlus, FiX } from "react-icons/fi";
function App() {
  // get all plan from LS
  const keyStorage = "ALL PLAN";
  const getLocalData = () => {
    const local = localStorage.getItem(keyStorage);
    return JSON.parse(local) || [];
  };
  // state
  const [value, setValue] = useState(new Date());
  const [isNewText, setIsNewText] = useState(false);
  const [isEditText, setIsEditText] = useState(false);
  const [longText, setLongText] = useState("");
  const [editLongText, setEditLongText] = useState("");
  const [inputFields, setInputFields] = useState([""]);
  const [editInputFields, setEditInputFields] = useState([]);
  const [allPlan, setAllPlan] = useState(getLocalData());

  // change value input point
  const changeInputValue = (index, e) => {
    const Fields = [...inputFields];
    Fields[index] = e.target.value;
    setInputFields(Fields);
  };
  const changeInputEditValue = (index, e) => {
    const Fields = [...editInputFields];
    Fields[index] = e.target.value;
    setEditInputFields(Fields);
  };
  // add point input
  const addInput = () => {
    if (inputFields.length >= 5) {
      return;
    }
    const Input = "";
    setInputFields([...inputFields, Input]);
  };
  const addEditInput = () => {
    if (editInputFields.length >= 5) {
      return;
    }
    const Input = "";
    setEditInputFields([...editInputFields, Input]);
  };
  // delete point input
  const deleteInput = (index) => {
    const deletedInput = inputFields.filter((value, i) => i !== index);
    setInputFields(deletedInput);
  };
  const deleteEditInput = (index) => {
    const deletedInput = editInputFields.filter((value, i) => i !== index);
    setEditInputFields(deletedInput);
  };

  // add new plan
  const handleSubmit = (e) => {
    e.preventDefault();
    const plan = {
      value: `${value.getDate()}${value.getMonth()}${value.getFullYear()}`,
      longText: longText,
      point: inputFields,
    };
    setAllPlan([plan, ...allPlan]);
    localStorage.setItem(keyStorage, JSON.stringify(allPlan));
    setInputFields([]);
    setLongText("");
    setIsNewText(false);
  };
  // edit plan
  const editSubmit = (e) => {
    e.preventDefault();
    const editedPlan = allPlan.filter(
      (plan) =>
        plan.value !==
        `${value.getDate()}${value.getMonth()}${value.getFullYear()}`
    );
    const plan = {
      value: `${value.getDate()}${value.getMonth()}${value.getFullYear()}`,
      longText: editLongText,
      point: editInputFields,
    };
    editedPlan.push(plan);
    setAllPlan(editedPlan);
    setIsEditText(false);
  };
  // store to LS
  useEffect(() => {
    localStorage.setItem(keyStorage, JSON.stringify(allPlan));
  }, [allPlan]);
  // find one
  const day = allPlan.find(
    (plan) =>
      plan.value ==
      `${value.getDate()}${value.getMonth()}${value.getFullYear()}`
  );
  // delete plan
  const deletePlan = () => {
    const deletedPlan = allPlan.filter(
      (plan) =>
        plan.value !==
        `${value.getDate()}${value.getMonth()}${value.getFullYear()}`
    );
    setAllPlan(deletedPlan);
  };
  // store data to input value where user edit
  useEffect(() => {
    if (day !== undefined) {
      setEditInputFields(day.point);
      setEditLongText(day.longText);
    }
  }, [day]);
  return (
    <main className="bg-slate-300 min-h-screen flex justify-center items-start ">
      <section className="lg:w-11/12 w-full transition-all duration-300 flex flex-col pb-20 items-start max-w-[500px] bg-white min-h-screen pt-12 relative">
        <h1 className="flex items-center justify-center border-t border-b mb-6 py-1 border-black font-semibold text-xl w-full">VINKA'S JOURNAL</h1>
        <Calendar
          onChange={setValue}
          value={value}
          className={"react-calendar border-none"}
        />
        {isNewText && (
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="w-full flex flex-col items-center justify-center fixed top-0 left-1/2 -translate-x-1/2 bg-gray-300/10 backdrop-blur-xl h-screen max-w-[400px]"
          >
            <FiX
              onClick={() => setIsNewText(false)}
              className=" text-3xl absolute top-7 cursor-pointer right-4 bg-red-600/10 text-red-600 rounded-full p-1"
            />
            <button
              type="submit"
              className="border border-black hover:text-white hover:bg-green-800/70 px-3 py-1 rounded ml-6 mb-3 absolute top-7 left-0"
            >
              Save Plan
            </button>
            <textarea
              required
              value={longText}
              onChange={(e) => setLongText(e.target.value)}
              placeholder="Long Text"
              className="bg-transparent border placeholder:text-black/70 border-black min-h-[150px] max-h-[300px] shadow  w-11/12 px-3 py-2 text-sm rounded focus:outline-none "
            />
            {inputFields.map((input, index) => (
              <label
                key={index}
                className="mt-3 border flex items-center justify-between bg-transparent shadow w-11/12 px-3 border-gray-900 py-2 text-sm rounded focus:outline-none"
              >
                <input
                  value={input}
                  onChange={(e) => changeInputValue(index, e)}
                  type="text"
                  key={index}
                  placeholder="Point"
                  className="w-full mr-1 bg-transparent focus:outline-none placeholder:text-black/30"
                ></input>
                <FiX
                  onClick={() => deleteInput(index)}
                  className="cursor-pointer text-red-600 bg-red-600/10 rounded-full text-xl p-1"
                />
              </label>
            ))}
            <div onClick={() => addInput()}>
            <FiPlus className="text-green-400 bg-green-400/10 cursor-pointer backdrop-blur-md text-xl rounded-full mt-3" />
            </div>
          </form>
        )}
        {isEditText && (
          <form
            onSubmit={(e) => editSubmit(e)}
            className="w-full flex flex-col items-center justify-center fixed top-0 left-1/2 -translate-x-1/2 bg-gray-300/10 backdrop-blur-xl h-screen max-w-[400px]"
          >
            <FiX
              onClick={() => setIsEditText(false)}
              className=" text-xl absolute top-7 cursor-pointer right-4"
            />
            <button
              type="submit"
              className="border border-black hover:border-none hover:text-white hover:bg-green-400 px-3 py-1 rounded ml-6 mb-3 absolute top-7 left-0"
            >
              Save Plan
            </button>
            <textarea
              required
              defaultValue={editLongText}
              onChange={(e) => setEditLongText(e.target.value)}
              placeholder="Long Text"
              className="bg-transparent border placeholder:text-black/70 border-black min-h-[150px] max-h-[300px] shadow  w-11/12 px-3 py-2 text-sm rounded focus:outline-none "
            />
            {editInputFields.map((input, index) => (
              <label
                key={index}
                className="mt-3 border flex items-center justify-between bg-transparent shadow w-11/12 px-3 border-gray-900 py-2 text-sm rounded focus:outline-none"
              >
                <input
                  defaultValue={input}
                  onChange={(e) => changeInputEditValue(index, e)}
                  type="text"
                  key={index}
                  placeholder="Point"
                  className="w-full mr-1 bg-transparent focus:outline-none placeholder:text-black/30"
                ></input>
                <FiX
                  onClick={() => deleteEditInput(index)}
                  className="cursor-pointer text-gray-700"
                />
              </label>
            ))}
            <div onClick={() => addEditInput()}>
              <FiPlus className="text-green-400 bg-green-400/10 cursor-pointer backdrop-blur-md text-xl rounded-full mt-3" />
            </div>
          </form>
        )}
        <div className="flex w-full px-4 space-x-4 pt-2 mt-6 ">
          {day === undefined ? (
            <button
              className="border bg-green-400 text-white px-3 py-1 rounded mb-3"
              onClick={() => setIsNewText(true)}
            >
              New Plan
            </button>
          ) : (
            <button
              className="border text-white bg-blue-400 px-3 py-1 rounded mb-3"
              onClick={() => setIsEditText(true)}
            >
              Edit Plan
            </button>
          )}
          {day !== undefined && (
            <button
              className="border text-white bg-red-400 px-3 py-1 rounded mb-3"
              onClick={() => deletePlan()}
            >
              Delete Plan
            </button>
          )}
        </div>
        <div className="w-11/12 border border-black rounded-lg h-fit px-3 py-4 mx-auto mt-3">
          {day !== undefined ? (
            <>
              <h1 className="text-black mb-1 text-xs bg-gray-300 shadow w-fit px-4 py-1">
                Your plan this day
              </h1>
              {day.longText}
              <ul className="mt-3">
                {day.point.length > 0 && (
                  <li className="text-black text-xs bg-gray-300 shadow w-fit px-4 py-1">
                    Poin
                  </li>
                )}
                {day.point.map((poin, index) => (
                  <li key={index}>- {poin}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>No one plan in this today</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
