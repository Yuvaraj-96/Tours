import React, { useEffect } from 'react'
import {MDBCol, MDBContainer,MDBRow, MDBTypography} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from 'react-redux';
//import { Link } from 'react-router-dom';
import { getTours, setCurrentPage } from '../redux/features/tourSlice';
import Card from '../components/Card/Card';
import Spinner from '../components/Spinner/Spinner';
import Pagination from '../components/Pagination';



const Home = () => {
  const {tours,loading,currentPage,numberOfPages} =  useSelector((state)=>({...state.tour}));
  const dispatch = useDispatch();//numberOfPages

  useEffect(()=>{
    dispatch(getTours(currentPage));
  },[currentPage]);

  if(loading){
    return <Spinner/>
  }

  return (
    
    <div style={{margin:'auto',padding:'15px', maxWidth:'1000px',alignContent:'center'}}>
      <MDBRow className='mt-5'>
        {tours.length === 0 && (
          <MDBTypography className='text-center mb-0' tag='h2'>
            No Tours Found
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow className='row-cols-1 row-cols-md-3 g-2'>
              {tours && tours.map((item,index)=><Card key={index}{...item}/>)}
            </MDBRow>

          </MDBContainer>
        </MDBCol>
      
      </MDBRow>  
      <Pagination 
      setCurrentPage={setCurrentPage} 
      numberOfPages={numberOfPages}
      currentPage={currentPage}
      dispatch={dispatch}
      />
      
    </div>
   
  )
}

export default Home