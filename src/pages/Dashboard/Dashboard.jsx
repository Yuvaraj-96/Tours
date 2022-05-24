import React, { useEffect } from 'react';
import {MDBCard,MDBCardTitle,MDBCardText,MDBCardBody, MDBCardImage,MDBRow,MDBCol,MDBBtn,MDBIcon,MDBCardGroup} from"mdb-react-ui-kit";
import { useDispatch,useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import { getToursByUser,deleteTour } from '../../redux/features/tourSlice';
import Spinner from '../../components/Spinner/Spinner';
import { toast } from 'react-toastify';
import './Dashboard.css';
const Dashboard = () => {
    const {user} =useSelector((state)=>({...state.auth}));
    const {userTours,loading} = useSelector((state)=>({...state.tour}));
    const userId= user?.result?._id;
    const dispatch = useDispatch();
    const handelDelete=(id)=>{
      if(window.confirm("Are you sure you want to delete this tour ?")){
        dispatch(deleteTour({id,toast}))
      }
    }
    useEffect(()=>{
        if(userId){
            dispatch(getToursByUser(userId))
        }

    },[userId,dispatch])
    const excerpt=(str)=>{
      if(str.length>45){
        str= str.substring(0,40)+"  ....";
      }
      return str;
    }
    if(loading){
      return <Spinner/>
    }
  return (
    <div className='parent'>
      <h4 className='text-center'>Dashboard:{user?.result?.name}</h4>
      <hr style={{maxWidth:'570px'}}></hr>
      {userTours && userTours.map((item)=>(
        <MDBCardGroup key={item._id}>
          <MDBCard style={{maxWidth:"600px"}}
          key={item._id}
          className="mt-2"
          >
            <MDBRow className='g-0'>
              <MDBCol md='4'>
                <MDBCardImage className='rounded' src={item.imageFile}
                alt={item.title} fluid/>
              </MDBCol>
              <MDBCol>
                <MDBCardBody>
                  <MDBCardTitle className='text-start'>{item.title}</MDBCardTitle>
                  <MDBCardText className='text-muted'>
                    <small className='text-muted'>{excerpt(item.description)}</small>
                  </MDBCardText>
                  <div style={{marginLeft:"5px", float:"right", marginTop:"-60px"}} > 
                    <MDBBtn className='mt-1' tag="a" color="none">
                      <MDBIcon fas icon='trash' style={{color:"#dd4b39"}}  size='lg' onClick={()=>handelDelete(item._id)}  ></MDBIcon>
                    </MDBBtn>
                   
                    <Link to={`/editTour/${item._id}`}>
                    <MDBIcon fas icon='edit' style={{color:"#55acee", marginLeft:"10px"}} size='lg'></MDBIcon>                   
                    </Link>
                  </div>
                </MDBCardBody>

              </MDBCol>
            </MDBRow>

          </MDBCard>
        </MDBCardGroup>
      ))}
    
    </div>
  )
}

export default Dashboard