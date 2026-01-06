import React, { useState } from 'react';
import './CreerMagasin.css';
import { apiFetch } from '../../api';
import { useToast } from '../ui/ToastProvider';

const CreerMagasin = ({ onCreated }) => {
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const toast = useToast();

  const reset = () => { setNom(''); setAdresse(''); setTelephone(''); setEmail(''); };

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(null); setSuccess(null);
    if (!nom.trim() || !adresse.trim()) { setError('Nom et adresse requis'); return; }
    setLoading(true);
    try {
      const json = await apiFetch('/magasin', { method: 'POST', body: { nom, adresse, telephone, email } });
      setSuccess('Magasin créé'); toast.success('Magasin créé'); reset(); if (typeof onCreated === 'function') onCreated(json.data || json.magasin || null);
    } catch (err) { const msg = err.message || 'Erreur'; setError(msg); toast.error(msg); } finally { setLoading(false); }
  };

  return (
    <div className="creer-magasin">
      <h2>Créer un magasin</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom
          <input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom du magasin" />
        </label>
        <label>Adresse
          <input value={adresse} onChange={(e) => setAdresse(e.target.value)} placeholder="Adresse" />
        </label>
        <label>Téléphone
          <input value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="0xxxxxxxx" />
        </label>
        <label>Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="contact@exemple.com" />
        </label>
        <div className="actions">
          <button type="submit" className="save" disabled={loading}>{loading ? 'Envoi...' : 'Créer'}</button>
          <button type="button" onClick={reset}>Reset</button>
        </div>
        {error && <div className="note" style={{color:'#b91c1c'}}>{error}</div>}
        {success && <div className="note" style={{color:'#065f46'}}>{success}</div>}
      </form>
    </div>
  );
};

export default CreerMagasin;
