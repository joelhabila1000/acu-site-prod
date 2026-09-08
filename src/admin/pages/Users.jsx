import { useEffect, useState } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";

export default function Users(){
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [editing, setEditing] = useState(null)

  useEffect(()=>{
    fetchUsers()
  },[])

  function fetchUsers(){
    setLoading(true)
    fetch('/api/users',{ headers:{ 'Content-Type':'application/json' } })
      .then(r=> r.json())
      .then(d=> setUsers(d.data || []))
      .catch(()=> setUsers([]))
      .finally(()=> setLoading(false))
  }

  function handleDelete(id){
    if(!confirm('Delete this user? This cannot be undone.')) return
    fetch(`/api/users/${id}`,{ method:'DELETE', headers:{ 'Content-Type':'application/json', 'Authorization': '' } })
      .then(r=>{ if(r.ok) fetchUsers() })
  }

  function openCreate(){ setEditing({}) }

  function saveUser(e){
    e.preventDefault()
    const form = e.target
    const data = Object.fromEntries(new FormData(form))
    const method = editing && editing.id ? 'PUT' : 'POST'
    const url = editing && editing.id ? `/api/users/${editing.id}` : '/api/users'
    fetch(url, { method, headers:{ 'Content-Type':'application/json', 'Authorization': '' }, body: JSON.stringify(data) })
      .then(r=> r.json())
      .then(()=>{ setEditing(null); fetchUsers() })
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <h2>Users & Roles</h2>
        <div style={{display:'flex',gap:8}}>
          <input placeholder="Search users..." value={q} onChange={e=>setQ(e.target.value)} style={{padding:8,borderRadius:6,border:'1px solid #e6eef6'}}/>
          <button className="btn" onClick={openCreate}>Add Admin</button>
        </div>
      </div>

      <Card>
        {loading ? <div className="empty">Loading users...</div> : (
          users.filter(u=> !q || u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase())).length===0 ? (
            <div className="empty">No users found</div>
          ) : (
            <table className="table">
              <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {users.filter(u=> !q || u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase())).map(u=> (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role?.name || '—'}</td>
                    <td className="small muted">{u.status}</td>
                    <td className="actions">
                      <button className="btn secondary" onClick={()=>setEditing(u)}>Edit</button>
                      <button className="btn" onClick={()=>handleDelete(u.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </Card>

      {editing && (
        <Modal onClose={()=>setEditing(null)}>
          <h3>{editing.id ? 'Edit Admin' : 'Create Admin'}</h3>
          <form onSubmit={saveUser}>
            <div className="form-row"><label>Name</label><input name="name" defaultValue={editing.name||''} required/></div>
            <div className="form-row"><label>Email</label><input name="email" type="email" defaultValue={editing.email||''} required/></div>
            <div className="form-row"><label>Password</label><input name="password" type="password" placeholder={editing.id? 'Leave blank to keep current':''} /></div>
            <div className="form-row"><label>Role ID</label><input name="roleId" defaultValue={editing.role?.id||''} placeholder="Role ID (use seed roles)"/></div>
            <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
              <button className="btn secondary" type="button" onClick={()=>setEditing(null)}>Cancel</button>
              <button className="btn" type="submit">Save</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
