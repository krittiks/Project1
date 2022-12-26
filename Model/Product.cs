using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace InternshipRT.Model
{
    public class Product
    {
        [Key]
        public int ProdId { get; set; }

        [Required]
        public String? Name { get; set; }

        public double? Price { get; set; }

        public ICollection<Sale>? SalesPColn { get; set; }  
    }
}
