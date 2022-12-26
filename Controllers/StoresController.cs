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
    public class StoresController : ControllerBase
    {
        private readonly DataCtxt _context;

        public StoresController(DataCtxt context)
        {
            _context = context;
        }

        // POST: api/Stores
        [HttpPost]
        public async Task<ActionResult<Store>> PostStore(Store store)
        {
            _context.Stores.Add(store);
            await _context.SaveChangesAsync();

            return Ok("created!!");
        }

        // GET: api/Stores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Store>>> GetStores()
        {
            return await _context.Stores.ToListAsync();
        }

        // GET: api/Stores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Store>> GetStore(int? id)
        {
            var store = await _context.Stores.FirstOrDefaultAsync(i => i.StoreId == id);

            if (store != null)
            {
                return store;
            }

            return NotFound();

        }

        // PUT: api/Stores/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStore(int? id, Store store)
        {
           var upd = await _context.Stores.FirstOrDefaultAsync(i=>i.StoreId == id);

            if (upd != null)
            {
                upd.Name = store.Name;
                upd.Address = store.Address;
                await _context.SaveChangesAsync();
                return Ok("updation done");
            }
            else
                return NotFound();
        }
       

        // DELETE: api/Stores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStore(int id)
        {
            var store = await _context.Stores.FirstOrDefaultAsync(i => i.StoreId == id);
            if (store != null)
            {
                _context.Stores.Remove(store);
                await _context.SaveChangesAsync();
                return Ok("Deleted!!");
            }
            else         

            return BadRequest("No such store exists");
        }

    }
}
