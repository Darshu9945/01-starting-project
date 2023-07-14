import React, { useState,useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
const emailreducer=(state,action)=>{
  if(action.type=="email"){
    return {value:action.val,isvalid:action.val.includes('@')}
  }
  if (action.type=="emailhandler"){
    return {value:state.value,isvalid:state.value.includes('@')}
  }
  return {value:'',isvalid:false}

}

const passwordreducer=(state,action)=>{
  if(action.type=="password"){
    return {value:action.val,isvalid1:action.val.length>6}
  }
  if (action.type=="passwordhandler"){
    return {value:state.value,isvalid1:state.value.length>6}
  }
  return {value:'',isvalid:false}

}

const Login = (props) => {

  const [formIsValid, setFormIsValid] = useState(false);
const [emailstate,dispatchemail]=useReducer(emailreducer ,{value:'',isvalid:false})
const [passwordstate,dispatchpassword]=useReducer(passwordreducer ,{value:'',isvalid:false})

  const emailChangeHandler = (event) => {
    dispatchemail({type:"email",val:event.target.value})

    setFormIsValid(
      passwordstate.value.trim().length > 6 && event.target.value.includes('@') 
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchpassword({type:"password",val:event.target.value})

    setFormIsValid(
      passwordstate.value.trim().length > 6 && emailstate.value.includes('@') 
    );
  };

  const validateEmailHandler = () => {
    dispatchemail({type:"emailhandler"})
  };

  const validatePasswordHandler = () => {
    dispatchpassword({type:"passwordhandler"})
  };
 

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailstate.value, passwordstate.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailstate.isvalid === false ? classes.invalid : ''
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
            passwordstate.isvalid1 === false ? classes.invalid : ''
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
