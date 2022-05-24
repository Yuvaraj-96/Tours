import React,{useState}from 'react';
import{MDBNavbar,MDBContainer,MDBIcon, MDBNavbarNav,MDBNavbarItem, MDBNavbarLink, MDBNavbarToggler, MDBCollapse, MDBNavbarBrand} from "mdb-react-ui-kit"
import { useSelector,useDispatch } from 'react-redux';
import { setLogOut } from '../redux/features/authSlice';
import { searchTours } from '../redux/features/tourSlice';
import { useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';


const Header = () => {
    const [show, setShow]=useState(false);
    const [search, setSearch]= useState("")
    const{User} = useSelector((state)=>({...state.aut}));
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const token = User?.token;

    if(token){
        const decodedToken = decode(token);
        if(decodedToken.exp * 1000< new Date().getTime()){
            dispatch(setLogOut())
        }
    }



    const handleLogout=()=>{
        dispatch(setLogOut())
    }

    const handelSubmit=(e)=>{
        e.preventDefault();
        console.log("searchQuery : "+search)
        if(search){
            dispatch(searchTours(search));
            navigate(`/tours/search?searchQuery=${search}`)
            setSearch("")
        }else{
            navigate("/")
        }
    }
    const {user}= useSelector((state)=>({...state.auth}))
  return (
   <MDBNavbar fixed='top' expand='lg' style={{backgroundColor: '#f0edea'}}>
       <MDBContainer>
           <MDBNavbarBrand href='/' style={{color:'#606080',fontweight:'600', fontSize:'22px'}}>
             Yuvaraj Dashboard
           </MDBNavbarBrand>
           <MDBNavbarToggler type='button' aria-expanded ='false' aria-label='Toogle navigation'
           onClick={()=>{setShow(!show)}}  style={{color:'#606080'}}>
               <MDBIcon icon='bars' fas/>           
           </MDBNavbarToggler>
           <MDBCollapse show={show} navbar>
               <MDBNavbarNav right fullWidth={false} className='md-2 md-lg-0'>
                   {user?.result?._id&&(
                       <h5 style={{marginRight:'30px', marginTop:'27px'}}>Logged in as: {user?.result?.name}</h5>
                   )}
                   <MDBNavbarItem>
                       <MDBNavbarLink href='/'>
                           <p className='header-text'>Home</p>
                       </MDBNavbarLink>
                   </MDBNavbarItem>
                   {user?.result?._id&&(
                       <>
                        <MDBNavbarItem>
                        <MDBNavbarLink href='/addTour'>
                            <p className='header-text'>Add Tour</p>
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBNavbarLink href='/dashboard'>
                            <p className='header-text'>Dashboard</p>
                        </MDBNavbarLink>
                    </MDBNavbarItem>                    
                    </>
                   )}
                   {user?.result?._id?(                                         
                    <MDBNavbarItem>
                        <MDBNavbarLink href='/'>
                            <p className='header-text'onClick={handleLogout}>Logout</p>
                        </MDBNavbarLink>
                    </MDBNavbarItem>):(
                    <MDBNavbarItem>
                         <MDBNavbarLink href='/login'>
                            <p className='header-text' >Login</p>
                        </MDBNavbarLink>
                    </MDBNavbarItem>)}                 
               </MDBNavbarNav>
               <form className='d-flex input-group w-auto' onSubmit={handelSubmit}>
                   <input type='text' className='form-control' placeholder='Search Tour' value={search} onChange={(e)=>setSearch(e.target.value)}/>
                   <div style={{ marginLeft:"5px",marginTop:'5px'}}>
                       <MDBIcon fas icon='search' onClick={handelSubmit}></MDBIcon>
                   </div>

               </form>
           </MDBCollapse>
       </MDBContainer>
   </MDBNavbar>
  )
}

export default Header