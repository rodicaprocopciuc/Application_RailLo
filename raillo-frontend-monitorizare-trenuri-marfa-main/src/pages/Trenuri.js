//MOCK-data
  // { id: 101, ruta: 'București–Brașov', stare: 'în circulație', oraPlecare: '10:00–17:00', oraSosire: '16:00' },
  // { id: 102, ruta: 'Constanța–Oradea', stare: 'Planificat', oraPlecare: '18:00–20:15', oraSosire: '17:00' },
  // { id: 103, ruta: 'Timișoara–Iași', stare: 'Întârziat', oraPlecare: '18:10–22:15', oraSosire: '18:30' },
  // { id: 104, ruta: 'Brașov–Cluj-Napoca', stare: 'în circulație', oraPlecare: '17:30–22:45', oraSosire: '20:45' },
  // { id: 105, ruta: 'Sibiu–Târgu Mureș', stare: 'Planificat', oraPlecare: '10:30–12:30', oraSosire: '17:30' },
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Trenuri.css";

const Trenuri = () => {
  const navigate = useNavigate();
  const [trenuri, setTrenuri] = useState([]);
  const [trenuriFiltered, setTrenuriFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newTrain, setNewTrain] = useState({
    ruta: "",
    stare: "",
    oraPlecare: "",
    oraSosire: "",
    vagoane: []
  });
  const [editingTrain, setEditingTrain] = useState(null);

  useEffect(() => {
    const fetchTrenuri = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/train");
        if (!res.ok) {
          throw new Error("Failed to fetch trains");
        }
        const data = await res.json();
        setTrenuri(data.$values);
      } catch (err) {
        alert("Eroare la preluarea trenurilor.");
      }
    };

    fetchTrenuri();

    const filtered = trenuri?.filter((tren) =>
      tren.ruta.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTrenuriFiltered(filtered);
    if (!searchTerm.trim()) {
      setTrenuriFiltered(trenuri);
    }
  }, [trenuri, searchTerm]);

  const handleAddTrain = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/Train", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTrain),
    });

    if (res.ok) {
      const addedTrain = await res.json();
      setTrenuri([...trenuri, addedTrain]);
      setNewTrain({
        ruta: "",
        stare: "",
        oraPlecare: "",
        oraSosire: "",
        vagoane: []
      });
      window.location.reload();
    } else {
      console.log("Error adding train");
    }
  };

  const handleEditTrain = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `http://localhost:5000/api/Train/${editingTrain.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingTrain),
      }
    );

    if (res.ok) {
      let updatedTrain = editingTrain;
      const text = await res.text();
      if (text) {
        updatedTrain = JSON.parse(text);
      }

      setTrenuri((prev) =>
        prev.map((t) => (t.id === updatedTrain.id ? updatedTrain : t))
      );

      setEditingTrain(null);
      window.location.reload();
    } else {
      console.error("Error updating train");
    }
  };

  const handleDeleteTrain = async (id) => {
    const res = await fetch(`http://localhost:5000/api/Train/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setTrenuri(trenuri.filter((tren) => tren.id !== id));
      window.location.reload();
    } else {
      console.log("Error deleting train");
    }
  };

  const handleNavigateToMap = (id) => {
    navigate(`/harta/${id}`);
  };

  return (
    <div className="trenuri-container">
      <div className="trenuri-header">
        <h2>Trenuri</h2>
        <div className="trenuri-actions">
          <input
            type="text"
            placeholder="Căutare rapidă"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <form
        onSubmit={editingTrain ? handleEditTrain : handleAddTrain}
        className="train-form"
      >
        <input
          type="text"
          placeholder="Route"
          value={editingTrain ? editingTrain.ruta : newTrain.ruta}
          onChange={(e) =>
            editingTrain
              ? setEditingTrain({ ...editingTrain, ruta: e.target.value })
              : setNewTrain({ ...newTrain, ruta: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="State"
          value={editingTrain ? editingTrain.stare : newTrain.stare}
          onChange={(e) =>
            editingTrain
              ? setEditingTrain({ ...editingTrain, stare: e.target.value })
              : setNewTrain({ ...newTrain, stare: e.target.value })
          }
        />
        <input
          type="datetime-local"
          value={
            editingTrain ? editingTrain.oraPlecare : newTrain.oraPlecare
          }
          onChange={(e) =>
            editingTrain
              ? setEditingTrain({ ...editingTrain, oraPlecare: e.target.value })
              : setNewTrain({ ...newTrain, oraPlecare: e.target.value })
          }
        />
        <input
          type="datetime-local"
          value={
            editingTrain ? editingTrain.oraSosire : newTrain.oraSosire
          }
          onChange={(e) =>
            editingTrain
              ? setEditingTrain({ ...editingTrain, oraSosire: e.target.value })
              : setNewTrain({ ...newTrain, oraSosire: e.target.value })
          }
        />
        <button type="submit">
          {editingTrain ? "Update Train" : "Add Train"}
        </button>
        {editingTrain && (
          <button
            type="button"
            onClick={() => setEditingTrain(null)}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="trenuri-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Rută</th>
            <th>Stare</th>
            <th>Ora plecare</th>
            <th>Ora sosire</th>
            <th>Harta</th>
          </tr>
        </thead>
        <tbody>
          {trenuriFiltered?.map((tren) => (
            <tr key={tren.id}>
              <td>{tren.id}</td>
              <td>{tren.ruta}</td>
              <td>{tren.stare}</td>
              <td>
                {new Date(tren.oraPlecare).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td>
                {new Date(tren.oraSosire).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="buttons-cell">
  <button className="btn-edit" onClick={() => setEditingTrain(tren)}>Editeaza</button>
  <button className="btn-delete" onClick={() => handleDeleteTrain(tren.id)}>Sterge</button>
  <button className="btn-map" onClick={() => handleNavigateToMap(tren.id)}>Harta</button>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Trenuri;
