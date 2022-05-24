import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";



export const createTour = createAsyncThunk("auth/createTour",
 async({updateTourDate,navigate,toast},{rejectWithValue})=>{
    try{
        const response = await api.createTour(updateTourDate);
        toast.success("Tour Added Successfully");
        navigate("/");
        return response.data;

    }catch(err){
        return  rejectWithValue(err.response.data);
        //console.log(err);
    
    }
})


export const getTours = createAsyncThunk("auth/getTours",
 async(page,{rejectWithValue})=>{
    try{
        const response = await api.getTours(page);
        return response.data;

    }catch(err){
        return  rejectWithValue(err.response.data);
        //console.log(err);
    
    }
})


export const getTour = createAsyncThunk("tour/getTour",
 async(id,{rejectWithValue})=>{
    try{
        const response = await api.getTour(id);
        return response.data;

    }catch(err){
        return  rejectWithValue(err.response.data);
        //console.log(err);
    
    }
})

export const getToursByUser = createAsyncThunk("tour/getToursByUser",
 async(userId,{rejectWithValue})=>{
    try{
        const response = await api.getToursByUser(userId);
        return response.data;

    }catch(err){
        return  rejectWithValue(err.response.data);
        //console.log(err);
    
    }
})


export const deleteTour = createAsyncThunk("tour/deleteTour",
 async({id,toast},{rejectWithValue})=>{
    try{
        const response = await api.deleteTour(id);
        toast.success("Tour Delete Successfully");
        return response.data;

    }catch(err){
        return  rejectWithValue(err.response.data);
        //console.log(err);
    
    }
})

export const updateTour = createAsyncThunk("tour/updateTour",
 async({id,updateTourDate, toast,navigate},{rejectWithValue})=>{
    try{
        const response = await api.updateTour(updateTourDate,id);
        toast.success("Tour Updated Successfully");
        navigate('/');
        return response.data;

    }catch(err){
        return  rejectWithValue(err.response.data);
        //console.log(err);
    
    }
})


export const searchTours = createAsyncThunk("tour/searchTours",
 async(searchQuery,{rejectWithValue})=>{
    try{
        console.log("searchQuery : "+searchQuery)
        const response = await api.getToursBySearch(searchQuery);
        return response.data;

    }catch(err){
        return  rejectWithValue(err.response.data);
        //console.log(err);
    
    }
});

export const getToursByTag = createAsyncThunk("tour/getToursByTag",
 async(tag,{rejectWithValue})=>{
    try{
        
        const response = await api.getTagTours(tag);
        return response.data;

    }catch(err){
        return  rejectWithValue(err.response.data);
        //console.log(err);
    
    }
});

export const getRelatedTours = createAsyncThunk("tour/getRelatedTours",
 async(tags,{rejectWithValue})=>{
    try{       
        const response = await api.getRelatedTours(tags);
        return response.data;

    }catch(err){
        return  rejectWithValue(err.response.data);
        //console.log(err);
    
    }
});



const tourSlice = createSlice({
    name:"tour",
    initialState:{
       tour:{},
       tours:[],
       tagTours:[],
       userTours:[],
       relatedTours:[],
       currentPage:1,
       numberOfPages: null,
        error:"",
        loading:false,
    },
    reducers:{
        setCurrentPage: (state, action)=>{
            state.currentPage = action.payload;
        }
    },
    // reducers:{
    //     setUser:(state,action)=>{state.user=action.payload},

    //     setLogOut:(state,action)=>{
    //         localStorage.clear();
    //         state.user= null;},

    // },
    extraReducers:{
        [createTour.pending]:(state,action)=>{
            state.loading=true;
        },
        [createTour.fulfilled]:(state,action)=>{
            state.loading = false;
            state.tours= [action.payload];
        },
        [createTour.rejected]:(state,action)=>{
            state.loading= false;
            state.error= action.payload.message
        },
        [getTours.pending]:(state,action)=>{
            state.loading=true;
        },
        [getTours.fulfilled]:(state,action)=>{
            state.loading = false;
            state.tours= action.payload.data;
            state.numberOfPages = action.payload.numberOfPages;
            state.currentPage = action.payload.currentPage;
        },
        [getTours.rejected]:(state,action)=>{
            state.loading= false;
            state.error= action.payload.message
        },
        [getTour.pending]:(state,action)=>{
            state.loading=true;
        },
        [getTour.fulfilled]:(state,action)=>{
            state.loading = false;
            state.tour= action.payload;
        },
        [getTour.rejected]:(state,action)=>{
            state.loading= false;
            state.error= action.payload.message
        },

        [getToursByUser.pending]:(state,action)=>{
            state.loading=true;
        },
        [getToursByUser.fulfilled]:(state,action)=>{
            state.loading = false;
            state.userTours= action.payload;
        },
        [getToursByUser.rejected]:(state,action)=>{
            state.loading= false;
            state.error= action.payload.message
        },

        [deleteTour.pending]:(state,action)=>{
            state.loading=true;
        },
        [deleteTour.fulfilled]:(state,action)=>{
            state.loading = false;
            console.log("action", action);
            const{arg:{id}} = action.meta;
            if(id){
            state.userTours= state.userTours.filter((item)=>item._id !== id)
            state.tours= state.tours.filter((item)=>item._id !== id)
            }
        },
        [deleteTour.rejected]:(state,action)=>{
            state.loading= false;
            state.error= action.payload.message
        },
        [updateTour.pending]:(state,action)=>{
            state.loading=true;
        },
        [updateTour.fulfilled]:(state,action)=>{
            state.loading = false;
            console.log("action", action);
            const{arg:{id}} = action.meta;
            if(id){
            state.userTours= state.userTours.map((item)=>item._id === id? action.payload:item)
            state.tours= state.tours.map((item)=>item._id === id? action.payload:item)
            }
        },
        [updateTour.rejected]:(state,action)=>{
            state.loading= false;
            state.error= action.payload.message
        },

        [searchTours.pending]:(state,action)=>{
            state.loading=true;
        },
        [searchTours.fulfilled]:(state,action)=>{
            state.loading = false;
            state.tours= action.payload;
        },
        [searchTours.rejected]:(state,action)=>{
            state.loading= false;
            state.error= action.payload.message
        },

        [getToursByTag.pending]:(state,action)=>{
            state.loading=true;
        },
        [getToursByTag.fulfilled]:(state,action)=>{
            state.loading = false;          
            state.tagTours= action.payload;
        },
        [getToursByTag.rejected]:(state,action)=>{
            state.loading= false;
            state.error= action.payload.message
        },


        [getRelatedTours.pending]:(state,action)=>{
            state.loading=true;
        },
        [getRelatedTours.fulfilled]:(state,action)=>{
            state.loading = false;          
            state.relatedTours= action.payload;
        },
        [getRelatedTours.rejected]:(state,action)=>{
            state.loading= false;
            state.error= action.payload.message
        },
        
    }
})

export const {setCurrentPage} = tourSlice.actions;
export default tourSlice.reducer;