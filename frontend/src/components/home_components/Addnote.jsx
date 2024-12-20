import React,{useState} from "react";
import './Addnote.css';
import { useNavigate } from "react-router-dom";
import Header from "./Header";

// function userID({message}){
//     return <h2>{message}</h2>;
// }

function Addnote(){
    
    const userid1= localStorage.getItem('userid');
    const navigate=useNavigate();
    const [notedata,setnotedata]=useState({
        title:'',
        addnote:''
       
    });   

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setnotedata({
            ...notedata, [name]: value
        })
    };
   
   
    const handleAdd=(e)=>{
        e.preventDefault();
        fetch('/app/add/',{
            method:'POST',
            headers:{'Content-type':'application/json',},
            body:JSON.stringify({
                                  title:notedata.title,
                                  addnote:notedata.addnote,
                                  userid:userid1,
            }),
        }).then(response=>response.json())
            .then((data)=>{
                console.log('success: ',data);
                if(data.success){                
                alert('Note saved');
                navigate('/home');
                }
                else{
                    alert('Saving failed. No data provided');
                }
            })
            .catch((error)=>{
                console.error('Error',error);
                
            })
    }

    return(
        <>
        <Header/>
        <div className="all">
            <div className="add">
                <h1>Add Notes</h1>
                <input className="addtitle"
                    type="text" 
                    name="title" 
                    id="title"
                    placeholder="Title"
                    value={notedata.title}
                    onChange={handleChange}

                    required/>
                    <br/>
                
                <input className="addnote"
                    type="text"
                    name="addnote"
                    id="addnote"
                    placeholder="add note"
                    value={notedata.addnote}
                    onChange={handleChange}

                    required/>
               

                
                    <br/>
                <button onClick={handleAdd}>Save</button>
            </div>
        </div>
        </>
    );
}
export default Addnote;