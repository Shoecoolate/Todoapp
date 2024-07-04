import React from "react";
import "./TaskForm.css";

const TaskForm = ({ onSubmit, onChange, value, onSelect, status, deadline, onDeadlineChange }) => {
  return (
    <header className="app_header">
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          className="task_input"
          placeholder="Enter your task"
        />
        <div className="deadline_container">
          <label htmlFor="deadline" className="deadline_label">Deadline:</label>
          <input
            id="deadline"
            value={deadline}
            onChange={onDeadlineChange}
            type="date"
            className="task_deadline"
          />
        </div>
        <div className="task_form_bottom_line">
          <div className="status_container">
            <label htmlFor="status" className="status_label">Current Progress:</label>
            <select
              id="status"
              value={status}
              onChange={onSelect}
              className="task_status"
            >
              <option value="PENDING">To do</option>
              <option value="IN_PROGRESS">In progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;
