import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../api';
import './BlogPage.css';

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/blog');
      // S'assurer que data est un tableau
      const blogsArray = Array.isArray(data) ? data : [];
      setBlogs(blogsArray);
      setError(null);
    } catch (err) {
      setBlogs([]); // Réinitialiser à un tableau vide en cas d'erreur
      setError('Erreur lors du chargement du blog');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement du blog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={fetchBlogs}>Réessayer</button>
      </div>
    );
  }

  return (
    <div className="blog-page-container">
      <div className="blog-header">
        <h1>Notre Blog</h1>
        <p>Découvrez les dernières actualités et tendances</p>
      </div>

      {!Array.isArray(blogs) || blogs.length === 0 ? (
        <div className="empty-blog">
          <p>Aucun article disponible pour le moment</p>
        </div>
      ) : (
        <div className="blog-grid">
          {blogs.filter(blog => blog).map(blog => (
            <article key={blog._id} className="blog-card">
              <div className="blog-image">
                <span className="blog-icon">📝</span>
              </div>
              <div className="blog-content">
                <h2 className="blog-title">{blog.title}</h2>
                <p className="blog-description">{blog.content}</p>
                {blog.author && (
                  <div className="blog-author">
                    <span className="author-icon">✍️</span>
                    <span>{blog.author}</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogPage;

