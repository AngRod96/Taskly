import React, { useEffect, useState } from 'react';
import { createTask } from '../../managers/TaskManager';
import { getAllCategories } from '../../managers/categoryManager.js';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Card, CardBody } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

export const CreateTask = ({loggedInUser}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [isImportant, setIsImportant] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        getAllCategories().then(setCategories)
    }, [])

    const handleCheckboxChange = (categoryId) => {
        const chosenCategories = [...selectedCategories];
        const index = chosenCategories.indexOf(categoryId)
        if (index === -1)
        {
            chosenCategories.push(categoryId)
        }
        else
        {
            chosenCategories.splice(index, 1)
        }
        setSelectedCategories(chosenCategories)
    };

    const handleSubmit = (e) => {
        e.preventDefault()


        const taskData = {
            title : title,
            description : description,
            completedTask: false,
            isImportantTask: isImportant,
            userId: loggedInUser.id,
            categoryIds : selectedCategories
        };

        try {
            createTask(taskData).then(() => {
                navigate("/")
            }) ;
           
        } catch (error) {
            console.error("Error creating task:", error);
          
        }
    };

    return (
        (
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
              <Row className="w-100">
                <Col sm="12" md="8" lg="6" className="mx-auto">
                  <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                    <CardBody>
                      <Form onSubmit={handleSubmit}>
                        <FormGroup>
                          <Label for="title" className="form-label">Title:</Label>
                          <Input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="description" className="form-label">Description:</Label>
                          <Input
                            type="textarea"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-label">Pick a category:</Label>
                          {categories?.map((c) => (
                            <FormGroup check inline key={c.id}>
                              <Label check>
                                <Input
                                  type="checkbox"
                                  value={c.id}
                                  onChange={() => handleCheckboxChange(c.id)}
                                />
                                {c.categoryName}
                              </Label>
                            </FormGroup>
                          ))}
                        </FormGroup>
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="checkbox"
                              checked={isImportant}
                              onChange={(e) => setIsImportant(e.target.checked)}
                            />
                            Important?
                          </Label>
                        </FormGroup>
                        <Button color="primary" type="submit" className="mt-3">Create Task</Button>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
    ));
};

