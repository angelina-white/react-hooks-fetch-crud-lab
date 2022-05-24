import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import {useEffect} from "react";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect (() =>
  {
    fetch("http://localhost:4000/questions")
    .then (resp => resp.json())
    .then((data) => 
    {
      setQuestions(data)
    })
  }, [])

  //submit form
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newObj = 
    {
      id: (questions.length+1),
      prompt: formData.prompt,
      answers: [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
      correctIndex: formData.correctIndex
    }

    fetch("http://localhost:4000/questions", 
    {
      method: "POST",
      headers: 
      {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObj),
    })
      .then((r) => r.json())
      .then((data) =>
      {
        setQuestions([...questions, data])
      })
  }

  //delete question
  const [deletedItemId, setDeletedItemId] = useState("")

  function handleDelete(event)
  {
    const deletedID = event.target.value
    setDeletedItemId(deletedID)
    

    fetch(`http://localhost:4000/questions/${event.target.value}`, 
    {
      method: "DELETE",
    })
    .then(resp => resp.json())
    
    const updatedItems = questions.filter((item) => 
    {
      return (item.id !== deletedItemId)
    })
    console.log(updatedItems)
    setQuestions(updatedItems);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/> : <QuestionList questions={questions} handleDelete={handleDelete}/>}
    </main>
  );
}

export default App;
