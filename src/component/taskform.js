import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`/api/tasks/${id}`)
        .then(response => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setDueDate(response.data.dueDate.split('T')[0]);
        })
        .catch(error => console.error(error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { title, description, dueDate };

    if (id) {
      axios.put(`/api/tasks/${id}`, task)
        .then(() => history.push('/'))
        .catch(error => console.error(error));
    } else {
      axios.post('/api/tasks', task)
        .then(() => history.push('/'))
        .catch(error => console.error(error));
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          <h1>{id ? 'Edit Task' : 'Add New Task'}</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input type="date" className="form-control" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
