import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/Users.js'
import ProjectList from './components/Projects.js'
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
                    <Route exact path='/projects' component={()  =>  <ProjectList projects={this.state.projects} />}  />
                    <Route exact path='/todos' component={()  =>  <TodoList todos={this.state.todos} />}  />
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
