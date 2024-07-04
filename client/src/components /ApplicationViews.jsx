import { Route, Routes } from "react-router-dom";

import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { AllTasks } from "./Tasks/TasksView.jsx";
import { CreateTask } from "./Tasks/CreateNewtask.jsx";
import { EditTask } from "./Tasks/EditTask.jsx";
import { CompletedTasks } from "./Tasks/CompletedTask.jsx";





export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <AllTasks loggedInUser={loggedInUser}/>
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
        {/* <Route path="/user-profile"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
            <ProfileView loggedInUser={loggedInUser}/>
          </AuthorizedRoute>}>
        </Route> */}
        <Route path="/create-task"
          element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <CreateTask loggedInUser={loggedInUser}/>
          </AuthorizedRoute>}>
          
        </Route>
        <Route path="/edit-task/:id"
          element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <EditTask loggedInUser={loggedInUser}/>
          </AuthorizedRoute>}>
        </Route>
        <Route path="/complete" 
          element={<AuthorizedRoute loggedInUser={loggedInUser}>
          <CompletedTasks loggedInUser={loggedInUser} />
          </AuthorizedRoute>}>
        </Route>
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
