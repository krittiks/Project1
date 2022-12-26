import React, { useEffect, useState} from 'react'
import { Modal,Button,Icon,Form,Dropdown } from 'semantic-ui-react'
import {useContext} from 'react'
import { data } from '../DataCntxt'
import { salesAPI } from '../axios'
import Swal from 'sweetalert2'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function SaleEdit(props) {

    const[CustId,setCustId]=useState()
    const[ProdId,setProdId]=useState()
    const[storeId,setStoreId]=useState()
    const allValues=useContext(data)
    const [DateSold, setDateSold] = useState()
           
  useEffect(()=>
  {    
    setDateSold(props.dsold)
    setCustId(props.cid)
    setStoreId(props.stid)
    setProdId(props.pid)   
  },[props.dsold,props.cid,props.stid,props.pid])
 
//post opertion
const editData= async()=>{
    try{      
      setDateSold(props.dsold)
      const all={DateSold,CustId,ProdId,storeId}
      await salesAPI.put(`/${props.sid}`,all)      
      props.close()
      Swal.fire({
        position: 'top',
        text: "Sale updated successfully",
        icon: 'success',
        title: 'UPDATED!',
        showConfirmButton: false,
        timer: 1200
      })
      props.getData();    
      }
      catch(e){
        console.log(e.message)
        }
    }
  
  const cusOptions= allValues.cusPosts.map((c)=>({
     text : c.name,
     value : c.custId    
  }))

const cusChange=(event,{value})=>{
 setCustId(value) 
 }

const prodOptions= allValues.prodPosts.map((p)=>({
    text : p.name,
    value : p.prodId
 }))

const prodChange=(event,{value})=>{
   setProdId(value)
   }

const strOptions= allValues.storePosts.map((p)=>({
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
      <Modal.Header>Edit Sales</Modal.Header>
      <Modal.Content>
      <Form>
      <Form.Field>
        <label>Date Sold</label>   
        <DatePicker 
        selected={DateSold}
        onChange={(date) => setDateSold(date)}         
        dateFormat="dd/MM/yyyy"
        />   
        </Form.Field>
      <Form.Field>     
        <label>Customer</label> 
        <Dropdown           
        fluid search 
        selection
        placeholder = {props.cname}      
        options={cusOptions}
        onChange={cusChange}  
        />      
      </Form.Field>
      <Form.Field>
        <label>Product</label>
      <Dropdown 
        fluid search selection 
        placeholder = {props.pname}
        options={prodOptions} 
        onChange={prodChange}
      />
      </Form.Field>
      <Form.Field>
        <label>Store</label>
        <Dropdown 
        fluid search selection 
        placeholder = {props.sname}
        options={strOptions} 
        onChange={strChange}
      />
      </Form.Field>
      <Modal.Actions>
          <Button positive type='submit' onClick={editData}
          >
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

export default SaleEdit