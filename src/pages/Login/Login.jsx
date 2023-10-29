import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';

const Login = () => {

  const {signIn} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
       

        signIn(email, password)
        .then(result =>{
          const loggedInUser = result.user;
          console.log(loggedInUser);
          const user = {email};

          // get access token
          axios.post('http://localhost:5000/jwt', user, {withCredentials: true})
          .then(res =>{
            console.log(res.data);
            if(res.data.success){
              navigate(location?.state ? location?.state : '/')
            }
          })
      })
      .catch(error =>{
          console.error(error)
      });
    };

    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <div className="w-1/2">
      
      <img src={img} alt="" />
    </div>
    <div className="card w-1/2 shadow-2xl bg-base-100">
      <form onSubmit={handleLogin} className="card-body">
    <h1 className="text-3xl text-center font-bold">Login</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <input className="btn btn-error bg-[#FF3811] text-white normal-case" type="submit" value="Sign In" />
        </div>
      </form>
      <p className='text-center pb-6'>New to Car Doctors? <Link className='text-[#FF3811] font-bold' to='/signup'>Sign Up</Link></p>
    </div>
  </div>
</div>
    );
};

export default Login;