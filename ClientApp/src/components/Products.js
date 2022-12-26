import React, {useState, useEffect, Fragment, useContext} from 'react'
import {prodsAPI} from '../axios'
import { Table,Icon,Button,Dropdown } from 'semantic-ui-react'
import ProductCreate from './ProductCreate'
import ProdEdit from './ProdEdit'
import ProdDel from './ProdDel'
import { data } from '../DataCntxt'
import ReactPaginate from 'react-paginate'
import './Pagination.css'

export function Products() {
   
  const [modal,setModal]=useState(false)
  const [editModal,setEditModal]=useState(false)
  const [delModal,setDelModal]=useState(false)   
  const [posts2,setPosts2]=useState({
     name : '',
     price : '',
     prodId : null
   })
   
  const {prodPosts,getProdData} =useContext(data)
  const [pgno,setPgno]=useState(0)  
  const [userPerPage,setuserPerPage]=useState(3) 
  const pgVisited= pgno * userPerPage
  
  useEffect(()=>{   
    getProdData()
  },[])

  const getById=async(id)=>{
    const res2=await prodsAPI.get(`/${id}`)
    setPosts2({
      name : res2.data.name,
      price : res2.data.price,
      prodId : res2.data.prodId
    })
  }     
  
  const disp_data=prodPosts.slice(pgVisited, pgVisited + userPerPage).map((post)=>{
    return(    
      <tr key={post.prodId}>
        <td>{post.name}</td> 
        <td>${post.price}</td>
        <td>
        <Button color='yellow' icon className='ui icon button'  onClick={()=>{ getById(post.prodId)      
                                                                             setEditModal(true)
                                                                            }}>
          <Icon name='edit'/>Edit                    
          </Button>
        </td>
        <td>
        <Button color='red' icon className='ui icon button' onClick={()=>{ getById(post.prodId)
                                                                            setDelModal(true)
                                                                          }}>
          <Icon name='trash'/>Delete                    
          </Button>
        </td> 
      </tr>
    )})

    const tb_options=[
      {text : 'show 3', value : 3} ,
      {text : 'show 5', value : 5} ,
      {text : 'show 10', value : 10},
      {text : 'show 15', value : 15}
    ]
      
    const tb_change=(event,{value})=>{
      setuserPerPage(value)
    }

    const pgCnt =Math.ceil(prodPosts.length/userPerPage)

    const changePg=({selected})=>{
        setPgno(selected)
      }
   

  return (      
    <Fragment>    
    <div style={{margin : 20,marginLeft :150,marginRight:150}}>   
    <Button inverted color='blue' onClick={()=>{setModal(true)}}
    >
    Create Product
    </Button>
    <Table celled className="ui celled table" striped>
     <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>       
        {disp_data}        
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

  <ProductCreate
  open={modal}
  close={()=>setModal(false)}
  />

  <ProdEdit  
  open={editModal}
  close={()=>setEditModal(false)}
  id={posts2.prodId}
  prc={posts2.price}
  name={posts2.name}
  />

  <ProdDel
  open={delModal}
  close={()=>setDelModal(false)}
  id={posts2.prodId}
  name={posts2.name}
  /> 

  </div>
  </Fragment>
   )
}