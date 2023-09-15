import React from 'react'

export default function Form({handleSubmit, consumeValue, consumeChange, costValue, costChange, submitOrEdit}) {
  return (
    <form onSubmit={handleSubmit} className="register">
            <div className="flex gap-2">
              <div>
                <div className="text-orange-300 m-2 text-lg">지출항목</div>
                <input
                  className="border-b-orange-300 border-b-2 w-80 h-12 m-2"
                  placeholder="예) 렌트비"
                  value={consumeValue}
                  onChange={consumeChange}
                />
              </div>
              <div>
                <div className="text-orange-300 hover:border-0 m-2 text-lg">비용</div>
                <input
                  placeholder={0}
                  value={costValue}
                  onChange={costChange}
                  className="border-b-orange-300 border-b-2 w-80 h-12 m-2"
                />
              </div>
            </div>
            <input
              className="bg-green-400 w-28 h-12 text-lg rounded-md m-4 text-white"
              type="submit"
              value={submitOrEdit ? "제출" : "수정"}
            ></input>
          </form>
  )
}
