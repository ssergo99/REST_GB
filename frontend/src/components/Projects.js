import React from 'react'
import {Link} from 'react-router-dom'

const ProjectItem = ({project}) => {
   return (
        <tr>
            <td>
               <Link to={`projects/${project.id}`}>{project.id}</Link>
           </td>
           <td>
               {project.repolink}
           </td>
           <td>
               {project.users}
           </td>
        </tr>
         )
         }
const ProjectList = ({projects}) => {
   return (
        <table>
            <th>
               Title
           </th>
           <th>
               Repo Link
           </th>
           <th>
               Users
           </th>
           {projects.map((project) => <ProjectItem project={project} />)}
       </table>
) }
export default ProjectList