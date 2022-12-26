using InternshipRT.Model;
using InternshipRT.DataBaseContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InternshipRT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly DataCtxt _dbcntxt;

        public CustomerController(DataCtxt dbctx)
        {
            _dbcntxt = dbctx;   
        }


        [HttpPost]
        [Route("create")]
        public IActionResult Create(Customer cus)
        {
            _dbcntxt.Customers.Add(cus);
            _dbcntxt.SaveChanges();
             return Ok("creation done");
        }


        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var data = _dbcntxt.Customers.ToList();
            return Ok(data);
        }

        //get a particular record by id 
        [HttpGet]
        [Route("getbyid/{id}")]
        public IActionResult getbyid(int id)
        {
            var data = _dbcntxt.Customers.Find(id);
            return Ok(data);
        }



        [HttpDelete("delete/{id}")]
        public IActionResult Del([FromRoute] int? id)
        {
            var test = _dbcntxt.Customers.FirstOrDefault(i => i.CustId == id);
            
            if (test != null)
            {
                _dbcntxt.Customers.Remove(test);
                _dbcntxt.SaveChanges();
                return Ok(test + "Deleted successfully");
            }
            else
            {
                return NotFound("ID given doesnt exist");
            }

        }

        [HttpPut("update/{id}")]
        public IActionResult Updt([FromRoute] int? id, [FromBody] Customer cust)
        {
            var upd = _dbcntxt.Customers.FirstOrDefault(z => z.CustId == id);

            if (upd != null)
            {
                upd.Name = cust.Name;
                upd.Address = cust.Address;
                
                _dbcntxt.SaveChanges();
                return Ok("updated successfully" + upd);
            }

            else
                return BadRequest("id not found");
        }

    }
}
