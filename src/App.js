import { useState, useRef } from "react";
import "./App.css";
import List from "./List";
import Form from './Form';

function App() {
  const [consumeList, setConsumeList] = useState([]);
  const [consumeValue, setConsumeValue] = useState("");
  const [costValue, setCostValue] = useState(0);
  const [submitOrEdit, setSubmitOrEdit] = useState(true);
  const [idToEdit, setIdToEdit] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [resultAlertBox, setResultAlertBox] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (consumeValue == "" || costValue == 0) return;
    if (submitOrEdit) {
      let newConsumed = {
        id: Date.now(),
        consumeTitle: consumeValue,
        cost: costValue,
      };
      setResultAlertBox("createItem");
      setTimeout(() => setResultAlertBox(null), 2000);
      setTotalCost(totalCost + newConsumed.cost);
      setConsumeList((prev) => [...prev, newConsumed]);

      setConsumeValue("");
      setCostValue("");
    } else {
      consumeList.map((data, index) => {
        if (data.id === idToEdit) {
          setTotalCost(totalCost - Number(data.cost) + costValue);
          data.consumeTitle = consumeValue;
          data.cost = costValue;
        }
      });
      setResultAlertBox("editItem");
      setTimeout(() => setResultAlertBox(null), 2000);
      setConsumeValue("");
      setCostValue("");
      setSubmitOrEdit(true);
    }
  };

  const consumeChange = (e) => {
    setConsumeValue(e.target.value);
  };

  const costChange = (e) => {
    setCostValue(Number(e.target.value));
  };

  const deleteAll = () => {
    setConsumeList([]);
    setTotalCost(0);
  };

  return (
    <div className="flex flex-col justify-center w-screen h-screen bg-yellow-600">
      <div className="flex flex-col items-center justify-center">
        {resultAlertBox === "createItem" ? (
          <div className="px-30 bg-green-600">아이템이 생성되었습니다.</div>
        ) : resultAlertBox === "editItem" ? (
          <div className="px-30 bg-yellow-500">아이템이 수정되었습니다.</div>
        ) : resultAlertBox === "removeItem" ? (
          <div className="px-30 bg-red-600">아이템이 삭제되었습니다.</div>
        ) : null}
        <div className="flex flex-row justify-items-start w-1/3">
        <div className="self-start font-semibold text-lg">예산계산기</div>
        </div>

        <div className="bg-white">
          <Form
          handleSubmit={handleSubmit} 
          consumeValue={consumeValue} 
          consumeChange={consumeChange} 
          costValue={costValue} 
          costChange={costChange} 
          submitOrEdit={submitOrEdit}/>
          <div className="account__list"></div>
          <div className="flex flex-col ">
            {consumeList.map((data, index) => (
              <List
                consumeList={consumeList}
                setConsumeList={setConsumeList}
                consumeTitle={data.consumeTitle}
                id={data.id}
                cost={data.cost}
                setConsumeValue={setConsumeValue}
                setCostValue={setCostValue}
                setSubmitOrEdit={setSubmitOrEdit}
                setIdToEdit={setIdToEdit}
                totalCost={totalCost}
                setTotalCost={setTotalCost}
                setResultAlertBox={setResultAlertBox}
              />
            ))}
          </div>
          <button onClick={deleteAll}
          className="bg-green-400 w-28 h-12 text-lg rounded-md m-4 text-white"
          >
          목록 지우기
          </button>
        </div>    
        <div>
          <div className="flex flex-row w-2/3"></div>  
          <div></div>
        <div className=" self-start font-semibold text-lg">총 지출:{totalCost}원</div>
        </div>
      </div>
    </div>
  );
}

export default App;
