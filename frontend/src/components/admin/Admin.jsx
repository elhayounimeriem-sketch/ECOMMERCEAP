import React from 'react';
import GetData from '../getdata/GetData';
import CreerUser from '../create/CreerUser';
import CreerProduct from '../create/CreerProduct';
import CreerMagasin from '../create/CreerMagasin';
import CreerCommande from '../create/CreerCommande';
import CreerBlog from '../create/CreerBlog';
import './Admin.css';

function Admin() {
  const [reloadKey, setReloadKey] = React.useState(0);

  const handleCreated = (item) => {
    setReloadKey(k => k + 1);
  };

  return (
    <div className="admin-container">
      <h1>Panneau d'Administration</h1>
      <GetData reloadKey={reloadKey} />
      <section className="create-toolbar" aria-label="Quick create">
        <div className="create-card"><CreerUser onCreated={handleCreated} /></div>
        <div className="create-card"><CreerProduct onCreated={handleCreated} /></div>
        <div className="create-card"><CreerMagasin onCreated={handleCreated} /></div>
        <div className="create-card"><CreerCommande onCreated={handleCreated} /></div>
        <div className="create-card"><CreerBlog onCreated={handleCreated} /></div>
      </section>
    </div>
  );
}

export default Admin;

