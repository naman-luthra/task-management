import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadProjects = createAsyncThunk(
    'projects/loadProjects',
    async () => {
        try {
            const response = await fetch('http://task-management-back.herokuapp.com/api/projects').then(res=>res.json());
            return {error:false, response};
        } catch (error) {
            return {error:true};
        }
    }
);

export const addProject = createAsyncThunk(
    'projects/addProject',
    async ({ title, description, status }, { getState }) => {
        try {
            const { auth } = getState();
            const project={
                title,
                description,
                author: auth.userDetails.userIndex,
                status
            };
            const body=JSON.stringify(project);
            const response = await fetch('http://task-management-back.herokuapp.com/api/add-project',{
                method: "post",
                headers: { "Content-Type": "application/json" },
                body,
            }).then(res=>res.json());
            const { insertedId } = response;
            project._id = insertedId;
            project.author = {
                _id: auth.userDetails.userIndex,
                name: auth.userDetails.userInfo.name,
                profileImage: auth.userDetails.userInfo.profileImage
            }
            return {error:false, project};
        } catch (error) {
            return {error:true};
        }
    }
)

export const updateProjectStatus = createAsyncThunk(
    'projects/updateProjectStatus',
    async ({ status }, { getState }) => {
        try {
            const { projects } = getState();
            const reqObj={
                _id: projects.dragged.projectId,
                status
            };
            const body=JSON.stringify(reqObj);
            const response = await fetch('http://task-management-back.herokuapp.com/api/update-project-status',{
                method: "post",
                headers: { "Content-Type": "application/json" },
                body,
            }).then(res=>res.json());
            return {error:false};
        } catch (error) {
            return {error:true};
        }
    }
)