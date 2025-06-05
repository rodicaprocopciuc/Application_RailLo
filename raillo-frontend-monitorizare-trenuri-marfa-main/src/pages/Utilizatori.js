import React, { useState, useEffect } from "react";
import "./Utilizatori.css";

const Utilizatori = () => {
  const currentUserRole = "Admin";

  const [utilizatori, setUtilizatori] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // To handle editing an existing train
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  const fetchUtilizatori = async () => {
    const res = await fetch("http://localhost:5000/api/users");
    if (res.ok) {
      const data = await res.json();
      setUtilizatori(data.$values);
    }
  };

  useEffect(() => {
    fetchUtilizatori();
  }, []);

  const adaugaUtilizator = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        password: "",
        role: newUser.role,
      }),
    });

    if (response.ok) {
      const nouUtilizator = response.json();
      setUtilizatori([...utilizatori, nouUtilizator]);
      setNewUser({
        name: "",
        email: "",
        role: "",
      });
      window.location.reload();
    } else {
      console.log("Error adding user")
    }
  };

  const editeazaUtilizator = async (e) => {
     e.preventDefault();
    const res = await fetch(
      `http://localhost:5000/api/Users/id/${editingUser.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingUser),
      }
    );

    if(res.ok) {
      setNewUser({
        name: "",
        email: "",
        role: "",
      });
      setEditingUser(null);
      fetchUtilizatori();
      window.location.reload();
    }
  };

  const stergeUtilizator = (id) => {
    const utilizatoriRamasi = utilizatori.filter(
      (utilizator) => utilizator.id !== id
    );
    setUtilizatori(utilizatoriRamasi);
  };

  return (
    <div className="utilizatori-container">
      <h2 className="utilizatori-title">Utilizatori</h2>

      {currentUserRole === "Admin" && (
        <div className="utilizatori-actions">
          <h3>{editingUser ? "Editează Utilizator" : "Adaugă Utilizator"}</h3>
          <form onSubmit={editingUser ? editeazaUtilizator : adaugaUtilizator}>
            <label>Nume:</label>
            <input
              type="text"
              value={editingUser ? editingUser.name : newUser.name}
              onChange={(e) =>
                editingUser
                  ? setEditingUser({
                      ...editingUser,
                      name: e.target.value,
                    })
                  : setNewUser({ ...newUser, name: e.target.value })
              }
              placeholder="Nume complet"
              required
            />
            <label>Email:</label>
            <input
              type="email"
              value={editingUser ? editingUser.email : newUser.email}
              onChange={(e) =>
                editingUser
                  ? setEditingUser({
                      ...editingUser,
                      email: e.target.value,
                    })
                  : setNewUser({ ...newUser, email: e.target.value })
              }
              placeholder="email@example.com"
              required
            />
            <label>Rol:</label>
            <input
              type="text"
              value={editingUser ? editingUser.role : newUser.role}
              onChange={(e) =>
                editingUser
                  ? setEditingUser({
                      ...editingUser,
                      role: e.target.value,
                    })
                  : setNewUser({ ...newUser, role: e.target.value })
              }
              placeholder="Rol utilizator"
              required
            />
            <button type="submit">{editingUser ? "Salvează" : "Adaugă"}</button>
          </form>
        </div>
      )}

      <table className="utilizatori-table">
        <thead>
          <tr>
            <th>Nume</th>
            <th>Email</th>
            <th>Rol</th>
            {currentUserRole === "Admin" && <th>Acțiuni</th>}
          </tr>
        </thead>
        <tbody>
          {utilizatori?.map((utilizator) => (
            <tr key={utilizator.id}>
              <td>{utilizator.name}</td>
              <td>{utilizator.email}</td>
              <td>{utilizator.role}</td>
              {currentUserRole === "Admin" && (
                <td>
                  <button onClick={() => setEditingUser(utilizator)}>
                    Editează
                  </button>
                  <button onClick={() => stergeUtilizator(utilizator.id)}>
                    Șterge
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Utilizatori;
