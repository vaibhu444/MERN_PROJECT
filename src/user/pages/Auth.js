import React, { useContext, useState } from "react";

import './Auth.css';
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/FormElements/Input";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Button from "../../shared/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context"

const Auth = () =>{

    const [isLoginMode, setIsLoginMode] = useState(true)
    const auth= useContext(AuthContext)
    const [formState, inputHandler, setFormData] = useForm({
        email:{
            value:'',
            isValid: false
        },
        password:{
            value:'',
            isValid: false
        }
    }, false);
    const authSubmitHandler=(event)=>{
        event.preventDefault();
        console.log(formState.inputs)
        auth.logIn()
    }

    const switchModeHandler = () =>{
        if(!isLoginMode){
            setFormData({
                ...formState.inputs,
                name: undefined
            },
            formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        }else{
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false);
        }
        setIsLoginMode(prevState => !prevState );
    }

    return <Card className="authentication">
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
            {
                !isLoginMode && (
                    <Input
                        element='input'
                        id='name'
                        type='text'
                        label='Your Name'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="please enter a name"
                        onInput={inputHandler}
                    />
                )

            }
            <Input 
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please Enter a Valid Email Address"
            onInput={inputHandler}
            />
            <Input 
            element="input"
            id="password"
            type="passeord"
            label="password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please Enter a Valid Password, at least 5 character"
            onInput={inputHandler}
            />
            
            <Button type="submit" disable={!formState.isValid}>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</Button>
        </form>
        {console.log(formState.isValid)}
        <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGNUP' :'LOGIN'}</Button>
    </Card>
}
export default Auth;