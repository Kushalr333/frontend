import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const TaskDetail = () => {
  const [task, setTask] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios.get(`/api/tasks/${id}`)
      .then(response => setTask(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`/api/tasks/${id}`)
      .then(() => history.push('/'))
      .catch(error => console.error(error));
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
          <Link to={`/edit/${task._id}`} className="btn btn-primary">Edit</Link>
          <button onClick={handleDelete} className="btn btn-danger ml-3">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
