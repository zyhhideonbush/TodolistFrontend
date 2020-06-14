import React, { useState, useEffect } from 'react' ;
import ReactDOM from 'react-dom' ;
import axios from 'axios' ;

const TodoApp = () => {
    const [ success , setSuccess ] = useState(false);
    const [ text , setText ] = useState('');
    const [ items , setItems ] = useState([]);
    const [ edittext , setEdittext ] = useState('');

    const handleInputOnFocus = (e) => {
      setEdittext(e.target.value);
    }
    const handleInputNoFocus = (todo) => {
      handleEdit(todo);
    }

    const handleSubmit = () => {
      axios.post('http://localhost:3001/todos',{item:text})
      .then(response=>{
        if(response.status===200){
          window.location.reload();
        }
      });
    }
    
    const getAllItemsFromAPI = () => {
      return axios.get('http://localhost:3001/todos')
      .then(response=>{
        let data = response.data.map(data=>data.item);
        return data ;
      });
    };

    const handleDelete = (todo) => {
      console.log(todo);
      axios({
        method: 'delete',
        url: 'http://localhost:3001/todos',
        data: {
          item: todo
        }
      })
      .then(response=>{
        if(response.status===200){
          window.location.reload();
        }
      });
    }

    const handleEdit = (todo) => {
      axios({
        method: 'put',
        url: 'http://localhost:3001/todos',
        data: {
          item: todo,
          newValue:edittext
        }
      })
      .then(response=>{
        if(response.status===200){
          window.location.reload();
        }
      });
    }

    useEffect(()=>{
      async function initItems(){
        const initailState = await getAllItemsFromAPI();
        console.log(initailState);
        setItems(initailState);
        setSuccess(true);
      }
      initItems();
    },[]);
    
    return (
      <div>
        <h3>TODO-LIST</h3>
        <ul>
        {success?
        items.map((todo,index)=>(
          <div key={todo}>
          <li>
            <input 
            id={todo} 
            type="text" 
            defaultValue={todo}
            onFocus={handleInputOnFocus}
            onBlur={handleInputNoFocus.bind(this,todo)}
            onChange={ (e) => {setEdittext(e.target.value)}}>
            </input>
            <button variant="contained" color="secondary" onClick={handleEdit.bind(this,todo)} 
            >
              edit
            </button>
            <button variant="contained" color="secondary" onClick={handleDelete.bind(this,todo)}>
              delete
            </button>
          </li>
          </div>
        ))
        :
        'loading......'}
      </ul>
        <form onSubmit={handleSubmit}>
          <label htmlFor="new-todo">
            What needs to be done?
          </label>
          <input
            id="new-todo"
            onChange={e => {setText(e.target.value)}}
          />
          <button>
            Add #{items.length + 1}
          </button>
        </form>
      </div>
    );
  }

ReactDOM.render(
  <TodoApp />,
  document.getElementById('todos-example')
);
  