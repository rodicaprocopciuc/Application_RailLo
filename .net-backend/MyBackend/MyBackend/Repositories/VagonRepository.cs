using Microsoft.EntityFrameworkCore;
using MyBackend.Data;
using MyBackend.Models;
using MyBackend.Repositories.Interafces;
using System;

namespace MyBackend.Repositories
{
    public class VagonRepository: IVagonRepository
    {
        private readonly DatabaseContext _context;

        public VagonRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<List<Vagon>> GetAllAsync()
        {
            return await _context.Vagons.Include(v => v.Train).ToListAsync();
        }

        public async Task<Vagon?> GetByIdAsync(long id)
        {
            return await _context.Vagons.AsNoTracking().Include(v => v.Train).FirstOrDefaultAsync(v => v.Id == id);
        }

        public async Task<Vagon> AddAsync(Vagon vagon)
        {
            _context.Vagons.Add(vagon);
            await _context.SaveChangesAsync();
            return vagon;
        }

        public async Task<Vagon> UpdateAsync(Vagon vagon)
        {
            _context.Vagons.Update(vagon);
            await _context.SaveChangesAsync();
            return vagon;
        }

        public async Task DeleteAsync(long id)
        {
            var vagon = await _context.Vagons.FindAsync(id);
            if (vagon != null)
            {
                _context.Vagons.Remove(vagon);
                await _context.SaveChangesAsync();
            }
        }
    }
}
