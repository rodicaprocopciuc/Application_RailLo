using System.ComponentModel.DataAnnotations;

namespace MyBackend.Models
{
    public class Train
    {
        [Key]  
        public int Id { get; set; }

        [Required]  
        [StringLength(100)] 
        public string Ruta { get; set; }

        [Required] 
        [StringLength(50)]  
        public string Stare { get; set; }

        [Required]  
        public DateTime OraPlecare { get; set; }

        [Required]  
        public DateTime OraSosire { get; set; }

        public ICollection<Vagon> Vagoane { get; set; } = new List<Vagon>();

    }
}
