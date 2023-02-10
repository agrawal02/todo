import React, {Fragment, useState } from 'react';
import "../component/TodoList.css" ;


function TodoList() {

  const [todoTask, setTodoTask]= useState("");
  const [todoList, setTodoList]= useState([]);

  const handleSubmit = (e)=>{
    e.preventDefault();
     if(todoTask === ""){
      alert("please add your task");
    }
    else {
      try{
        fetch("http://localhost:8000/add",{
          method: "POST",
          headers:{"Content-Type": "application/json"},
          body: JSON.stringify({todo_name:todoTask }),

        })
        .then((res)=> res.json());
        setTodoList([{todo_id: `${todoTask}`, todoTask}, ...todoList,]);
        setTodoTask("");
       }
       catch (err){
        console.error(err.message);
       }
      // alert(`${todoTask} => stored on server(XAMPP: phpMyAdmin)`);
    }
  };

  const handleDelete = (id)=>{
    try{
      fetch(`http://localhost:8000/${id}`,{
        method: "DELETE",
          headers:{"Content-Type": "application/json"},
          body: JSON.stringify({todo_name:todoTask }),
       })
       .then(()=>{
        setTodoList((tasks)=>tasks.filter((todo)=>
        todo.id != id
        ));
       });

      }
      catch(err){
        console.log("error occured");
      }
   
  };
 
   

  return (
    <Fragment>
    <div>
      <div className='container-fluid my-5'>
            <div className='row'>
                <div className='col-sm-6 mx-auto text-white shadow-lg p-3'>
                    <h1 className='text-center'>To-Do-List</h1>
                    <div className='row p-5'>
                        <div className='col-md-12'>
                          <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <span className="fw-bold text-center input-group-text">Enter the task : </span>
                                <input type="text" className="form-control" value={todoTask} onChange={(e)=> setTodoTask(e.target.value)} />
                                <button className="fw-bold px-5 btn btn-add-task" type="submit">Add Task</button>
                            </div>
                            </form>
                          </div>
                        <div className="conatiner">
                        
                       
                         <ul className="list-unstyled row m-5">
                          
                          {todoList.map((t)=>{
                            return(
                              <li className="list-group-item" key={t.todo_id}>
                                <span>{t.todoTask}</span>
                            <button onClick={()=> handleDelete(t.todo_id)}>
                            <i className="fa-solid fa-x"></i>
                            </button>
                            </li>

                            );
                          }
                          )
                            
                        }
                          </ul>
                          
                        
                        
                        </div>
                    </div>
                    
                </div> 
            </div>
        </div>

    </div>
    </Fragment>
  );
}

export default TodoList

