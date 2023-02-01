import React from 'react'
import {useParams} from "react-router-dom"
const ProjectTodoItem = ({todo}) => {
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
const ProjectTodoList = ({todos}) => {
   let { id } = useParams();
   let filtered_todos = todos.filter((todo) => todo.project == id)
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
           {filtered_todos.map((todo) => <ProjectTodoItem todo={todo} />)}
       </table>
) }
export default ProjectTodoList