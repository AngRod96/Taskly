import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getTaskById, updateTask } from "../../managers/TaskManager.js";
import { Button, Form, FormGroup, Label } from "reactstrap";
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
            
                <Form onSubmit={handleSubmit}>
                     <h2>Edit Task</h2>
                    <FormGroup>
                        <Label htmlFor="title">Title</Label>
                        <input type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                    
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description">Description</Label>
                        <input type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                       
                        />
                    </FormGroup>
                <FormGroup>
                    <Label>Pick a category:</Label>
                    {categories?.map((c) => (
                        <Label key={c.id} check>
                            <input 
                                type="checkbox"
                                value={c.id}
                                checked={selectedCategories?.includes(c.id)}
                                onChange={() => handleCheckboxChange(c.id)}
                            /> 
                            {c.categoryName}
                        </Label>
                    ))}
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <input 
                            type="checkbox"
                            checked={isImportant}
                            onChange={(e) => setIsImportant(e.target.checked)}
                        />
                        Important?
                    </Label>
                </FormGroup>
                <Button type="submit">Save Changes</Button>
                </Form>
        
        )
    
}