import { React, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { v4 as uuid } from "uuid";
import useCreateDate from "../components/useCreateDate";
import { Link, useNavigate } from "react-router-dom";

function CreateNote({ setNotes }) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const date = useCreateDate();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && details) {
      const note = { id: uuid(), title, details, date };
      setNotes((prev) => [note, ...prev]);
      navigate("/");
      console.log(note);
    }
  };

  return (
    <section>
      <header className="create-note__header">
        <Link to="/" className="btn">
          <IoArrowBackOutline />
        </Link>
        <button onClick={handleSubmit} className="btn lg primary ">
          Save
        </button>
      </header>
      <form className="create-note__form">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          autoFocus
        />
        <textarea
          rows="28"
          placeholder="Note Details.."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>
      </form>
    </section>
  );
}

export default CreateNote;
