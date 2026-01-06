import React, { useState, useEffect } from "react";
import './CreerProduct.css';
import { apiFetch } from '../../api';
import { useToast } from '../ui/ToastProvider';

// /Users/meriemelhayouni/Desktop/ECOMMERCEAP/frontend/src/components/create/CreerProduct.jsx
// Composant React pour créer un produit (formulaire, upload image, validation minimale)


export default function CreerProduct({ onCreated }) {
    const [form, setForm] = useState({ nom: "", description: "", prix: "", categorie: "", stock: "" });
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const toast = useToast();

    useEffect(() => {
        let cancelled = false;
        async function fetchCategories() {
            try {
                const res = await fetch('http://localhost:4000/api/categories');
                const json = await res.json();
                if (!cancelled && Array.isArray(json.data || json)) setCategories(json.data || json);
            } catch (e) {
                if (!cancelled) setCategories([
                    { id: "vetements", nom: "Vêtements" },
                    { id: "electronique", nom: "Électronique" },
                    { id: "maison", nom: "Maison" },
                ]);
            }
        }
        fetchCategories();
        return () => { cancelled = true };
    }, []);

    useEffect(() => {
        if (!imageFile) { setPreview(null); return }
        const url = URL.createObjectURL(imageFile);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [imageFile]);

    function handleChange(e) { const { name, value } = e.target; setForm((s) => ({ ...s, [name]: value })); setError(""); setSuccess(""); }
    function handleFile(e) { const file = e.target.files[0]; if (file && file.size > 5 * 1024 * 1024) { setError("L'image doit faire moins de 5MB."); return; } setImageFile(file || null); setError(""); }
    function validate() { if (!form.nom.trim()) return "Le nom du produit est requis."; if (!form.prix || isNaN(Number(form.prix)) || Number(form.prix) < 0) return "Prix invalide."; if (!form.categorie) return "La catégorie est requise."; if (!form.stock || isNaN(Number(form.stock)) || Number(form.stock) < 0) return "Stock invalide."; return null; }

    async function handleSubmit(e) {
        e.preventDefault(); setError(""); setSuccess(""); const v = validate(); if (v) { setError(v); return };
        setLoading(true);
        try {
            const fd = new FormData(); fd.append('nom', form.nom); fd.append('description', form.description); fd.append('prix', Number(form.prix)); fd.append('categorie', form.categorie); fd.append('stock', Number(form.stock)); if (imageFile) fd.append('image', imageFile);
            const json = await apiFetch('/product', { method: 'POST', body: fd });
            setSuccess('Produit créé avec succès.'); setForm({ nom: '', description: '', prix: '', categorie: '', stock: '' }); setImageFile(null);
            toast.success('Produit créé');
            if (typeof onCreated === 'function') onCreated(json.data || json.product || null);
        } catch (err) { console.error(err); const msg = err.message || 'Erreur lors de la création du produit.'; setError(msg); toast.error(msg); } finally { setLoading(false); }
    }

    return (
        <div className="creer-product">
            <h2>Créer un produit</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div style={{ marginBottom: 12 }}>
                    <label>Nom</label>
                    <input name="nom" value={form.nom} onChange={handleChange} required />
                </div>
                <div style={{ marginBottom: 12 }}>
                    <label>Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={4} />
                </div>
                <div className="row" style={{ marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                        <label>Prix (MAD)</label>
                        <input name="prix" value={form.prix} onChange={handleChange} type="number" min="0" step="0.01" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label>Stock</label>
                        <input name="stock" value={form.stock} onChange={handleChange} type="number" min="0" step="1" />
                    </div>
                </div>
                <div style={{ marginBottom: 12 }}>
                    <label>Catégorie</label>
                    <select name="categorie" value={form.categorie} onChange={handleChange}>
                        <option value="">-- choisir --</option>
                        {categories.map((c) => (<option key={c.id ?? c.nom} value={c.id ?? c.nom}>{c.nom}</option>))}
                    </select>
                </div>
                <div style={{ marginBottom: 12 }}>
                    <label>Image (optionnelle)</label>
                    <input className="file-input" type="file" accept="image/*" onChange={handleFile} />
                    {preview && (<div className="preview"><img src={preview} alt="aperçu" /></div>)}
                </div>
                {error && (<div className="msg-error">{error}</div>)}
                {success && (<div className="msg-success">{success}</div>)}
                <div className="actions">
                  <button className="primary" type="submit" disabled={loading}>{loading ? 'Envoi...' : 'Créer le produit'}</button>
                  <button type="button" className="ghost" onClick={() => { setForm({ nom: '', description: '', prix: '', categorie: '', stock: '' }); setImageFile(null); }}>Reset</button>
                </div>
            </form>
        </div>
    );
}