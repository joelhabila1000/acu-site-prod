const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

async function list(req,res){
  const { q, page = 1, per = 20 } = req.query
  const where = {}
  if(q) where.OR = [{ name: { contains: q, mode: 'insensitive' } }, { email: { contains: q, mode: 'insensitive' } }]
  const take = Number(per)
  const skip = (Number(page)-1) * take
  const [items, total] = await Promise.all([
    prisma.user.findMany({ where, include:{ role:true }, take, skip, orderBy:{ createdAt: 'desc' } }),
    prisma.user.count({ where })
  ])
  res.json({ data: items.map(u=>({ id:u.id, name:u.name, email:u.email, role:u.role, status:u.status, createdAt:u.createdAt })), total })
}

async function get(req,res){
  const id = Number(req.params.id)
  const user = await prisma.user.findUnique({ where:{ id }, include:{ role:true } })
  if(!user) return res.status(404).json({ error: 'Not found' })
  res.json(user)
}

async function create(req,res){
  const { name, email, password, roleId } = req.body
  if(!name || !email || !password) return res.status(400).json({ error: 'Missing required fields' })
  const existing = await prisma.user.findUnique({ where:{ email } })
  if(existing) return res.status(400).json({ error: 'Email already in use' })
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({ data:{ name, email, passwordHash, roleId: Number(roleId) } })
  res.json({ id: user.id, name: user.name, email: user.email })
}

async function update(req,res){
  const id = Number(req.params.id)
  const body = req.body
  if(body.password){
    body.passwordHash = await bcrypt.hash(body.password, 10)
    delete body.password
  }
  if(body.roleId) body.roleId = Number(body.roleId)
  const updated = await prisma.user.update({ where:{ id }, data: body })
  res.json({ id: updated.id, name: updated.name, email: updated.email })
}

async function remove(req,res){
  const id = Number(req.params.id)
  await prisma.user.delete({ where:{ id } })
  res.json({ success: true })
}

module.exports = { list, get, create, update, remove }
