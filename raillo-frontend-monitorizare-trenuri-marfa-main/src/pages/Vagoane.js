import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Vagoane.css";

const Vagoane = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [vagoane, setVagoane] = useState([]);
  const [vagoaneFiltered, setVagoaneFiltered] = useState([]);
  const [formData, setFormData] = useState({
    tip: "",
    capacitate: "",
    stare: "",
    trainId: "",
    train: [],
  });

  // const [vagoane] = useState([
  //   { id: 1, tip: 'Acoperit', capacitate: '60 t', stare: 'Disponibil' },
  //   { id: 2, tip: 'Platformă', capacitate: '50 t', stare: 'În utilizare' },
  //   { id: 3, tip: 'Cisternă', capacitate: '80 t', stare: 'În utilizare' },
  //   { id: 4, tip: 'Platformă', capacitate: '45 t', stare: 'Disponibil' },
  //   { id: 5, tip: 'Acoperit', capacitate: '58 t', stare: 'Disponibil' },
  // ]);

  const fetchVagons = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/vagon");
      const data = await response.json();
      setVagoane(data.$values);
    } catch (error) {
      console.error("Error fetching vagons:", error);
    }
  };

  useEffect(() => {
    fetchVagons();
     const filtered = vagoane?.filter(
      (vagon) =>
        vagon.tip.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vagon.stare.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setVagoaneFiltered(filtered);
    if (!searchTerm.trim()) {
      setVagoaneFiltered(vagoane);
    }
  }, [vagoane, searchTerm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var res = null;
    if (formData.id) {
      res = await fetch(`http://localhost:5000/api/Vagon/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } else {
      res = await fetch("http://localhost:5000/api/Vagon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    }
    if (res.ok) {
      setFormData({ tip: "", capacitate: "", stare: "", trainId: "" });
      fetchVagons();
    } else {
      alert("Eoare salvare vagon");
    }
  };

  const handleEdit = (vagon) => {
    setFormData(vagon);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/api/Vagon/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchVagons();
    } else {
      alert("Eroare stergere vagon");
    }
  };


  const handleDetaliiClick = (id) => {
    navigate(`/vagon/${id}`);
  };

  return (
    <div className="vagoane-container" style={{ padding: "20px" }}>
      <h2>{formData.id ? "Editează Vagon" : "Adaugă Vagon"}</h2>

      <form
        className="vagoane-form"
        onSubmit={handleSubmit}
        style={{ marginBottom: "30px" }}
      >
        <input
          type="text"
          name="tip"
          placeholder="Tip"
          value={formData.tip}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="capacitate"
          placeholder="Capacitate"
          value={formData.capacitate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="stare"
          placeholder="Stare"
          value={formData.stare}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="trainId"
          placeholder="ID Tren"
          value={formData.trainId}
          onChange={handleChange}
          required
        />
        <button type="submit">{formData.id ? "Actualizează" : "Adaugă"}</button>
      </form>

      <div className="vagoane-header" style={{ marginBottom: "10px" }}>
        <h2>Vagoane</h2>
        <div className="vagoane-actions">
          <input
            type="text"
            placeholder="Căutare rapidă"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table
        className="vagoane-table"
        border="1"
        cellPadding="5"
        cellSpacing="0"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Tip</th>
            <th>Capacitate</th>
            <th>Stare</th>
            <th>ID Tren</th>
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {vagoaneFiltered?.map((vagon) => (
            <tr key={vagon.id}>
              <td>{vagon.id}</td>
              <td>{vagon.tip}</td>
              <td>{vagon.capacitate}</td>
              <td>{vagon.stare}</td>
              <td>{vagon.trainId}</td>
              <td className="buttons-cell">
                <button onClick={() => handleDetaliiClick(vagon.id)}>
                  Detalii
                </button>
                <button onClick={() => handleEdit(vagon)}>Editează</button>
                <button onClick={() => handleDelete(vagon.id)}>Șterge</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Vagoane;
