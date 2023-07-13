import React, { useState,useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
const emailreducer=(state,action)=>{
  if(action.type=="emial"){
    return {value:action.val,isvalid:action.val.includes('@')}
  }
  if (action.type=="emialhandler"){
    return {value:state.value,isvalid:state.value.includes('@')}
  }
  return {value:'',isvalid:false}

}

const passwordreducer=(state,action)=>{
  if(action.type=="password"){
    return {value:action.val,isvalid:action.val.length>6}
  }
  if (action.type=="passwordhandler"){
    return {value:state.value,isvalid:state.value.length>6}
  }
  return {value:'',isvalid:false}

}

const Login = (props) => {
  const [collegenamelIsValid, setcollegenameIsValid] = useState();
  const [enterecollegename, setEnteredcollegname] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);
const [emailstate,dispatch]=useReducer(emailreducer ,{value:'',isvalid:false})
const [passwordstate,dispatchpassword]=useReducer(passwordreducer ,{value:'',isvalid:false})

  const emailChangeHandler = (event) => {
    dispatch({type:"emial",val:event.target.value})

    setFormIsValid(
      passwordstate.value.trim().length > 6 && event.target.value.includes('@') && enterecollegename.trim().length>4
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchpassword({type:"password",val:event.target.value})

    setFormIsValid(
      passwordstate.value.trim().length > 6 && emailstate.value.includes('@') && enterecollegename.trim().length>4
    );
  };
const collegenameChangeHandler=(e)=>{
  setEnteredcollegname(e.target.value)
  setFormIsValid(
    e.target.value.trim().length > 4 && emailstate.value.includes('@') && passwordstate.value.trim().length>6
  );
}
  const validateEmailHandler = () => {
    dispatch({type:"emailhandler"})
  };

  const validatePasswordHandler = () => {
    dispatch({type:"passwordhandler"})
  };
  const validatecollegenameHandler=()=>{
    setcollegenameIsValid(enterecollegename.trim().length>=4)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailstate.value, passwordstate.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            collegenamelIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
           value={emailstate.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordstate.value === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordstate.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div  className={`${classes.control} ${
            passwordstate === false ? classes.invalid : ''
          }`}>
          <label htmlFor='collegename'>College-name</label>
          <input 
          type="text"
           id='collegename' 
           value={enterecollegename}
            onChange={collegenameChangeHandler}
            onBlur={validatecollegenameHandler}/>
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
