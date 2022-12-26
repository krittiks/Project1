import React,{ useContext, useState,useEffect }  from 'react'
import {prodsAPI} from '../axios'
import Swal from 'sweetalert2'
import { Modal,Button,Icon,Form } from 'semantic-ui-react'
import { data } from '../DataCntxt'
import {ValidationP} from './Validation'

function ProductCreate(props) {

  const [values,setValues]=useState({
    name : '',
    price : ''
  })
  const[errors,setErrors]=useState({})

  const handleSubmit=(e)=>{
    e.preventDefault()
    setErrors(ValidationP(values))
    
  }

useEffect(()=>{     
    if(Object.keys((errors).length===0||null||{}) && (values.name !=="" && values.price !== null))
    postData()
},[errors])

const handleChange=(e)=>{
  setValues({...values,[e.target.name]: e.target.value})
}

const{getProdData}=useContext(data)
//post opertion
  const postData= async()=>{
    try{
      await prodsAPI.post('/',values)
      props.close()
      Swal.fire({
        position  :'top',
        title: "ADDED!",
        text: "Product added successfully",
        icon: "success",
        showConfirmButton: false,
        timer : 1200
      })
      setValues({name:'', price: ''})
      getProdData()
    }
      catch(e){
          console.log(e.message)
        }
    }
          
return(
  <div>
    <Modal
        size={'small'}
        open={props.open}
        onClose={() => props.close()}
      >
      <Modal.Header>Create Product</Modal.Header>
      <Modal.Content>
      <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>NAME</label>
        <input placeholder='Name' 
        name='name' 
        value={values.name}
        onChange={handleChange}
        />
        {errors.name && <p style={{color:"red"}}>{errors.name}</p>}
        </Form.Field>
      <Form.Field>
        <label>PRICE($)</label>
        <input placeholder='Price' 
        name='price' 
        value={values.price}
        onChange={handleChange}/>
        {errors.price && <p style={{color:"red"}}>{errors.price}</p>}
      </Form.Field>
      <Modal.Actions>
          <Button positive type='submit' >
            <Icon name='checkmark'/>Create
          </Button>
          <Button negative onClick={() => props.close()}>
          <Icon name='remove'/>Cancel
          </Button>
      </Modal.Actions>
      </Form>
      </Modal.Content>
    
      </Modal> 
  </div>
    )
}

export default ProductCreate