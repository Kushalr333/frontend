import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskDetail from './components/TaskDetail';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={TaskList} />
      <Route path="/add" component={TaskForm} />
      <Route path="/edit/:id" component={TaskForm} />
      <Route path="/task/:id" component={TaskDetail} />
    </Switch>
  );
};

export default App;
