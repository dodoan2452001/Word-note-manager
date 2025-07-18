import React, { useState, useEffect } from "react";

function Notes() {
  const [note, setNote] = useState("");
  useEffect(() => {
    const save = localStorage.getItem("note");
    if (save) setNote(save);
  }, []);
  useEffect(() => {
    localStorage.setItem("note", note);
  }, [note]);
  return (
    <div>
      <h2> Ghi chú từ vựng</h2>
      <textarea
        placeholder="Nhập ghi chú..."
        rows="10"
        cols="50"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
    </div>
  );
}

export default Notes;
