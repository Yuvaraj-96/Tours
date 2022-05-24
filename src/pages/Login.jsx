import React,{useState,useEffect} from 'react';
import './Login.css';
import {MDBCard,MDBCardBody,MDBInput, MDBCardFooter, MDBValidation, MDBBtn,MDBIcon,MDBSpinner} from "mdb-react-ui-kit";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import { login,googleSignIn } from '../redux/features/authSlice';
//import {GoogleLogin} from "react-google-login"
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const initalState={  
    email:"",
    password:""
  }

const Login = () => {
    const [formValue, setFormValue]= useState(initalState);
    const {email,password} = formValue;
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const handleSubmit=(e)=>{e.preventDefault();
    
         if(email&& password){
             dispatch((login({formValue,navigate,toast})))
         }
    
    };
    const onInputChange=(e)=>{
        let {name, value} = e.target;
        setFormValue({...formValue,[name]:value});
    };
    const parseJwt= (token)=> {
        
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
       var userDetails = decodeURIComponent(atob(base64).split('').map(function(c) {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
       }).join(''));
     //  console.log(userDetails)    
       return JSON.parse(userDetails); //JSON.stringify(JSON.parse(userDetails));
     };
    

    const googleSuccess=(res)=>{ 


       
       const useddata=parseJwt(res.credential);
     //  console.log(useddata)       
         const email = useddata.email;
         const name = useddata.name;
        const token = res.credential;
        const googleId =useddata['sub'] ;
        const result ={email,name,token,googleId};
        dispatch(googleSignIn({result,navigate,toast}))     
    }
    const googleFailure=(error)=>{console.log(error)}
  return (
    <div className='loginContainer'>
        <MDBCard alignment='center'>
            <MDBIcon fas icon='user-circle' className='fa-2x'/>
            <h5>Sign Up</h5>
            <MDBCardBody>
                <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
                    <div className='col-md-12'>
                        <MDBInput label='Email' type='email' value={email} 
                         name='email' onChange={onInputChange} validation='Please provide your password' required invalid='true' />  
                    </div>
                    <div className='col-md-12'>
                        <MDBInput label='Password' type='password' value={password} 
                        name='password' onChange={onInputChange} required   validation='Please provide your password'/>
                    </div>
                    <div className="col-12">
                        <MDBBtn style={{width:'100%'}} className='mt-2'>Login</MDBBtn>
                    </div>
                </MDBValidation>
                <br/>
                <GoogleOAuthProvider  clientId='237392026385-q8ae9g0ee13tl0culv5k92puhkfugfvk.apps.googleusercontent.com'>
                {/* <div className="g-signin2" data-onsuccess="onSignIn"> */}
                <GoogleLogin style={{width:"100%"}}
               
                // render={(renderProps)=>(
                //     <MDBBtn 
                //     style={{width:"100%"}} 
                //     color="danger" 
                //     onClick={renderProps.onClick}
                //     disabled={renderProps.disabled}>
                //         <MDBIcon className='me-2' fab icon='google'  />      Google Sign IN
                //     </MDBBtn>
                // )}
                width='calc(100% - 60px)'
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                flow= 'auth-code'                            
                />
                </GoogleOAuthProvider>
                
                    {/* <MDBBtn  onClick={()=>googlelogin()}> <MDBIcon className='me-2' fab icon='google'  />      Google Sign IN  cookiePolicy={'single_host_origin'}  
                    </MDBBtn>
                Google Sign IN */}
            </MDBCardBody>
            <MDBCardFooter>
                <Link to='/register'>
                <p>Don't have a account ? sign up</p>
                </Link>
            </MDBCardFooter>
        </MDBCard>

    </div>
  )
}

export default Login