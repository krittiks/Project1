using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InternshipRT.DataBaseContext;
using InternshipRT.Model;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using Microsoft.AspNetCore.Routing.Internal;

namespace InternshipRT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly DataCtxt _context;

        public SalesController(DataCtxt context)
        {
            _context = context;
        }

        // GET: api/Sales
        [HttpGet]
        public ActionResult<IEnumerable<Sale>> GetSales()
        {
            var rs = (from s in _context.Sales
                      join c in _context.Customers
                      on s.CustId equals c.CustId
                      join h in _context.Stores
                      on s.StoreId equals h.StoreId 
                      join p in _context.Products
                      on s.ProdId equals p.ProdId
                      select new
                      {
                          datesold = s.DateSold,
                          Customer = c.Name,
                          Product = p.Name,
                          Store = h.Name,
                          Sale_id = s.SaleId
                      }).ToList();

            return Ok(rs);
           
        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sale>> GetSale(int id)
        {
            var sale = await _context.Sales.FirstOrDefaultAsync(i=>i.SaleId==id);

            if (sale != null)
            {
                var rs = (from s in _context.Sales     
                          join c in _context.Customers
                          on s.CustId equals c.CustId
                          join h in _context.Stores
                          on s.StoreId equals h.StoreId
                          join p in _context.Products
                          on s.ProdId equals p.ProdId
                          where s.SaleId==id
                          select new
                          {
                              datesold = s.DateSold,
                              Customer = c.Name,
                              Product = p.Name,
                              Store = h.Name,
                              Sale_id=s.SaleId,
                              cust_id=s.CustId,
                              prod_id=s.ProdId,
                              store_id=s.StoreId
                          });

                return Ok(rs);
            }

            return NotFound();
        }

        // PUT: api/Sales/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSale(int id, Sale sale)
        {
            var upd = await _context.Sales.FirstOrDefaultAsync(i => i.SaleId == id);
            if (upd != null )
            {

                upd.DateSold = sale.DateSold;
                upd.CustId=sale.CustId;
                upd.ProdId = sale.ProdId;
                upd.StoreId = sale.StoreId;
                await _context.SaveChangesAsync();
                return Ok("updation done");
                
            }
            else
                return BadRequest("id not found");
        }

        // POST: api/Sales
        [HttpPost]
        public async Task<ActionResult<Sale>> PostSale(Sale sale)
        {
            _context.Sales.Add(sale);
            await _context.SaveChangesAsync();

            return Ok("creation done");
            
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSale(int id)
        {
            var sale = await _context.Sales.FirstOrDefaultAsync(i => i.SaleId == id);
            if (sale != null)
            {
                _context.Sales.Remove(sale);
                await _context.SaveChangesAsync();
                return Ok("deleted successfully");
            }

            else
                return BadRequest("ID doesn't exists");
            
        }

    }
}
