import React,{ useState,useContext,useEffect }  from 'react'
import {storeAPI} from '../axios'
import Swal from 'sweetalert2'
import { Modal,Button,Icon,Form,Input } from 'semantic-ui-react'
import { data } from '../DataCntxt'
import Validation from './Validation'

function StoreCreate(props) {

  const {getStrData}=useContext(data)
  const [values,setValues]=useState({
    name : '',
    address : ''
  })
  const[errors,setErrors]=useState({})
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    setErrors(Validation(values))
    
  }

//post opertion
  const postData= async()=>{
    try{
      await storeAPI.post('/',values)
      props.close()
      Swal.fire({
        position  :'top',
        title: "ADDED!",
        text: "Store added successfully",
        icon: "success",
        showConfirmButton: false,
        timer : 1200
      })
      setValues({name:'', address: ''})
      getStrData()    
      }catch(e){
          console.log(e.message)
        }
    }
  const handleChange=(e)=>{
      setValues({...values,[e.target.name]: e.target.value})
  }
  
  useEffect(()=>{     
      if(Object.keys(errors).length===0 && (values.name !=="" && values.address !== ""))
      postData()
  },[errors])
          
return(
  <div>
    <Modal
        size={'small'}
        open={props.open}
        onClose={() => props.close()}
      >
      <Modal.Header>Create Store</Modal.Header>
      <Modal.Content>
      <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>NAME</label>
        <Input placeholder='Name' name='name' onChange={handleChange} value={values.name} />
        
        </Form.Field>
        {errors.name && <p style={{color:"red"}}>{errors.name}</p>}
      <Form.Field>
      <label>ADDRESS</label>
        <Input placeholder='Address' name='address' onChange={handleChange} value={values.address}/>
        
      </Form.Field>
      {errors.address && <p style={{color:"red"}}>{errors.address}</p>}
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

export default StoreCreate