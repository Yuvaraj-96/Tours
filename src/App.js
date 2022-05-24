import './App.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import {useDispatch} from 'react-redux';
import Header from './components/Header';
import {useEffect} from 'react';
import {setUser} from './redux/features/authSlice'
import AddEditTour from './pages/AddEditTour';
import SingleTour from './pages/SingleTour';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';
import TagTours from './pages/TagTours';


function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"))
 useEffect(()=>{
   dispatch(setUser(user));
 },[]);
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/tours/search" element={<Home/>}></Route>
        <Route path="/tours/tag/:tag" element={<TagTours/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>} ></Route>
        <Route path="/addTour" element={ <PrivateRoute><AddEditTour/></PrivateRoute> }></Route>
        <Route path="/editTour/:id" element={ <PrivateRoute><AddEditTour/></PrivateRoute> }></Route>
        <Route path="/tour/:id" element={<SingleTour/>}></Route>
        <Route path="/dashboard" element={ <PrivateRoute><Dashboard/></PrivateRoute>}></Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>   
    </div>
    </BrowserRouter>
  );
}

export default App;
