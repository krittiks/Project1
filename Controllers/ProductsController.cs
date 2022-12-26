using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InternshipRT.DataBaseContext;
using InternshipRT.Model;

namespace InternshipRT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly DataCtxt _context;

        public ProductsController(DataCtxt context)
        {
            _context = context;
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return Ok(product);
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int? id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(i => i.ProdId == id);

            if (id != null)
            return Ok(product);
            
            else
            return NotFound();
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int? id, Product product)
        {
            var upd = await _context.Products.FirstOrDefaultAsync(i => i.ProdId == id);

            if (upd != null)
            {
                upd.Name = product.Name;
                upd.Price = product.Price;
                await _context.SaveChangesAsync();
                return Ok("updation done");
            }
            else
                return NotFound();
        }

       
        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(i => i.ProdId == id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
                return Ok("DELETED!!");
            }

            else
            return NoContent();
        }
        
    }
}
