import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
export default class Signup extends Component{
	constructor(props){
		super(props);
		this.state={
			data:[],
			user:JSON.parse(localStorage.getItem("user"))	
		}	
	}
	componentDidMount(){
		const requestOptions = {
      				  method: 'GET',
      				  headers: { 'Content-Type': 'application/json',
      				  "Authorization":"Bearer "+localStorage.getItem("jwt") }
   	 };
		fetch(`http://localhost:5000/mypost`,requestOptions)
		.then(res=>res.json())
		.then(data=>{
			if(data.error){
				//M.toast({html: data.error,classes:'#c62828 red darken-3'})			
			}	
			else{
				console.log(data);
				this.setState({data:data.mypost});	
			}
		})
		.catch(err=>{
			console.log(err);		
		})		
	}
	render(){
		if(this.props.l){
		return <div style={{maxWidth:"1250px" ,margin:"0px auto"}}> 
		<div style={{ display:"flex",justifyContent:"space-around",margin:"18px 0px",borderBottom:"2px solid grey"}}>
				<div  >
					<img style={{width:"160px", height:"160px", borderRadius:"80px"}} src="https://images.unsplash.com/photo-1485528562718-2ae1c8419ae2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
				</div>
				<div>
					<h4>{this.state.user.name}</h4>
					<div style={{display:"flex",justifyContent:"space-around",width:"108%"}}>
						<h6>40 posts</h6>
						<h6>40 followers</h6>
						<h6>40 following </h6>
					</div>
				</div>
			</div>
			<div className="galary">
				{this.state.data.map((item, id)=>{
					return <img key={id} className="item" src={item.photo} alt=""/>				
				})}
				</div>
		</div>
		}
		else{
			return <Redirect to="/signin"/>		
		}
	}
}
