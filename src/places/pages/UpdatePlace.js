import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Input from '../../shared/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Button from '../../shared/FormElements/Button';
import './PlaceForm.css'
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';

const DUMMY_PLACES = [
    {
      id: 'p1',
      title: 'Empire State Building',
      description: 'One of the most famous sky scrapers in the world!',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
      address: '20 W 34th St, New York, NY 10001',
      location: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creator: 'u1'
    },
    {
      id: 'p2',
      title: 'Emp. State Building',
      description: 'One of the most famous sky scrapers in the world!',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
      address: '20 W 34th St, New York, NY 10001',
      location: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creator: 'u2'
    }
  ];


function UpdatePlace() {
    const placeId = useParams().placeId
    const [isLoading, setIsLoading] = useState(true);

    const [formState, inputHandler, setFormData] = useForm({
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '', 
        isValid: false
      }
    },false)

    const identifiedPlace = DUMMY_PLACES.find(p=>p.id === placeId)

    useEffect(()=>{
      if(identifiedPlace){
        setFormData({
          title: {
            value: identifiedPlace.title,
            isValid: true
          },
          description: {
            value: identifiedPlace.description, 
            isValid: true
          }
        },true)
      }
      setIsLoading(false);
    }, [ setFormData, identifiedPlace])

    if(!identifiedPlace){
        return <div className='center'><Card><h2>Could Not Find Place !</h2></Card></div>
    }
  
    const placeUpdateSubmitHandler = (event) =>{
      event.preventDefault();
      console.log(formState?.inputs)
    }

    if(isLoading){
      return <div className='center'><h2>Loading ...</h2></div>
    }

  return (
    <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
        <Input id='title' element='input' type='text' label='Title' validators={[VALIDATOR_REQUIRE()]} errorText='please enter a valid title' onInput={inputHandler} initialValue={formState.inputs.title.value} initialValid={formState.inputs.title.isValid}/>
        <Input id='description' element='textarea' label='Description' validators={[VALIDATOR_MINLENGTH(5)]} errorText='please enter a valid description (min 5 character).' onInput={inputHandler} initialValue={formState.inputs.description.value} initialValid={formState.inputs.description.isValid}/>
        <Button type='submit' disable={!formState.isValid}>
            UPDATE PLACE
        </Button>
    </form>
  )
}
export default UpdatePlace
