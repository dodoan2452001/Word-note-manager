import React, { useEffect, useState } from "react";
import EmptySate from "../components/EmptyState";
import TaskItem from "../components/TaskItem";

function Tasks() {
  const [word, setWord] = useState([]);
  const [input, setInput] = useState({ word: "", meaning: "", group: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [filerWord, setFilerWord] = useState([]);
  const [hasSearch, setHasSearch] = useState(false);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const save = localStorage.getItem("word");
    if (save) setWord(JSON.parse(save));
  }, []);
  useEffect(() => {
    localStorage.setItem("word", JSON.stringify(word));
  }, [word]);
  const Add = () => {
    if (!input.word || !input.meaning || !input.group) return;
    setWord([...word, { ...input, remembered: false }]);
    setInput({ word: "", meaning: "", group: "" });
  };
  const ToggleRemember = (i) => {
    const update = [...word];
    update[i].remembered = !update[i].remembered;
    setWord(update);
  };
  const StartUpdate = (i) => {
    setEditIndex(i);
    setInput({
      word: word[i].word,
      meaning: word[i].meaning,
      group: word[i].group,
    });
  };
  const UpdateWord = (i) => {
    const updateList = [...word];
    updateList[i] = {
      ...input,
      remembered: word[i].remembered,
    };
    setWord(updateList);
    setEditIndex(null);
    setInput({ word: "", meaning: "", group: "" });
  };
  const Search = () => {
    const words = input.word.trim().toLowerCase();
    const meanings = input.meaning.trim().toLowerCase();
    const groups = input.group;
    const result = word.filter((item) => {
      const MatchesWords =
        words === "" || item.word.toLowerCase().includes(words);
      const MatchesMeanings =
        meanings === "" || item.meaning.toLowerCase().includes(meanings);
      const MatchesGroups = groups === "" || item.group === groups;
      const MatchesRemember =
        filterType == "all"
          ? true
          : filterType === "remembered"
          ? item.remembered
          : !item.remembered;
      return (
        MatchesWords && MatchesMeanings && MatchesGroups && MatchesRemember
      );
    });
    setFilerWord(result);
    setHasSearch(true);
  };
  const DeleteWord = (i) => {
    const deletew = [...word];
    deletew.splice(i, 1);
    setWord(deletew);
  };
  const Reset = () => {
    setFilerWord("");
    setHasSearch(false);
  };
  return (
    <div>
      <h2 style={{ fontSize: "30px", color: "#f1f1f1" }} className="mb-4">
        Danh sách từ vựng
      </h2>
      <div className="d-flex align-items-start gap-2 mb-4">
        <input
          className="form-control form-control-lg w-25"
          placeholder="Từ mới"
          value={input.word}
          onChange={(e) => setInput({ ...input, word: e.target.value })}
        />
        <input
          className="form-control form-control-lg w-25"
          placeholder="Ý nghĩa"
          value={input.meaning}
          onChange={(e) => setInput({ ...input, meaning: e.target.value })}
        />
        <select
          className="form-control form-control-lg w-25"
          value={input.group}
          onChange={(e) => setInput({ ...input, group: e.target.value })}
        >
          <option value="">-- Chọn nhóm --</option>
          <option value={"Môn học"}>Môn học</option>
          <option value={"Phương Tiện"}>Phương Tiện</option>
          <option value={"Các loại tiếng"}>Các loại tiếng</option>
          <option value={"Thể thao"}>Thể thao</option>
          <option value={"Khác"}>Khác...</option>
        </select>
        <select
          className="form-control form-control-lg w-25"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">-- Tất cả --</option>
          <option value="remembered">Đã nhớ</option>
          <option value="notRemembered">Chưa nhớ</option>
        </select>
        <button
          className="btn btn-primary btn-lg"
          style={{
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "nowrap",
            padding: "0 16px",
          }}
          onClick={Add}
        >
          Thêm mới
        </button>
        <button
          className="btn btn-primary btn-lg"
          style={{
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "nowrap",
            padding: "0 16px",
          }}
          onClick={Search}
        >
          Tìm kiếm
        </button>
        <button
          className="btn btn-primary btn-lg"
          style={{
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "nowrap",
            padding: "0 16px",
          }}
          onClick={Reset}
        >
          Quay lại
        </button>
      </div>
      <div>
        {word.length === 0 ? (
          <EmptySate message="Chưa có từ mới nào được thêm" />
        ) : hasSearch && filerWord.length === 0 ? (
          <EmptySate message="Không có từ ngữ bạn đang tìm kiếm" />
        ) : (
          (hasSearch ? filerWord : word).map((item, i) => (
            <TaskItem
              key={i}
              index={i + 1}
              {...item}
              isEditing={editIndex === i}
              onToggle={() => ToggleRemember(i)}
              onDelete={() => DeleteWord(i)}
              onUpdate={() => UpdateWord(i)}
              onEdit={() => StartUpdate(i)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Tasks;
