import { useEffect, useState } from "react"
import { deleteTask, getAllTasks } from "../../managers/TaskManager.js"
import { Link } from "react-router-dom"
import { Card, CardGroup, CardText, CardTitle, Col, Row } from "reactstrap"
import "./task.css"



export const AllTasks = ({ loggedInUser }) => {
    const [task, setTasks] = useState([])


    useEffect(() => 
    {
        getAllTasks(loggedInUser.id ).then(setTasks);
    }, [])

    const handleDelete = async (taskId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await deleteTask(taskId).then(() => {
                    getAllTasks(loggedInUser.id).then(setTasks);
                })
        
            } catch (error)
            {
                console.error("error deleting task", error)
            }
        }
        }
    

    return (
        
            <>
            <h1>All Tasks</h1>
            <CardGroup>
            <Row>
                <div>
            {task.length === 0 ? (
                <p>No tasks found</p>
            ) : (
                   
                        <ul className="new-card">
                        
        
                        {task.map((task) => (
                            <>
                                    <Col sm="4" key={task.id}>
                                        <Card className="card-component">
                            <CardTitle tag="h5">{task.title}</CardTitle>
                            <CardText>{task.description}</CardText>
                            <p>Completed: {task.completedTask ? 'yes' : 'No'}</p>
                            <p>Important: {task.isImportantTask ? 'Yes' : 'No'}</p>
                                    <p>Date: {new Date(task.date).toLocaleString()}</p>
                                    <div>
                                        <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
                                    </div>
                                    <Link to={`/edit-task/${task.id}`}>   
                                        <button>Edit Task</button>
                                            </Link>   
                                            </Card>
                                    </Col>
                        
                      
                        </>
                        
                    ))}
                        </ul>
                           
                   
                    )}
                     </div>
                
              <Link to="/create-Task">
                                <button>Add Task</button>
                </Link>      
                </Row>
                </CardGroup>
          </>

    );
}
