import React, { useState } from 'react';
import './CreerBlog.css';
import { apiFetch } from '../../api';
import { useToast } from '../ui/ToastProvider';

const CreerBlog = ({ onCreated }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const toast = useToast();

  const reset = () => { setTitle(''); setAuthor(''); setContent(''); };
  const validate = () => { if (!title.trim()) return 'Titre requis'; if (!content.trim()) return 'Contenu requis'; return null; };

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(null); setSuccess(null);
    const v = validate(); if (v) { setError(v); return; }
    setLoading(true);
    try {
      const json = await apiFetch('/blog', { method: 'POST', body: { title, author, content } });
      setSuccess('Article créé'); toast.success('Article créé'); reset(); if (typeof onCreated === 'function') onCreated(json.data || json.blog || null);
    } catch (err) { setError(err.message || 'Erreur'); } finally { setLoading(false); }
  };

  return (
    <div className="creer-blog">
      <h2>Créer un blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Titre
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre de l'article" />
        </label>
        <label>Auteur
          <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Nom de l'auteur" />
        </label>
        <label>Contenu
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Votre contenu..." />
        </label>
        <div className="actions">
          <button className="publish" type="submit" disabled={loading}>{loading ? 'Publication...' : 'Publier'}</button>
          <button type="button" onClick={reset}>Reset</button>
        </div>
        {error && <div className="msg-error">{error}</div>}
        {success && <div className="msg-success">{success}</div>}
      </form>
    </div>
  );
};

export default CreerBlog;
