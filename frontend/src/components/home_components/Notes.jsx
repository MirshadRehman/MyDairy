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
    const viewNote=(noteid)=>{
        localStorage.setItem('noteid',noteid);
        navigate('/viewnote');
    };
    const deleteNote=(e,delnoteid)=>{
        e.stopPropagation();
        fetch('/app/del/',{
            method:'POST',
            headers:{'Content-type':'application/json',},
            body:JSON.stringify({delnoteid}),
        })
        .then(res=>res.json())
        .then((data)=>{
            if(data.success){
            alert('Note deleted.');
            getData();
            }
            else{
                alert('deletion failed')
            }
        })
        
    };

    return(

        <div className="note-grid">
        {viewdata.map((note)=>(
            <div key={note.id}  onClick={()=>viewNote(note.id)} className="note_box">
            <div className="del">
                <h2>{note.title}</h2>
                <button onClick={(e)=>deleteNote(e,note.id)} className="image">
                    <img
                        src="delete.png"
                        alt="DL"
                        />
                </button>
            </div>          
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