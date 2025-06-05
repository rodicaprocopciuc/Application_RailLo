import React, { useState, setEditMode, setFormData, useEffect, navigate } from "react";
import { jwt_decode, jwtDecode } from "jwt-decode";
import userIcon from "../imagini/user.png";
import "./Profil.css";

function Profil() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    password: "",
  });

  const token = localStorage.getItem("tokenRailLo");
  const decoded = jwtDecode(token);
  const email =
    decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`http://localhost:5000/api/users/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res);

      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setFormData({
          name: data.name,
          role: data.role,
          password: "",
        });
      } else {
        alert("Failed to fetch user");
      }
    };

    fetchUser();
  }, [email, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const payload = {
      name: formData.name,
      role: formData.role,
    };
    if (formData.password.trim()) {
      payload.password = formData.password;
    }

    const res = await fetch(`http://localhost:5000/api/users/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const updatedUser = await res.json();
      setUser(updatedUser);
      setFormData({ ...formData, password: "" }); // Clear password
      setEditMode(false);
      window.location.reload();
    } else {
      alert("Failed to update user");
    }
  };

  if (!user) return <div>Loading user...</div>;

  return (
    <div className="profil-page">
      <div className="profil-card">
        <img src={userIcon} alt="User" className="profil-avatar" />

        {editMode ? (
          <>
            <label>
              Nume:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input type="email" value={user.email} readOnly disabled />
            </label>
            <label>
              Rol:
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="select-role-input"
              >
                <option value="">Selectează rolul</option>
                <option value="dispecer">Dispecer</option>
                <option value="tehnician">Tehnician</option>
                <option value="manager">Manager</option>
              </select>
            </label>
            <label>
              Parolă nouă:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
            <button className="profil-button" onClick={handleSave}>
              Salvează
            </button>
            <button
              className="profil-button"
              onClick={() => setEditMode(false)}
            >
              Anulează
            </button>
          </>
        ) : (
          <>
            <h2>Nume: {user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Rol: {user.role}</p>
            <button className="profil-button" onClick={() => setEditMode(true)}>
              Editează Profil
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Profil;
