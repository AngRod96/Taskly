import React, { useEffect, useState } from 'react';
import { createTask } from '../../managers/TaskManager';
import { getAllCategories } from '../../managers/categoryManager.js';
import { Label } from 'reactstrap';
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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <p>Pick a category:</p>
                {categories?.map((c) => (
                    <label check>
                        <input type="checkbox" value={c.id}
                            onChange={() => {
                            handleCheckboxChange(c.id)
                        }}
                        /> {c.categoryName}
                        
                    </label>
                        
                    
                ) )}
            </div>
            <div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={isImportant}
                        onChange={(e) => setIsImportant(e.target.checked)}
                    />
                    Important?
                </label>
            </div>
            </div>
            <button type="submit">Create Task</button>
        </form>
    );
};

