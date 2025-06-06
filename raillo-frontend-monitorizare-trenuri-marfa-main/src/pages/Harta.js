import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HartaTrenuri from '../components/HartaTrenuri';
import './Harta.css';

function Harta() {
  const navigate = useNavigate();

  const [filtruStare, setFiltruStare] = useState('toate');
  const [filtruId, setFiltruId] = useState('');
  const [filtruRuta, setFiltruRuta] = useState('');
  const [filtruAplicat, setFiltruAplicat] = useState(null);

 

  const trenuriDisponibile = [];

  const aplicaFiltre = () => {
    setFiltruAplicat({
      stare: filtruStare,
      id: filtruId.trim(),
      ruta: filtruRuta.trim()
    });
  };

  const stergeFiltre = () => {
    setFiltruStare('toate');
    setFiltruId('');
    setFiltruRuta('');
    setFiltruAplicat(null);
  };

  useEffect(() => {
      const fetchTrenuri = async () => {
        try {
          const res = await fetch("http://localhost:5000/api/train");
          if (!res.ok) {
            throw new Error("Failed to fetch trains");
          }
          const data = await res.json();
          trenuriDisponibile = data;
        } catch (err) {
          alert("Eroare la preluarea trenurilor.");
        }
      };
  
      fetchTrenuri();
    }, []);

  return (
    <div className="harta-container">
      <button className="btn-back" onClick={() => navigate(-1)}>← Înapoi</button>

      <h2 className="dashboard-title">Harta trenurilor de marfă</h2>

      <div className="filtru-container">
        <div className="filtru-item">
          <label>Stare</label>
          <select className="custom-select" value={filtruStare} onChange={(e) => setFiltruStare(e.target.value)}>
            <option value="toate">Toate</option>
            <option value="în circulație">În circulație</option>
            <option value="întârziat">Întârziat</option>
            <option value="planificat">Planificat</option>
          </select>
        </div>

        <div className="filtru-item">
          <label>Filtrează după ID</label>
          <input
            className="custom-input"
            list="iduriDisponibile"
            value={filtruId}
            placeholder="ex: 101"
            onChange={(e) => setFiltruId(e.target.value)}
          />
          <datalist id="iduriDisponibile">
            {trenuriDisponibile.map(tren => (
              <option key={tren.id} value={tren.id} />
            ))}
          </datalist>
        </div>

        <div className="filtru-item">
          <label>Caută rută</label>
          <input
            className="custom-input"
            list="ruteDisponibile"
            value={filtruRuta}
            placeholder="ex: Brașov"
            onChange={(e) => setFiltruRuta(e.target.value)}
          />
          <datalist id="ruteDisponibile">
            {trenuriDisponibile.map(tren => (
              <option key={tren.id} value={tren.ruta} />
            ))}
          </datalist>
        </div>

        <div className="filter-buttons">
          <button className="btn-primary" onClick={aplicaFiltre}>Aplică filtre</button>
          <button className="btn-secondary" onClick={stergeFiltre}>Șterge filtre</button>
        </div>
      </div>

      <div className="map-card">
        <HartaTrenuri filtru={filtruAplicat} />
      </div>
    </div>
  );
}

export default Harta;
