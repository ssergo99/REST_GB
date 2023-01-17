import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/Users.js'
import ProjectList from './components/Projects.js'
import TodoList from './components/Todo.js'
import ProjectTodoList from './components/Projecttodos.js'
import axios from 'axios'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'



const NotFound404 = ({ location }) => {
  return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div> )
}

class App extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           'users': [],
           'projects': [],
           'todos': []
       }
   }
   componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data.results
                    this.setState(
                {
                    'users': users
                }
            )
        }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/project/')
            .then(response => {
                const projects = response.data.results
                    this.setState(
                {
                    'projects': projects
                }
            )
        }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todo/')
            .then(response => {
                const todos = response.data.results
                    this.setState(
                {
                    'todos': todos
                }
            )
        }).catch(error => console.log(error))
}
   render () {
       return (
           <div className="App">
             <BrowserRouter>
             <nav>
               <ul>
                 <li>
                    <Link to='/users'>Users</Link>
                 </li>
                 <li>
                    <Link to='/projects'>Projects</Link>
                 </li>
                 <li>
                    <Link to='/todos'>ToDos</Link>
                 </li>
               </ul>
             </nav>

                <Switch>
                    <Route exact path='/users' component={()  =>  <UserList users={this.state.users} />}  />
                    <Route exact path='/projects' component={()  =>  <ProjectList projects={this.state.projects} />}  />
                    <Route exact path='/todos' component={()  =>  <TodoList todos={this.state.todos} />}  />

                    <Route path="/projects/:id">
                        <ProjectTodoList todos={this.state.todos} />
                    </Route>
                    <Route component={NotFound404} />
                </Switch>
             </BrowserRouter>
           </div>
      )
   }
}
export default App;
