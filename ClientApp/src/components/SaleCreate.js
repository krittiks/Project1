import React, { useContext, useState,useEffect} from 'react'
import { Modal,Button,Icon,Form,Dropdown, FormField } from 'semantic-ui-react'
import Swal from 'sweetalert2'
import { data } from '../DataCntxt'
import { salesAPI } from '../axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function SaleCreate(props) {

  const[CustId,setCustId]=useState()
  const[ProdId,setProdId]=useState()
  const[StoreId,setStoreId]=useState()
  const {cusPosts,prodPosts,storePosts}= useContext(data)
  const [DateSold, setDS] = useState(new Date())
        
  
  const handleSubmit =(e)=>{
    e.preventDefault()
  if((CustId==null) || (StoreId==null) || (ProdId==null))
  {
    Swal.fire({
      icon: 'error',
      title: 'All fields are required',
      text: 'Please fill all the fields',
      showConfirmButton: false,
    timer : 1200
    })
  
  }
  else
  postData()
  }
  const postData= async()=>{
    try{    
      await salesAPI.post('/',{DateSold,CustId,ProdId,StoreId})
      props.close()
      Swal.fire({
        position  :'top',
        title: "ADDED!",
        text: "Sale added successfully",
        icon: "success",
        showConfirmButton: false,
        timer : 1300
      })
     props.getData();  
     setDS(new Date())
      setCustId()
      setProdId()
      setStoreId()
      }
    
      catch(e){
        console.log(e.message)
        }    
    
  }
  useEffect(()=>{       
    setDS(new Date())
    setCustId()
    setProdId()
    setStoreId()
     
 },[])

  const cusOptions= cusPosts.map((c)=>({
        text : c.name,
        value : c.custId
     }))
   
  const cusChange=(event,{value})=>{
    setCustId(value)
  }

  const prodOptions= prodPosts.map((p)=>({
       text : p.name,
       value : p.prodId
    }))

  const prodChange=(event,{value})=>{
    setProdId(value)
  }
    
  const strOptions= storePosts.map((p)=>({
      text : p.name,
      value : p.storeId
   }))

 const strChange=(event,{value})=>{
    setStoreId(value)
  }

  return (
    <div>      
      <Modal
      size={'small'}
      open={props.open}
      onClose={() => props.close()}
      >
      <Modal.Header>Create Sales</Modal.Header>
      <Modal.Content>
      <Form onSubmit={handleSubmit}>
        <FormField>
            <DatePicker 
              selected={DateSold} 
              onChange={(date) => setDS(date)}       
              dateFormat='dd/MM/yyyy'
              minDate={new Date()}  
              />
      </FormField>
      
      <Form.Field>     
        <label>Customer</label> 
        <Dropdown  
        name='customer'         
        fluid search selection  
        placeholder ='---Select Customer---'
        options={cusOptions}
        onChange={cusChange} 
        />   
      
      </Form.Field>
     
      <Form.Field>
        <label>Product</label>
      <Dropdown 
        name='product'
        fluid search selection 
        placeholder ='---Select Product---'
        options={prodOptions}
        onChange={prodChange}
      />
      
      </Form.Field>
      <Form.Field>
        <label>Store</label>
        <Dropdown 
        name='store'
        fluid search selection 
        placeholder ='---Select Store---'
        options={strOptions}
        onChange={strChange}
      />
     
      </Form.Field>
      <Modal.Actions>
          <Button positive type='submit'
          >
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

export default SaleCreate