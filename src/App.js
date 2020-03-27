import React, { useEffect, useState } from 'react';
import './App.scss';
import './scss/utils.scss';
import TodoInput from './base/Input/Input';
import Todo from './base/Todo/Todo';
import FilterList from './components/Filters/FilterList';
import './scss/clear_button.scss';
import RadioButton from './base/Input/RadioButton';
import {colorSelect} from './dummyData';
import {TransitionGroup,CSSTransition} from 'react-transition-group'; 


function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos"))||[]);
  const [input, setInput] = useState('');
  const [filters, setFilters] = useState([]);
  const [color,setColor] = useState(colorSelect[0].color);
  

  //setting data in the local storage so that it is persist even on page refresh
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));    
  })


  // adding a new todo in our todo array for it to be rendered
  //each todd item will have  heading, completed log and a dynamic color for it to have different priorities
  function addToTodos(e) {
    e.preventDefault()
    let temp = [...todos];

    let newTodo = {
      id:Math.floor(Math.random() * 100),
      heading: input,
      completed: false,
      color:color
    }

    //adding every new task to starting of array.
    temp.unshift(newTodo);
    setTodos(temp);
    setInput('');

  }

  //clear all the todo task we have
  function clearTodos(){
    setTodos([]);
    localStorage.removeItem('todos');
  }

  //adding filters to search todo item 
  function addFilters(e, tag) {
    if (!filters.find(item => item === tag)) {
      let temp = [...filters];
      temp.unshift(tag);
      setFilters(temp)
    }
    e.stopPropagation();
  }

  //mark if todo task has been completed
  //change completed to true will set task to done.
  //find the todo item by the heading. 
  //mark it completed then place it to the array recent first.
  function markComplete(todoIndex) {
    let tempTodos = [...todos];            
    if (todoIndex>=0&&!tempTodos[todoIndex].completed) {
      let temp = { ...tempTodos[todoIndex] };
      temp.completed = true;
      tempTodos.splice(todoIndex, 1);
      let recentCompletedIndex = tempTodos.findIndex(item=>item.completed===true);
      
      if (recentCompletedIndex<0) {
        tempTodos.push(temp);        
      }
      else{
        tempTodos.splice(recentCompletedIndex,0,temp);        
      }
      
      setTodos(tempTodos);
    }
  }

  //filter the array according the selected filters/hashtags 
  function filterData() {

    if (filters.length <= 0) {
      return todos;
    }

    else {
      //create a regex exp that returns true if every hashtag is a part of the todo heading
      let strRegEx = filters.reduce((target, hash) => {
        target = target + `(?=.*?${hash})`;
        return target
      }, '^')
      let regExForMatching = new RegExp(strRegEx);
      //return only todo items that match the expression
      let filteredTodo = todos.filter((todo) => regExForMatching.test(todo.heading));
      return filteredTodo
    }
  }

  return (
    <div className='container'>
      <div className="app">
      <div className='flex_justify_between'>
      <h1>things to do</h1>
      <button className='clear_button' onClick={clearTodos} style={{fontSize:'18px'}}>Clear</button>
      </div>
        
        {/* input for todo item */}
        <div>
          <TodoInput onSubmit={addToTodos}
            setInput={(e) => setInput(e.target.value)}
            value={input} />
        </div>

        {/* list of selected filters */}
        <div>
          {filters.length > 0 && <FilterList
            filters={filters}            
            clearFilters={() => { setFilters([]) }} />}
        </div>

        {/* buttons to select color for a todo item     */}
        <div className='mt-16 mt-16'>
        {colorSelect.map(item=><RadioButton key={item.color} selectedColor={color} color={item.color} name={item.name} onClick={()=>setColor(item.color)}/>)}                
        </div>

        {/* iterate over the elements in the todo array to show the todo list */}

        <TransitionGroup timeout={500}>  
                
            {
          filterData().map((todo,index) => {
            return ( <CSSTransition key={todo.id} timeout={500} classNames="my-node">
              <Todo               
              todo={todo}
                          
              addFilters={addFilters}              
              onClick={() => markComplete(index)} />
              </CSSTransition>
            )
          })
        }        
        </TransitionGroup>

      </div>
    </div>
  );
}

export default App;
