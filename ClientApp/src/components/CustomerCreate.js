import React,{ useState ,useEffect ,useContext}  from 'react'
import {custAPI} from '../axios'
import Swal from 'sweetalert2'
import { Modal,Button,Icon,Form,Input } from 'semantic-ui-react'
import { data } from '../DataCntxt'
import Validation from './Validation'

function CustomerCreate(props) {

  const {getCusData} =useContext(data)
  const [values,setValues]=useState({
    name : '',
    address : ''
  })
  const[errors,setErrors]=useState({})
      
const handleSubmit=(e)=>{
  e.preventDefault()
  setErrors(Validation(values))
 
}

useEffect(()=>{   
    if(Object.keys((errors).length=0||null||{}) && values.name !=="" && values.address !== "")
    postData()
},[errors])

//post opertion
  const postData= async()=>{   
    try{
      const res=await custAPI.post('/create',values)      
      props.close()
      Swal.fire({
        position  :'top',
        title: "ADDED!",
        text: "Customer added successfully",
        icon: "success",
        showConfirmButton: false,
        timer : 1200
      })
      setValues({name:'', address: ''})
      getCusData()
      
      }catch(e){
            console.log(e.message)
        }
    } 
       
  const handleChange=(e)=>{
    setValues({...values,[e.target.name]: e.target.value})
  }

  return(
  <div>
    <Modal
        size={'small'}
        open={props.open}
        onClose={() => props.close()}
      >
      <Modal.Header>Create Customer</Modal.Header>
      <Modal.Content>
      <Form onSubmit={handleSubmit}>        
      <Form.Field >
     
        <label>NAME</label>      
        <Input placeholder='Name'         
        name='name' 
        value={values.name}
        onChange={handleChange}
        />
        
      {errors.name && <p style={{color:"red"}}>{errors.name}</p>} 
      </Form.Field>
      
      <Form.Field>
        <label>ADDRESS</label>
        <Input placeholder='Address' 
        name='address' 
        value={values.address}
        onChange={handleChange}/>
          {errors.address && <p style={{color:"red"}}>{errors.address}</p>}
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

export default CustomerCreate