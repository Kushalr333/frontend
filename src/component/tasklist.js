import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          <h1>Task List</h1>
          <Link to="/add" className="btn btn-primary mb-3">Add New Task</Link>
          <div className="list-group">
            {tasks.map(task => (
              <Link to={`/task/${task._id}`} key={task._id} className="list-group-item list-group-item-action">
                {task.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
