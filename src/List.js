import React, {useState, useRef} from "react";


export default function List({consumeList, setConsumeList, consumeTitle, id, cost ,setConsumeValue, setCostValue, setSubmitOrEdit, setIdToEdit, totalCost, setTotalCost, setResultAlertBox}) {

  const handleDelete = (id) => {
      const newConsumeList = consumeList.filter((data) => data.id !== id);
      setResultAlertBox("removeItem");
      setTimeout(()=>(setResultAlertBox(null)), 2000);
      setConsumeList(newConsumeList);
      setTotalCost(totalCost - cost);
  };

  const handleEdit = (id) => {
    setConsumeValue("");
    setCostValue(0);
    setSubmitOrEdit(false);
    setIdToEdit(id);
  };
  return (
    <div className="flex justify-between items-center gap-2 m-2 p-3 ring-2 ring-yellow-200 ring-inset rounded m-4 ">
      <span>{consumeTitle}</span>
      <span>{cost}</span>
      <div>
      <button className="w-10" onClick={()=>handleDelete(id)}><img src="https://cdn-icons-png.flaticon.com/128/5028/5028066.png"></img></button>
      <button className="w-10" onClick={()=>handleEdit(id)}><img src="https://cdn-icons-png.flaticon.com/128/420/420140.png"></img></button>
      </div>
    </div>
  );
}
