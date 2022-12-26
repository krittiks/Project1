import React,{ useState,useEffect, useContext }  from 'react'
import { prodsAPI } from '../axios'
import { Modal,Button,Icon,Form } from 'semantic-ui-react'
import Swal from 'sweetalert2'
import { data } from '../DataCntxt'
import  {ValidationP} from './Validation'

function ProdEdit(props) {
       
  const [prodEdit,setProdEdit]= useState
    ({
      name : '',
      price : ''
    })

  const {getProdData}=useContext(data)
  const[errors,setErrors]=useState({})

  const onInputChange = e =>{
    e.preventDefault()
    setProdEdit({...prodEdit,[e.target.name] : e.target.value})
    setErrors(ValidationP(prodEdit))
  }
    
    const editData=async()=>{
       try{
        await prodsAPI.put(`/${props.id}`,prodEdit)
        props.close()  
        Swal.fire({
          position: 'top',
          text: "Product updated successfully",
          icon: 'success',
          title: 'UPDATED!',
          showConfirmButton: false,
          timer: 1200
        })
        getProdData()
      }
     catch(err){
        console.log(err.message)
      }        
    }

    const handleSubmit=(e)=>{
      e.preventDefault()   
      if(Object.keys(errors).length===0 && (prodEdit.name !=="" && prodEdit.price !== ""))
      editData() 
      console.log(errors)  
    }

    useEffect(()=>{  
      setProdEdit({
        name : props.name,
        price : props.prc
      })      
      
    },[props.name,props.prc])
    
    return (
    <div>
        <Modal
        size={'small'}
        open={props.open}
        onClose={() => props.close()}
      >
      <Modal.Header>Edit Product</Modal.Header>
      <Modal.Content>
      <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>NAME</label>
        <input placeholder='Name' name='name' 
        value={prodEdit.name} onChange={onInputChange} />
       {errors.name && <p style={{color:"red"}}>{errors.name}</p>}
        </Form.Field>
      <Form.Field>
        <label>PRICE($)</label>
        <input placeholder='Price' name='price' 
        value={prodEdit.price} onChange={onInputChange}
        />
      {errors.price && <p style={{color:"red"}}>{errors.price}</p>}
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

export default ProdEdit
