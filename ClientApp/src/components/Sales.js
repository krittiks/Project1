import React, {useState, useEffect, Fragment} from 'react'
import {salesAPI} from '../axios'
import { Table,Icon, Button , Dropdown} from 'semantic-ui-react'
import SaleCreate from './SaleCreate'
import SaleDel from './SaleDel'
import SaleEdit from './SaleEdit'
import ReactPaginate from 'react-paginate'
import './Pagination.css'
import moment from 'moment/moment'

function Sales() {

  const [saleModal,setSaleModal]=useState(false)
  const [editModal,setEditModal]=useState(false)
  const [delModal,setDelModal]=useState(false)        
  const [posts, setPosts]=useState([])
  const [saleId, setSaleId]=useState([])    
  const [cusName,setcusName]=useState([])
  const[CustId,setCustId]=useState([])
  const[ProdId,setProdId]=useState([])
  const [prodName,setProdName]=useState([])
  const[StoreId,setStoreId]=useState([])
  const [StoreName,setStoreName]=useState([])
  const[DateSold1,setDateSold1]=useState([])     
    
  const [pgno,setPgno]=useState(0)  
  const [userPerPage,setuserPerPage]=useState(3) 
  const pgVisited= pgno * userPerPage

  //using async await
     const getData= async()=> {
        try{
            const res=await salesAPI.get('/')
            res.data.reverse()
            setPosts(res.data)   
            }                                               
        catch(error)
        {
            console.log(error.message)
        }      
    }

    useEffect(()=>{       
      getData()    
   },[])

    //GETBYID method
    const getById=async(id)=>{
      const res2=await salesAPI.get(`/${id}`)
      setSaleId(res2.data.map((p)=>{ return(p.sale_id)})) 

      setcusName(res2.data.map((p)=>{ return(p.customer)}))
      setCustId(res2.data.map((p)=>{ return(p.cust_id)}))

      setProdName(res2.data.map((p)=>{ return(p.product)}))
      setProdId(res2.data.map((p)=>{ return(p.prod_id)}))

      setStoreName(res2.data.map((p)=>{ return(p.store)}))
      setStoreId(res2.data.map((p)=>{ return(p.store_id)}))

      setDateSold1(res2.data.map((p)=>{ return(p.datesold)}))
  }  
const dsold=moment(DateSold1[0]).toDate('DD/MM/YYYY')
  const disp_data=posts.slice(pgVisited, pgVisited + userPerPage).map((post)=>{
    return(       
        <tr key={post.sale_id}>            
          <td>{post.customer}</td> 
          <td>{post.product}</td>
          <td>{post.store}</td>
          <td>
              { moment(post.datesold).format('DD MMM,YYYY')}              
          </td>
          <td>
          <Button color='yellow' icon className='ui icon button' onClick={()=>{getById(post.sale_id)
                                                                               setEditModal(true)}
          }>
            <Icon name='edit'/>Edit                    
            </Button>
          </td>
          <td>
          <Button color='red' icon className='ui icon button' onClick={()=>{getById(post.sale_id)
                                                                            setDelModal(true)}
          }>
            <Icon name='trash'/>Delete                   
            </Button>
          </td> 
        </tr>
       
        )
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
  
    const pgCnt =Math.ceil(posts.length/userPerPage)
  
    const changePg=({selected})=>{
        setPgno(selected)
      } 

  return (
    <Fragment>
    <div style={{margin : 20,marginLeft :150,marginRight:150}}>
    <Button inverted color='blue' onClick={()=>{setSaleModal(true)}}
    >
      Create Sales
    </Button>
   
       <Table celled className="ui celled table" striped>
     <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Customer</Table.HeaderCell>
        <Table.HeaderCell>Product</Table.HeaderCell>
        <Table.HeaderCell>Store</Table.HeaderCell>
        <Table.HeaderCell>Date Sold</Table.HeaderCell>
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
 
  <SaleCreate
  open={saleModal}
  close={()=>setSaleModal(false)}
  getData={getData}
  />
  
  <SaleDel
  open={delModal}
  close={()=>setDelModal(false)}
  id={saleId[0]}
  getData={getData}
  />

  <SaleEdit  
  open={editModal}
  close={()=>setEditModal(false)}
  sid={saleId[0]}
  cid={CustId[0]}
  cname={cusName[0]}  
  pid={ProdId[0]}
  pname={prodName[0]}
  stid={StoreId[0]}
  sname={StoreName[0]}
  dsold={dsold}
  getData={getData}
  /> 

  </div>
  </Fragment>
  )
}
export {Sales}

