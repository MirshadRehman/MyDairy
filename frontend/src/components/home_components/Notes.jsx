import React,{useState,useEffect} from "react";
import './Notes.css';
import {useNavigate} from 'react-router-dom';

function Notes(){
    const navigate=useNavigate();
    const addNote=()=>{
        navigate('/addnote');
    };
    

    const userid = localStorage.getItem('userid');
    const [viewdata,setviewdata]=useState([]);

    const getData=async ()=>{
        const response= await fetch('/app/get/',{
            method:'POST',
            headers:{'Content-type':'application/json',},
            body:JSON.stringify({userid}),
        });
        if(response.ok)
        {
            const data=await response.json();
            setviewdata(data.notes);
        }
        else{
            console.error('Failed to load= ',response.statusText);
        }
    };
    useEffect(()=>{
        getData();
    },[]);
    const viewNote=()=>{
        const noteid=viewdata.map((view)=>(view.id));
        localStorage.setItem('noteid',noteid);
        navigate('/viewnote');
    };

    return(

        <div className="note-grid">
        {viewdata.map((note)=>(
            <div key={note.id}  onClick={viewNote} className="note_box">
           
                
                <h2>{note.title}</h2>
                <p>{note.date}</p>
                <p>{note.note} </p>
             </div>  
            
        ))}
            
           
           
            
            <div className="add_note">
                <button onClick={addNote}>Create<br/>New Note</button>
            </div>
        </div>
    );

}
export default Notes;