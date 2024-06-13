import { Route, Routes } from "react-router-dom";

import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { AllTasks } from "./Tasks/TasksView.jsx";
import { CreateTask } from "./Tasks/CreateNewtask.jsx";



export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <AllTasks/>
            </AuthorizedRoute>
          }
        />
        
   
        
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
        <Route path="/create-task"
          element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <CreateTask loggedInUser={loggedInUser}/>
          </AuthorizedRoute>}>
          
        </Route>
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
