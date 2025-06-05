using Microsoft.AspNetCore.Mvc;
using MyBackend.Models;
using MyBackend.Services;
using MyBackend.Services.Interfaces;

namespace MyBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VagonController : ControllerBase
    {
        private readonly IVagonService _service;

        public VagonController(IVagonService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vagon>>> GetAll()
        {
            return Ok(await _service.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Vagon>> GetById(long id)
        {
            var vagon = await _service.GetByIdAsync(id);
            if (vagon == null) return NotFound();
            return Ok(vagon);
        }

        [HttpPost]
        public async Task<ActionResult<Vagon>> Create([FromBody] Vagon vagon)
        {
            var created = await _service.AddAsync(vagon);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, Vagon vagon)
        {
            if (id != vagon.Id) return BadRequest();

            var existing = await _service.GetByIdAsync(id);
            if (existing == null) return NotFound();

            await _service.UpdateAsync(vagon);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var existing = await _service.GetByIdAsync(id);
            if (existing == null) return NotFound();

            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
