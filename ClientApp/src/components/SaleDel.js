import React from 'react'
import {salesAPI} from '../axios'
import { Modal,Button,Icon,Form } from 'semantic-ui-react'
import Swal from 'sweetalert2'

function SaleDel(props) {

    const delData=async()=>{
     try{
      await salesAPI.delete(`/${props.id}`) 
      props.close()   
      Swal.fire({
        position :'top',
        title: "DELETED!",
        text: "Sale deleted successfully",
        icon: "warning",
        showConfirmButton: false,
        timer : 1200
      })  
      props.getData()
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
        
      <Modal.Header>Delete Sales</Modal.Header>
      <Modal.Content>
      <Form>
      <Form.Field>
        <p>Are you sure you want to delete ?</p>   
            
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

export default SaleDel