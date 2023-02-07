import React from 'react'
import {Link} from 'react-router-dom'

const TodoItem = ({todo, deleteTodo}) => {
   return (
        <tr>
            <td>
               {todo.project}
           </td>
           <td>
               {todo.text}
           </td>
           <td>
               {todo.created_at}
           </td>
           <td>
               {todo.updated_at}
           </td>
           <td>
               {todo.status}
           </td>
            <td>
                <button onClick={ ()=>deleteTodo(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
         )
         }
const TodoList = ({todos, deleteTodo}) => {
   return (
       <div>
        <table>
            <tr>
                <th>
                   Project
               </th>
               <th>
                   Text
               </th>
               <th>
                   Created at
               </th>
               <th>
                   Updated at
               </th>
               <th>
                   Status
               </th>
                <th></th>
            </tr>
           {todos.map((todo) => <TodoItem todo={todo} key={todo.id} deleteTodo={deleteTodo} />)}
       </table>
        <Link to='/todos/create'>Create</Link>
       </div>
) }
export default TodoList