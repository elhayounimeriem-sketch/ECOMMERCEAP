import React, { useState } from 'react';
import './CreerCommande.css';
import { apiFetch } from '../../api';
import { useToast } from '../ui/ToastProvider';

const CreerCommande = ({ onCreated }) => {
  const [clientName, setClientName] = useState('');
  const [items, setItems] = useState(''); // simple comma-separated list
  const [totalAmount, setTotalAmount] = useState('');
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const toast = useToast();

  const reset = () => { setClientName(''); setItems(''); setTotalAmount(''); setStatus('pending'); };

  const validate = () => {
    if (!clientName.trim()) return 'Nom du client requis';
    if (!totalAmount || isNaN(Number(totalAmount)) || Number(totalAmount) < 0) return 'Montant invalide';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(null); setSuccess(null);
    const v = validate(); if (v) { setError(v); return; }
    setLoading(true);
    try {
      const payload = { clientName, items: items.split(',').map(s => s.trim()).filter(Boolean), totalAmount: Number(totalAmount), status };
      const json = await apiFetch('/commande', { method: 'POST', body: payload });
      setSuccess('Commande créée.'); toast.success('Commande créée'); reset(); if (typeof onCreated === 'function') onCreated(json.data || json.commande || null);
    } catch (err) { setError(err.message || 'Erreur'); } finally { setLoading(false); }
  };

  return (
    <div className="creer-commande">
      <h2>Créer une commande</h2>
      <form onSubmit={handleSubmit}>
        <label>Client
          <input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Nom du client" />
        </label>
        <label>Items (séparés par des virgules)
          <input value={items} onChange={(e) => setItems(e.target.value)} placeholder="ex: sac, robe, t-shirt" />
        </label>
        <div className="row">
          <div className="col">
            <label>Montant total (MAD)
              <input value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} type="number" min="0" step="0.01" />
            </label>
          </div>
          <div className="col">
            <label>Statut
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="pending">pending</option>
                <option value="processing">processing</option>
                <option value="completed">completed</option>
                <option value="cancelled">cancelled</option>
              </select>
            </label>
          </div>
        </div>
        <div className="actions">
          <button className="primary" type="submit" disabled={loading}>{loading ? 'Envoi...' : 'Créer la commande'}</button>
          <button type="button" onClick={reset}>Reset</button>
        </div>
        {error && <div className="msg-error">{error}</div>}
        {success && <div className="msg-success">{success}</div>}
      </form>
    </div>
  );
};

export default CreerCommande;
