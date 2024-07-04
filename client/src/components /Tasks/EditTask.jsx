import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getTaskById, updateTask } from "../../managers/TaskManager.js";
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';

import { getAllCategories } from "../../managers/categoryManager.js";


export const EditTask = ({ loggedInUser }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [isImportant, setIsImportant] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getAllCategories().then(setCategories)
        getTaskById(id).then(task => {
            setTitle(task.title)
            setDescription(task.description)
            setIsImportant(task.isImportantTask)
            setSelectedCategories(task.taskCategories.map(c => c.categoryId))
            
        })
    }, [id]);

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


    const handleSubmit = async (e) => {
        e.preventDefault();

        const taskData = {
            title: title,
            description: description,
            completedTask: false,
            isImportantTask: isImportant,
            categories: categories,
            userId: loggedInUser.id,
            categoryIds: selectedCategories
        };
    
        await updateTask(id, taskData);
        navigate("/")
    }

        return (
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="w-100">
              <Col sm="12" md="8" lg="6" className="mx-auto">
                <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                  <CardBody>
                    <CardTitle tag="h2">Edit Task</CardTitle>
                    <Form onSubmit={handleSubmit}>
                      <FormGroup>
                        <Label style={{ color: "black" }} htmlFor="title">Title</Label>
                        <Input 
                          type="text"
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label style={{ color: "black" }} htmlFor="description">Description</Label>
                        <Input 
                          type="textarea"
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label style={{ color: "black" }}>Pick a category:</Label>
                        {categories.map((c) => (
                          <FormGroup check inline key={c.id}>
                            <Label style={{ color: "black" }}check>
                              <Input 
                                type="checkbox"
                                value={c.id}
                                checked={selectedCategories.includes(c.id)}
                                onChange={() => handleCheckboxChange(c.id)}
                              /> 
                              {c.categoryName}
                            </Label>
                          </FormGroup>
                        ))}
                      </FormGroup>
                      <FormGroup check>
                        <Label style={{ color: "black" }}check>
                          <Input 
                            type="checkbox"
                            checked={isImportant}
                            onChange={(e) => setIsImportant(e.target.checked)}
                          />
                          Important?
                        </Label>
                      </FormGroup>
                      <Button color="primary" type="submit">Save</Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        
        )
    
}