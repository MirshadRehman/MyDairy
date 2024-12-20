import React,{useState,useEffect} from "react";
import Header from "./Header";
import './Viewnote.css';

function Viewnote(){

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

    return(
        <>
            <Header/>
            <div className="allview">
                <div className="view">
                    {view.map((vi)=>(
                        <div key={vi.id} className="view1">
                            <h2>{vi.title}</h2>
                            <p>{vi.date}</p>
                            <p>{vi.note}</p>
                        </div>
                    ))}
                

                </div>
            </div>

        </>
    );
}
export default Viewnote;