import React, { useEffect, useState } from 'react';
import { getCompletedTasks, deleteTask } from '../../managers/TaskManager.js';
import { Card, CardBody, CardTitle,CardText,CardGroup, Col, Button } from 'reactstrap';

export const CompletedTasks = ({ loggedInUser }) => {
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
   
        getCompletedTasks(loggedInUser.id).then((data) => {
            setCompletedTasks(data)
            console.log(data)
        });

    }, [loggedInUser]);

    const handleDelete = (taskId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                deleteTask(taskId);
                getCompletedTasks(loggedInUser.id).then(setCompletedTasks);
            } catch (error) {
                console.error("Error deleting task", error);
            }
        }
    };

    return (
        <div>
      <h1 className="ps-4 mt-4 ">Completed Tasks</h1>
      <CardGroup>
        {completedTasks.map((task) => (
          <Col sm="4" key={task.id} className="m-4 mt-5">
            <Card>
              <CardBody>
                <CardTitle tag="h5">{task.title}</CardTitle>
                <CardText>{task.description}</CardText>
                {task.taskCategories.map((c, index) => (
                  <CardText key={index}>Category: {c.category.categoryName}</CardText>
                ))}
                <CardText>Important: {task.isImportantTask ? 'Yes' : 'No'}</CardText>
                <Button color="danger" onClick={() => handleDelete(task.id)}>Delete</Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </CardGroup>
    </div>
    );
};