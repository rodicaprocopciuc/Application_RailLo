using Microsoft.AspNetCore.Mvc;
using MyBackend.Models;
using MyBackend.Services.Interfaces;

namespace MyBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainController : ControllerBase
    {
        private readonly ITrainService _trainService;

        public TrainController(ITrainService trainService)
        {
            _trainService = trainService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Train>>> GetTrains()
        {
            var trains = await _trainService.GetAllTrainsAsync();
            return Ok(trains);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Train>> GetTrain(int id)
        {
            var train = await _trainService.GetTrainByIdAsync(id);

            if (train == null)
            {
                return NotFound();
            }

            return Ok(train);
        }

        [HttpPost]
        public async Task<ActionResult<Train>> AddTrain(Train train)
        {
            await _trainService.AddTrainAsync(train);
            return CreatedAtAction(nameof(GetTrain), new { id = train.Id }, train);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTrain(int id, Train train)
        {
            if (id != train.Id)
            {
                return BadRequest();
            }

            if (train.Vagoane == null)
                train.Vagoane = new List<Vagon>();

            await _trainService.UpdateTrainAsync(train);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrain(int id)
        {
            await _trainService.DeleteTrainAsync(id);
            return NoContent();
        }
    }
}
