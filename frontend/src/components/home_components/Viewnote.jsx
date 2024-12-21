import React,{useState,useEffect} from "react";
import Header from "./Header";
import './Viewnote.css';
import { useNavigate } from "react-router-dom";

function Viewnote(){
    const navigate=useNavigate();

    const [view,setview]= useState([]);
    const noteid=localStorage.getItem('noteid');
    const viewData=()=>{
            fetch('/app/view/',{
                method:'POST',
                headers:{'Content-type':'application/json',},
                body:JSON.stringify({noteid}),
            }).then(response=>response.json())
            .then((data)=>{
                if(data.success)
                {
                    setview(data.note);
                }
                else{console.error('failed to load')}
            })
    };
    useEffect(()=>{
        viewData();
    },[]);

    const Edit=(e,id,type)=>{
        const editedvalue= e.target.innerText;
        setview((previous)=>
            previous.map((edit)=>
                edit.id===id ? {...edit,[type]:editedvalue,}:edit
                ));
        fetch('app/update/',{
            method:'POST',
            headers:{'Content-type':'application/json',},
            body:JSON.stringify({type,editedvalue,id}),
        })
    };
    const deleteView=(id)=>{
        const delnoteid=id
        fetch('/app/del/',{
            method:'POST',
            headers:{'Content-type':'application/json',},
            body:JSON.stringify({delnoteid}),
        }).then(res=>res.json())
            .then((data)=>{
                if(data.success){
                    alert('Deleted !! Returning to Dashboard')
                    navigate('/home')

                }
                else{
                    alert('Deletion failed')
                }
            })
    };


    return(
        <>
            <Header/>
            <div className="allview">
                <div className="view">
                    {view.map((vi)=>(
                        <div key={vi.id} className="view1">
                            <h2 contentEditable
                                suppressContentEditableWarning
                                onBlur={(e)=>Edit(e,vi.id,'title')} className="viewtitle">{vi.title}</h2>
                            <div className="date">{vi.date}
                            <button onClick={()=>deleteView(vi.id)}>Delete</button></div>
                            <p contentEditable
                                suppressContentEditableWarning
                                onBlur={(e)=>Edit(e,vi.id,'note')} className="viewnote">{vi.note}</p>
                        </div>
                    ))}
                

                </div>
            </div>

        </>
    );
}
export default Viewnote;