import { React, useEffect, useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import dummyNotes from "../dummy_notes";
import { Link } from "react-router-dom";
import NoteItem from "../components/NoteItem";

function Notes({ notes }) {
  const [showSearch, setShowSearch] = useState(false);
  const [text, setText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const handleSearch = () => {
    setFilteredNotes(
      notes.filter((note) => {
        if (note.title.toLowerCase().match(text.toLowerCase())) {
          return note;
        }
      })
    );
  };

  useEffect(handleSearch, [text]);

  return (
    <section>
      <header className="notes__header">
        {!showSearch && <h2>My Notes</h2>}
        {showSearch && (
          <input
            type="text"
            autoFocus
            placeholder="Keyword..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></input>
        )}
        <button
          className="btn"
          onClick={() => {
            setShowSearch((prev) => !prev);
            handleSearch();
          }}
        >
          {!showSearch ? <FaSearch /> : <MdClose />}
        </button>
      </header>
      <div className="notes__container">
        {filteredNotes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>
      <Link to="/create-note" className="btn add__btn">
        <FaPlus />
      </Link>
    </section>
  );
}

export default Notes;
