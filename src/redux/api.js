import axios from "axios"


const API = axios.create({baseURL:"http://localhost:5000"});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("profile")){
        req.headers.Authorization =`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;

    }
    return req;
})

export  const signIn = (FormData)=> API.post("/users/signin",FormData);

export  const signUp = (FormData)=> API.post("/users/signup",FormData);

export  const signUpGoogle = (result)=> API.post("/users/googleSigIn",result);


export const createTour =(tourData)=>API.post("/tour", tourData);

export const getTours =(page)=>API.get(`/tour?page=${page}`);

export const getTour =(id)=>API.get(`/tour/${id}`);

export const getToursByUser =(userId)=>API.get(`/tour/userTours/${userId}`);

export const deleteTour =(id)=>API.delete(`/tour/${id}`);

export const updateTour =(updatedTourData,id)=>API.patch(`/tour/${id}`,updatedTourData);

export const getToursBySearch =(searchQuery)=>API.get(`/tour/search?searchQuery=${searchQuery}`);

export const getTagTours =(tag)=>API.get(`/tour/tag/${tag}`);

export const getRelatedTours =(tags)=>API.post(`/tour/relatedTours`,tags);

