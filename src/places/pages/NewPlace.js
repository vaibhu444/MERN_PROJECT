import React, { useCallback } from 'react';

import Input from '../../shared/FormElements/Input'
import Button from '../../shared/FormElements/Button'

import './PlaceForm.css'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';


const NewPlace = () =>{
    const [formState, inputHandler] = useForm(
        {
            inputs:{
                title:{
                    value:'',
                    isValid:false
                },
                description:{
                    value:'',
                    isValid:false
                }
            },
            isValid:false
        }, false)
    
    

    const placeSubmitHandler = (event) =>{
        event.preventDefault()
        console.log(formState)
    }

    const descriptionInputHandler = useCallback((id, value, isValid) =>{},[])


    return <form className='place-form' onSubmit={placeSubmitHandler}>
        <Input id='title' type='text' label='Title' element='input' validators={[VALIDATOR_REQUIRE()]} errorText='Please Enter Valid Text' onInput={inputHandler}/>
        <Input id='description' type='text' label='Description' element='textarea' validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(5)]} errorText='Please Enter Valid Description (at least 5 Characters)' onInput={inputHandler}/>
        <Input id='Address' type='text' label='Address' element='input' validators={[VALIDATOR_REQUIRE()]} errorText='Please Enter Valid Address' onInput={inputHandler}/>
        <Button type='submit' disabled={!formState.isValid}>ADD PLACE</Button>
    </form>
}

export default NewPlace