
using InternshipRT.Model;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace InternshipRT.DataBaseContext
{
    public class DataCtxt : DbContext   
    {
        public DataCtxt(DbContextOptions<DataCtxt> opt) : base(opt)
        {
            
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<Store> Stores { get; set; }    
        public DbSet<Product> Products { get; set; }

    }
}
