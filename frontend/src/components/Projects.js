import React from 'react'
import {Link} from 'react-router-dom'

const ProjectItem = ({project, deleteProject}) => {
   return (
        <tr>
            <td>
               <Link to={`projects/${project.id}`}>{project.id}</Link>
           </td>
           <td>
               {project.title}
           </td>
           <td>
               {project.repolink}
           </td>
           <td>
               {project.user}
           </td>
            <td>
                <button onClick={ ()=>deleteProject(project.id)} type='button'>Delete</button>
            </td>
        </tr>
         )
         }
const ProjectList = ({projects, deleteProject}) => {
   return (
     <div>
        <table>
            <tr>
                <th>
                   ID
               </th>
                <th>
                   Title
               </th>
               <th>
                   Repo Link
               </th>
               <th>
                   User
               </th>
               <th></th>
            </tr>
           {projects.map((project) => <ProjectItem project={project} key={project.id} deleteProject={deleteProject}/>)}
       </table>
     <Link to='/projects/create'>Create</Link>
     </div>
) }
export default ProjectList