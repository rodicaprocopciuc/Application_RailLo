using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MyBackend.Models
{
    public class Vagon
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Tip { get; set; }

        [Range(1, int.MaxValue)]
        public int Capacitate { get; set; }

        [Required]
        public string Stare { get; set; }

        public string AnFabricatie { get; set; }

        public int Greutate { get; set; }

        public int NumarAnexe { get; set; }

        public DateOnly UltimaRevizie { get; set; }

        public DateOnly UrmatoareaRevizie { get; set; }
        public string Frane { get; set; }

        public string SistemeElectrice { get; set; }
        public string Caroserie { get; set; }
        public string Roti { get; set; }

        public string Observatii { get; set; }

        public string Imagine { get; set; }

        // Foreign key to Train
        [Required]
        public int TrainId { get; set; }

        [ForeignKey("TrainId")]
        public Train Train { get; set; }
    }
}

