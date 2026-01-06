import React, { useState } from 'react'
import './CreerUser.css';
import { apiFetch } from '../../api';
import { useToast } from '../ui/ToastProvider';

const CreerUser = ({ onCreated }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('etudiant');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const toast = useToast();

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setRole('etudiant');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password || !username) {
      setError('Veuillez remplir le nom, l\'email et le mot de passe.');
      return;
    }

    setLoading(true);
    try {
      const json = await apiFetch('/user', { method: 'POST', body: { username, email, password, role } });
      setSuccess('Utilisateur créé avec succès.');
      toast.success('Utilisateur créé');
      resetForm();
      if (typeof onCreated === 'function') onCreated(json.data || json.user || null);
    } catch (err) {
      const message = err.message || 'Erreur lors de la création de l\'utilisateur.';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="creer-user">
      <h2>Créer un utilisateur</h2>
      <form className="creer-form" onSubmit={handleSubmit}>
        <label>
          Nom d'utilisateur
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="ex: mimi" />
        </label>

        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="ex: mimi@mail.com" />
        </label>

        <label>
          Mot de passe
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="min 6 caractères" />
        </label>

        <label>
          Rôle
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="etudiant">etudiant</option>
            <option value="admin">admin</option>
          </select>
        </label>

        <div className="form-actions">
          <button type="submit" disabled={loading}>{loading ? 'Création...' : 'Créer'}</button>
        </div>

        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}
      </form>
    </div>
  )
}

export default CreerUser
