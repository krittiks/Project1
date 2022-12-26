using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace InternshipRT.Model
{
    public class Store
    {
        [Key]
        public int StoreId { get; set; }

        [Required]
        public String? Name { get; set; }

        public string? Address { get; set; }

        public ICollection<Sale>? SalesSColn { get; set; } 
    }
}
