import React from 'react'
const TodoItem = ({todo}) => {
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
        </tr>
         )
         }
const TodoList = ({todos}) => {
   return (
        <table>
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
           {todos.map((todo) => <TodoItem todo={todo} />)}
       </table>
) }
export default TodoList