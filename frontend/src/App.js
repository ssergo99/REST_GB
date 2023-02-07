import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/Users.js'
import ProjectList from './components/Projects.js'
import ProjectForm from './components/ProjectForm.js'
import TodoForm from './components/TodoForm.js'
import TodoList from './components/Todo.js'
import ProjectTodoList from './components/Projecttodos.js'
import axios from 'axios'
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie';



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
           'todos': [],
           'token': ''
       }
   }
   set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.load_data())
   }
   is_authenticated() {
        return this.state.token !== ''
   }
   logout() {
        this.set_token('')
   }
   get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())
   }
   get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
   }

   get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
        }


   load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                this.setState({users: response.data.results})
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/project/', {headers}).then(response => {
            this.setState({projects: response.data.results})
        }).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
        axios.get('http://127.0.0.1:8000/api/todo/', {headers}).then(response => {
            this.setState({todos: response.data.results})
        }).catch(error => {
            console.log(error)
            this.setState({todos: []})
        })



   }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/project/${id}`, {headers}).then(response =>
        {this.setState({projects: this.state.projects.filter((project)=>project.id !== id)})
            }).catch(error => console.log(error))
   }

   deleteTodo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers}).then(response =>
        {this.setState({todos: this.state.todos.filter((todo)=>todo.id !== id)})
            }).catch(error => console.log(error))
   }

    createProject(title, repolink, user) {
        const headers = this.get_headers()
        const data = {title: title, repolink: repolink, user: user}
        axios.post(`http://127.0.0.1:8000/api/project/`, data, {headers}).then(response => {
                let new_project = response.data
                const user = this.state.users.filter((user) => user.id === new_project.user)
                new_project.user = user
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }

        createTodo(text, project) {
        const headers = this.get_headers()
        const data = {text: text, project: project}
        axios.post(`http://127.0.0.1:8000/api/todo/`, data, {headers}).then(response => {
                let new_todo = response.data.results
                const project = this.state.projects.filter((project) => project.id == new_todo.project)
                new_todo.project = project
                this.setState({todos: [...this.state.todos, new_todo]})
            }).catch(error => console.log(error))
    }

   componentDidMount() {
       this.get_token_from_storage()
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
                 <li>
                     {this.is_authenticated() ? <button
                     onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                 </li>
               </ul>
             </nav>

                <Switch>
                    <Route exact path='/users' component={()  =>  <UserList users={this.state.users} />}  />
                    <Route exact path='/projects' component={()  =>  <ProjectList projects={this.state.projects} deleteProject={(id)=>this.deleteProject(id)}  />}  />
                    <Route exact path='/projects/create' component={() => <ProjectForm users={this.state.users} createProject={(title, repolink, user) => this.createProject(title, repolink, user)} />}/>
                    <Route exact path='/todos' component={()  =>  <TodoList todos={this.state.todos} deleteTodo={(id)=>this.deleteTodo(id)} />}  />
                    <Route exact path='/todos/create' component={() => <TodoForm projects={this.state.projects} createTodo={(text, project) => this.createTodo(text, project)} />}/>
                    <Route exact path='/login' component={() => <LoginForm
                    get_token={(username, password) => this.get_token(username, password)}/>}/>
                    <Route path="/projects/:id">
                        <ProjectTodoList todos={this.state.todos} />
                    </Route>
                    <Redirect from='/' to='/projects' />
                    <Route component={NotFound404} />
                </Switch>
             </BrowserRouter>
           </div>
      )
   }
}
export default App;
