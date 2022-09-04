import { createSlice } from '@reduxjs/toolkit';
import { addProject, loadProjects, updateProjectStatus } from './projectsThunks';

const initialState = {
    projectsData: [],
    status: 'idle',
    dragged: null,
};

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setStatus: (state,action)=>{
            state.status = action.payload;
        },
        setDragged: (state,action)=>{
            state.dragged = action.payload;
        },
        setProjectStatus: (state,action)=>{
            const status = action.payload;
            state.projectsData = state.projectsData.map(project=>{
                if(project._id===state.dragged.projectId)
                    project.status = status;
                return project;
            });
            state.dragged = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadProjects.pending, (state)=>{
                state.status = 'loading';
            })
            .addCase(loadProjects.fulfilled, (state, action)=>{
                const {error,response} = action.payload;
                if(error) return state.status = 'error';
                state.status = 'success';
                state.projectsData = response;
            })
            .addCase(addProject.fulfilled, (state, action)=>{
                const {error,project} = action.payload;
                state.status = 'success';
                if(error) return state.status = 'error';
                state.projectsData.push(project);
            })
            .addCase(updateProjectStatus.fulfilled, (state, action)=>{
                const {error} = action.payload;
                state.status = 'success';
                if(error) return state.status = 'error';
            })
    },
});

export const status = state=>state.projects.status;
export const dragged = state=>state.projects.dragged;
export const projectsData = state=>state.projects.projectsData;
export const { setStatus, setDragged, setProjectStatus } = projectsSlice.actions;

export default projectsSlice.reducer;
