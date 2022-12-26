using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace InternshipRT.Model
{
    public class Customer
    {
        [Key]
        public int CustId { get; set; }        
        public string? Name { get; set; }
        [AllowNull]
        public string Address { get; set; }    

        public ICollection<Sale>? SalesColn { get; set; } 

    }
}
