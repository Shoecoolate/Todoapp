import React, { useState } from 'react'

import "./TaskForm.css";


const TaskForm = ({onSubmit, onChange, value, onSelect, status}) => {
    
    return (
        <header className='app_header'>
            <form onSubmit={onSubmit}> 
                <input value={value} onChange={onChange} type="text" className="task_input"
                placeholder='Enter your task' />

                <div className='task_form_bottom_line'>
                 {/*  <div>
                  <button className='tag'>HTML</button>
                  <button className='tag'>CSS</button>
                  <button className='tag'>JavaScript</button>
                  <button className='tag'>React</button>
                  </div>   */}
                  
                  <div>
                  <select value={status} onChange={onSelect} className='task_status'>
                    <option value="PENDING">To do</option>
                    <option value="IN_PROGRESS">in progress</option>
                    <option value="COMPLETED">completed</option>
                    </select>
                  {/*   <button type='submit'
                    className='task_submit'>
                        + Add Task
                    </button> */}
                    </div>  
                </div>
            </form>

        </header>
    )
}

export default TaskForm