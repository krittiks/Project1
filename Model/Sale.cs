using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;

namespace InternshipRT.Model
{
    public class Sale
    {
        [Key]
        public int SaleId { get; set; }
       
        public DateTime DateSold { get; set; }

        //forign key of customer table with id & type
        public int CustId { get; set; }
        public Customer? Cust { get; set; }

        
        //forign key of product table with id & type
        public int ProdId { get; set; }
        public Product? Prod { get; set; }
        
       
        //forign key of store table with id & type
        public int StoreId { get; set; }
        public Store? Store { get; set; }    

       


    }
}
