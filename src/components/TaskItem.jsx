import React from "react";

function TaskItem({
  index,
  word,
  meaning,
  group,
  remembered,
  isEditing,
  onToggle,
  onDelete,
  onUpdate,
  onEdit,
}) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "1rem",
        marginBottom: "0.5rem",
        background: remembered ? "#d4edda" : "#fff",
      }}
    >
      <p>
        <strong>STT: </strong>
        {index}
      </p>
      <p>
        <strong>Từ mới: </strong>
        {word}
      </p>
      <p>
        <strong>Ý nghĩa: </strong>
        {meaning}
      </p>
      <p>
        <strong>Nhóm: </strong>
        {group}
      </p>
      <button onClick={onToggle}>{remembered ? "Đã nhớ" : "Chưa nhớ"}</button>
      {isEditing ? (
        <button onClick={onUpdate}>Cập nhật</button>
      ) : (
        <button onClick={onEdit}>Sửa</button>
      )}
      <button onClick={onDelete}>Xóa</button>
    </div>
  );
}

export default TaskItem;
