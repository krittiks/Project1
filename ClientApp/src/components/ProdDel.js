import React ,{useContext} from 'react'
import {prodsAPI} from '../axios'
import Swal from 'sweetalert2'
import { Modal,Button,Icon,Form } from 'semantic-ui-react'
import { data } from '../DataCntxt'

function ProdDel(props) {

  const{getProdData}=useContext(data)
   const delData=async()=>{
    try{
     const response= await prodsAPI.delete(`/${props.id}`) 
     props.close()   
     Swal.fire({
      position :'top',
      title: "DELETED!",
      text: "Product deleted successfully",
      icon: "warning",
      showConfirmButton: false,
      timer : 1200
    })    
     getProdData()
    }
    catch(e){
        console.log(e.message)
    }
 }

  return (
    <div>
      <Modal
      size={'small'}
      open={props.open}
      onClose={() => props.close()}
      >        
      <Modal.Header>Delete Product</Modal.Header>
      <Modal.Content>
      <Form>
      <Form.Field>
        <p>Are you sure you want to delete {props.name}?</p>   
            
      </Form.Field>
      <Modal.Actions>
          <Button positive  onClick={()=>delData()}>
            <Icon name='checkmark'/>Delete
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

export default ProdDel