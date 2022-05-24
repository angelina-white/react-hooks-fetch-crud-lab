import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, handleDelete}) {

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
      {questions.map((item) =>
      {
        return(
          <QuestionItem question={item} handleDelete={handleDelete} />
        )
      })}
      </ul>
    </section>
  );
}

export default QuestionList;
