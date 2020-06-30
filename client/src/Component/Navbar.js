import React,{Component} from 'react';
import {Link} from 'react-router-dom';
export default class Navbar extends Component{
	render(){
		if(this.props.l){
		return <div>
		<nav>
    			<div className="nav-wrapper white">
      			<Link to="/" className="brand-logo left">Instagram</Link>
      			<ul id="nav-mobile" className="right hide-on-down">
        		<li><Link to="/profile">Profile</Link></li>
      		<li><Link to="/create">Create Post</Link></li>
      		<li> <button className="btn waves-effect waves-light #1e88e5 red darken-1" type="submit" name="action" onClick={()=>{
		localStorage.clear();
		
		this.props.change1();
		    
    }}>
    <i className=" right #1e88e5 red darken-1" >Login</i>
  </button></li>
      		</ul>
    			</div>
  			</nav>
			 
		</div>
	}
	else {
			return <div>
		<nav>
    			<div className="nav-wrapper white">
      			<Link to='/signin' className="brand-logo left">Instagram</Link>
      			<ul id="nav-mobile" className="right hide-on-down">
     			   <li><Link to="/signin">Login</Link></li>
        		<li><Link to="/Signup">Signup</Link></li>
      		</ul>
    			</div>
  			</nav> 
		</div>
	}
	}
}
/*
profile
create post
*/