import React,{useState,useEffect} from 'react';
import './Login.css';
import {MDBCard,MDBCardBody,MDBInput, MDBCardFooter, MDBValidation, MDBBtn,MDBIcon,MDBSpinner} from "mdb-react-ui-kit";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import { register } from '../redux/features/authSlice';

const initalState={
  firstName:"",
  lastName:"",
  email:"",
  password:"",
  confirmPassword:""
}

const Register = () => {
    const [formValue, setFormValue]= useState(initalState);
    const {firstName,lastName,email,password,confirmPassword} = formValue;
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const handleSubmit=(e)=>{e.preventDefault();
    
         if(password !== confirmPassword){
           return toast.error("Comfirm Password is not same as Password ")          
         }

         if(firstName&&lastName&&email&&password&&confirmPassword){
          dispatch((register({formValue,navigate,toast})))
         }


         
    
    };
    const onInputChange=(e)=>{
        let {name, value} = e.target;
        setFormValue({...formValue,[name]:value});
    };
  return (
    <div className='loginContainer'>
        <MDBCard alignment='center'>
            <MDBIcon fas icon='user-circle' className='fa-2x'/>
            <h5>Sign In</h5>
            <MDBCardBody>
                <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
                <div className='col-md-6'>
                        <MDBInput label='First Name' type='text' value={firstName} 
                         name='firstName' onChange={onInputChange} validation='Please provide your First Name' required invalid='true' />  
                    </div>
                    <div className='col-md-6'>
                        <MDBInput label='Last Name' type='text' value={lastName} 
                         name='lastName' onChange={onInputChange} validation='Please provide your Last Name' required invalid='true' />  
                    </div>
                    <div className='col-md-12'>
                        <MDBInput label='Email' type='email' value={email} 
                         name='email' onChange={onInputChange} validation='Please provide your password' required invalid='true' />  
                    </div> 
                    <div className='col-md-12'>
                        <MDBInput label='Password' type='password' value={password} 
                        name='password' onChange={onInputChange} required   validation='Please provide your password'/>
                    </div>
                    <div className='col-md-12'>
                        <MDBInput label='Confirm Password' type='password' value={confirmPassword} 
                        name='confirmPassword' onChange={onInputChange} required   validation='Please provide your Confirm Password'/>
                    </div>
                    <div className="col-12">
                        <MDBBtn style={{width:'100%'}} className='mt-2'>Sign in</MDBBtn>
                    </div>
                </MDBValidation>
            </MDBCardBody>
            <MDBCardFooter>
                <Link to='/login'>
                <p>Already having account please? Log in</p>
                </Link>
            </MDBCardFooter>
        </MDBCard>

    </div>
  )
}

export default Register

