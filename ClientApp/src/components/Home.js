import React, {useState, useEffect, Fragment, useContext} from 'react'
import {custAPI} from '../axios'
import { Table,Icon, Button,Dropdown } from 'semantic-ui-react'
import CustomerCreate from './CustomerCreate'
import CustEdit from './CustEdit'
import CustDel from './CustDel'
import { data } from '../DataCntxt'
import ReactPaginate from 'react-paginate'
import './Pagination.css'

export function Home() {
   
   const [modal,setModal]=useState(false)
   const [editModal,setEditModal]=useState(false)
   const[delModal,setDelModal]=useState(false)   
   const [posts2,setPosts2]=useState({
     name : '',
     address : '',
     custId : null
   })
   const {cusPosts, getCusData}= useContext(data)
  const [pgno,setPgno]=useState(0)  
  const [userPerPage,setuserPerPage]=useState(3) 
  const pgVisited= pgno * userPerPage
  
   useEffect(()=>{  
          getCusData()
    },[])

  const getById=async(id)=>{
    const res2=await custAPI.get(`/getbyid/${id}`)
    setPosts2({
      name : res2.data.name,
      address : res2.data.address,
      custId : res2.data.custId
    })
  }    
 
  const dispUser=cusPosts.slice(pgVisited, pgVisited + userPerPage).map((post)=>{
    return(            
    <tr key={post.custId}>
      <td>{post.name}</td> 
      <td>{post.address}</td>
      <td>
        <Button color='yellow' icon className='ui icon button'  onClick={()=>{ getById(post.custId)      
                                                                               setEditModal(true)  
                                                                            }}
        >
        <Icon name='edit'/>Edit                    
        </Button>
      </td>
      <td>
        <Button color='red' icon className='ui icon button' onClick={()=>{ getById(post.custId)
                                                                           setDelModal(true)
                                                                          }}
        >
          <Icon name='trash'/>Delete                    
          </Button>
      </td>
    </tr>)
  })

    const tb_options=[
      {text : 'show 3', value : 3} ,
      {text : 'show 5', value : 5} ,
      {text : 'show 10', value : 10},
      {text : 'show 15', value : 15}
    ]
      
    const tb_change=(event,{value})=>{
      setuserPerPage(value)
    }

    const pgCnt =Math.ceil(cusPosts.length/userPerPage)

    const changePg=({selected})=>{
        setPgno(selected)
      }
   
    return (      
    <Fragment>    
    <div style={{margin : 20,marginLeft :150,marginRight:150}}>   
    <Button inverted color='blue' onClick={()=>{setModal(true)}}
    >
      Create Customer
    </Button>
   
    <Table celled className="ui celled table" striped>
     <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Address</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
        {dispUser}
    </Table.Body>

  </Table>
  </div>
  <div style={{marginLeft :150 }}>    
  <Dropdown           
    selection  
    placeholder ='show 3'
    defaultValue = {tb_options[0].value} 
    options={tb_options}
    onChange={tb_change}      
  />     
    
  <ReactPaginate 
    previousLabel = {'Prev'}
    nextLabel={'Next'}
    pageCount={pgCnt}
    onPageChange={changePg}
    containerClassName={'paginationBtns'}
    previousLinkClassName={'prevBtn'}   
    nextLinkClassName={'nextBtn'}
    disabledClassName={'pgndisabled'}
    activeClassName={'activepgn'}
  />
  </div>

  <CustomerCreate
  open={modal}
  close={()=>setModal(false)}
  />

  <CustEdit  
  open={editModal}
  close={()=>setEditModal(false)}
  id={posts2.custId}
  add={posts2.address}
  name={posts2.name}
  />

  <CustDel
  open={delModal}
  close={()=>setDelModal(false)}
  id={posts2.custId}
  name={posts2.name}
  />
      
  </Fragment>
  )  
}