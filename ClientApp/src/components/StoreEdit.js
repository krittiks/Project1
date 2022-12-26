import React,{ useState,useEffect,useContext }  from 'react'
import { storeAPI } from '../axios'
import { Modal,Button,Icon,Form } from 'semantic-ui-react'
import Swal from 'sweetalert2'
import { data } from '../DataCntxt'
import Validation from './Validation'

function StoreEdit(props) {

  const {getStrData} =useContext(data)    
  const[errors,setErrors]=useState({}) 
  const [strEdit,setstrEdit]= useState({
    name : '',
    address : ''
    })

  const handleSubmit=(e)=>{
      e.preventDefault()   
      if(Object.keys(errors).length===0 && (strEdit.name !=="" && strEdit.address !== ""))
      editData() 
      
    }
  const onInputChange = e =>{
    e.preventDefault()
    setstrEdit({...strEdit,[e.target.name] : e.target.value})
    setErrors(Validation(strEdit))  
  }
    
    const editData=async()=>{
      try{
        await storeAPI.put(`/${props.id}`,strEdit)
        props.close()     
        Swal.fire({
          position: 'top',
          text: "Store updated successfully",
          icon: 'success',
          title: 'UPDATED!',
          showConfirmButton: false,
          timer: 1200
        })       
        getStrData()
      }
     catch(err){
        console.log(err.message)
     }            
    }

     useEffect(()=>{  
      setstrEdit({
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
      <Modal.Header>Edit Store</Modal.Header>
      <Modal.Content>
      <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>NAME</label>
        <input placeholder='Name' name='name' 
        value={strEdit.name} onChange={onInputChange} />
        {errors.name && <p style={{color:"red"}}>{errors.name}</p>}
        </Form.Field>
      <Form.Field>
        <label>ADDRESS</label>
        <input placeholder='Address' name='address' 
        value={strEdit.address} onChange={onInputChange}
        />
        {errors.address && <p style={{color:"red"}}>{errors.address}</p>}
      </Form.Field>
      <Modal.Actions>
          <Button positive type='submit'>
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

export default StoreEdit