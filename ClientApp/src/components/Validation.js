
const Validation=(values)=>{    
    let errors={}
   if(!values.name)
    errors.name= "Name is required"
   else if(values.name.length<2)
   errors.name = "Name must be of atleast 2 letters"
   else if(values.name.match(/[^a-zA-Z ]+/))
   errors.name = "Name must contain alphatbets only"
   else if(values.name.length>30)
   errors.name = "Name can be a max of 30 characters"

  if(!values.address)
  errors.address = "Address is required"
   else if(values.address.length<2)
   errors.address = "Name must be of atleast 2 letters"
   else if(values.address.match(/^[0-9]+$/))
   errors.address = "Please enter a valid address"
   else if(values.address.length>40)
   errors.address = "Address can be a max of 40 characters"

  return errors
}

const ValidationP = (values) =>{
   let errors={}
   if(!values.name)
   errors.name = "Name is required"
   else if(values.name.length<2)
   errors.name = "Name must be of atleast 2 letters"
   else if(values.name.match(/[^a-zA-Z ]+/))
   errors.name = "Name must contain alphatbets only"
   else if(values.name.length>30)
   errors.name = "Name can be a max of 30 characters"

  const floatRegExp = new RegExp('^([0-9]+([.][0-9]*)?|[.][0-9]+)$')

  if(!values.price)
  errors.price="Price is required"
 
  else if (!floatRegExp.test(values.price)) 
  errors.price="Please enter a valid price"

  return errors
}
export {ValidationP}


export default Validation