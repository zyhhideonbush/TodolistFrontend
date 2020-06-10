import React from 'react' ;
import ReactDOM from 'react-dom' ;
import axios from 'axios' ;

class TodoApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        items: {}, 
        text: '',
        success: false,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
      axios.get('http://localhost:3001/todos')
      .then(response=>{
        let data = response.data.map(data=>data.item);
        console.log(data);
        this.setState({items:data,success:true});
      });
    }
   
    render() {
      return (
        <div>
          <h3>TODO-LIST</h3>
          <ul>
          {this.state.success?
          this.state.items.map((item,index)=>(
            <li key={item}>{item}</li>
          ))
          :
          'loading......'}
         </ul>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="new-todo">
              What needs to be done?
            </label>
            <input
              id="new-todo"
              onChange={this.handleChange}
              value={this.state.text}
            />
            <button>
              Add #{this.state.items.length + 1}
            </button>
          </form>
        </div>
      );
    }

    handleChange(e) {
      this.setState({ text: e.target.value });
    }
  
    handleSubmit(e) {
      e.preventDefault();
      if (this.state.text.length === 0) {
        return;
      }
      this.setState({success: false});
      axios.post('http://localhost:3001/todos',{item:this.state.text})
      .then(response=>{
        if(response.status===200){
          window.location.reload();
        }
      });
    }
  }
  
  ReactDOM.render(
    <TodoApp />,
    document.getElementById('todos-example')
  );