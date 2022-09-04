import { createAsyncThunk } from "@reduxjs/toolkit";

export const validateSignIn = createAsyncThunk(
    'auth/validateSignIn',
    async ({ email, password, setJWT, setUserData }, { dispatch }) => {
        try {
            const reqObject={
                email,
                password,
            };
            const body=JSON.stringify(reqObject);
            const response = await fetch('http://task-management-back.herokuapp.com/api/signin',{
                method: "post",
                headers: { "Content-Type": "application/json" },
                body,
            }).then(res=>{
                if(res.status!==200) throw `${res.status}`;
                return res;
            }).then(res=>res.json());
            const { token } = response;
            dispatch(setJWT(token));
            dispatch(setUserData(token));
            return 'success';
        } catch (error) {
            return error;
        }
    }
);
export const validateSignUp = createAsyncThunk(
    'auth/validateSignUp',
    async ({ name, email, password, setJWT, setUserData }, {dispatch}) => {
        try {
            const reqObject={
                name,
                email,
                password
            };
            const body=JSON.stringify(reqObject);
            const response = await fetch('http://task-management-back.herokuapp.com/api/signup',{
                method: "post",
                headers: { "Content-Type": "application/json" },
                body,
            }).then(res=>{
                if(res.status!==200) throw `${res.status}`;
                return res;
            }).then(res=>res.json());
            const { token } = response;
            dispatch(setJWT(token));
            dispatch(setUserData(token));
            return "success"
        } catch (e) {
            return e;
        }
    }
);