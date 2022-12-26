import React,{ useState,useEffect,useContext }  from 'react'
import { custAPI } from '../axios'
import { Modal,Button,Icon,Form } from 'semantic-ui-react'
import Swal from 'sweetalert2'
import { data } from '../DataCntxt'
import Validation from './Validation'

function CustEdit(props) {
       
  const {getCusData} =useContext(data)     
  const[errors,setErrors]=useState({})
    const [cusEdit,setCusEdit]= useState({
      name : '',
      address : ''
    })      
    
    const handleSubmit=(e)=>{
      e.preventDefault()   
      if(Object.keys(errors).length===0 && (cusEdit.name !=="" && cusEdit.address !== ""))
      editData() 
      
    }
    
    const editData=async()=>{
      try
      {
        await custAPI.put(`/update/${props.id}`,cusEdit)
        props.close()
        Swal.fire({
          position: 'top',
          text: "Customer updated successfully",
          icon: 'success',
          title: 'UPDATED!',
          showConfirmButton: false,
          timer: 1200
        })
       getCusData() 
      }
     catch(err)
     {
        console.log(err.message)
     }
    }

    const onInputChange = e =>{
      e.preventDefault()    
      setCusEdit({...cusEdit,[e.target.name] : e.target.value})
      setErrors(Validation(cusEdit))
    }
  
    useEffect(()=>{  
      setCusEdit({
        name : props.name,
        address : props.add
      })     
      
    },[props.name,props.add])
    
    return (
    <div>
      <Modal
      size={'small'}
      open={props.open}
      onClose={() => props.close()}
      >
      <Modal.Header>Edit Customer</Modal.Header>
      <Modal.Content>
      <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>NAME</label>
        <input placeholder='Name' name='name' 
        value={cusEdit.name} onChange={onInputChange} />
        
        {errors.name && <p style={{color:"red"}}>{errors.name}</p>}
        </Form.Field>
      <Form.Field>
        <label>ADDRESS</label>
        <input placeholder='Address' name='address' 
        value={cusEdit.address} onChange={onInputChange}
        />
        {errors.address && <p style={{color:"red"}}>{errors.address}</p>}
      </Form.Field>
      <Modal.Actions>
          <Button positive type='submit' >
          <Icon name='checkmark'/>Update
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

export default CustEdit