import React,{useState, useEffect} from 'react'
import {MDBCard, MDBCardBody, MDBValidation, MDBBtn, MDBInput,MDBValidationItem} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import {toast} from "react-toastify";
import {  useNavigate , useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
// import {  } from '../redux/api';
import { createTour, updateTour } from '../redux/features/tourSlice';
import Spinner from '../components/Spinner/Spinner';

const initalState={
    title:"",
    description:"",
    tags:[],
}

const AddEditTour = () => {
    const navigate= useNavigate();
    const [tourData,setTourData]=useState(initalState);
    const [tagErrMsg,setTagErrMsg]=useState(null);
    const {error, loading,userTours} = useSelector((state)=>({...state.tour}));
    const {user} = useSelector((state)=>({...state.auth}));
    const dispatch = useDispatch();
    const {id} = useParams();

    const {title,description,tags}=tourData;


    useEffect(()=>{
        if(id){
            const singleTour = userTours.find((tour)=>tour._id=== id);
            setTourData({...singleTour});
        }
    },[id])

    useEffect(()=>{
        error&& toast.error(error);
    },[error])
    if(loading){
        return <Spinner/>
      }
    const onInputChange=(e)=>{
        const {name,value}= e.target;
        setTourData({...tourData,[name]:value});
    };
    const handleAddTag=(tag)=>{
        setTourData({...tourData,tags:[...tourData.tags, tag]});

    };
    const handleDeleteTag=(deleteTag)=>{
        setTagErrMsg(null);
        setTourData({...tourData, tags:tourData.tags.filter((tag)=> tag !== deleteTag),})
    };
    const handleClear =()=>{
        setTourData( {title:"",
        description:"",
        tags:[],})
    };
    const handelSubmit=(e)=>{
        e.preventDefault();
        if(!tags.length){
            setTagErrMsg("Please Provide some Tags")
        }
        if(title && description && tags)
        {
            const updateTourDate = {...tourData, name:user?.result?.name}
            if(!id){
                dispatch(createTour({updateTourDate,navigate,toast}));

            }else{
                dispatch(updateTour({id,updateTourDate,toast,navigate}));
            }
           
            handleClear();
        }
        
    };
   
  return (
    <div style={{margin:"auto",
    padding:"15px",
    maxWidth:"450px",
    alignContent:"center",
    marginTop:"120px",
      
    }} className="container">
        <MDBCard alignment="center">
            <h5>{id?"Update Tour":"Add Tour"}</h5>
            <MDBCardBody>
                {/* noValidate */}
            <MDBValidation onSubmit={handelSubmit} className='row g-3'  >
            <MDBValidationItem className='mb-3 pb-1' feedback='Please provide title' invalid>
                <div className='col-md-12'>
                    <MDBInput placeholder='Enter Title' type='text' value={title} name='title' 
                    onChange={onInputChange}   className='form-control' required invalid="true" validation=""
                    />
                </div>
                </MDBValidationItem>
                <MDBValidationItem className='mb-3 pb-1' feedback='Please Provide Desciption' invalid>
                <div className='col-md-12'>
                    <MDBInput placeholder='Enter Description' type='text' value={description} name='description' 
                    onChange={onInputChange} style={{height:'100px'}} textarea="true" rows={4} className='form-control' required 
                   /> 
                </div>
                </MDBValidationItem>
                <div className='col-md-12'>
                    <ChipInput name='tags' variant='outlined' placeholder='Enter Tag' fullWidth
                    value={tags} onAdd={(tag)=>handleAddTag(tag)} onDelete={(tag)=>handleDeleteTag(tag)}/>
                    {tagErrMsg && <div className='tagErrMag'>{tagErrMsg}</div>}
                </div>
                <div className='d-flex justify-content-start'>
                    <FileBase type='file' multiple={false} onDone={({base64})=>setTourData({...tourData, imageFile:base64})}></FileBase>
                </div>
                <div className="col-12">
                    <MDBBtn style={{width:'100%'}}>{id?"Update":"Submit"}</MDBBtn>   
                    <MDBBtn style={{width:'100%'}} className='mt-2' color='danger' onClick={handleClear}>Clear</MDBBtn>   
                </div>               
            </MDBValidation>
            </MDBCardBody>
        </MDBCard>
    </div>
  )
}

export default AddEditTour