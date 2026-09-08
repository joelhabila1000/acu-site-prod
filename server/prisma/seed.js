const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const prisma = new PrismaClient()

async function main(){
  console.log('Seeding database...')
  // Roles
  const superRole = await prisma.role.upsert({ where:{name:'Super Admin'}, update:{}, create:{name:'Super Admin', description:'Full access'} })
  const contentRole = await prisma.role.upsert({ where:{name:'Content Editor'}, update:{}, create:{name:'Content Editor', description:'Manage pages, news, events'} })
  const academicRole = await prisma.role.upsert({ where:{name:'Academic Editor'}, update:{}, create:{name:'Academic Editor', description:'Manage faculties, departments, programmes, staff'} })
  const admissionsRole = await prisma.role.upsert({ where:{name:'Admissions Editor'}, update:{}, create:{name:'Admissions Editor', description:'Manage admissions content'} })

  const passwordHash = await bcrypt.hash('adminchangeme', 10)
  const admin = await prisma.user.upsert({
    where:{email:'admin@acu.edu.ng'},
    update:{},
    create:{name:'ACU Admin', email:'admin@acu.edu.ng', passwordHash, roleId: superRole.id}
  })

  await prisma.news.createMany({ data:[
    { title:'ACU Inaugural Research Symposium', slug:'acu-research-symposium', content:'<p>Showcase of research.</p>', authorId: admin.id, status:'published', publishedAt: new Date() },
    { title:'Admissions Open 2026', slug:'admissions-open-2026', content:'<p>Apply now.</p>', authorId: admin.id, status:'published', publishedAt: new Date() }
  ] })

  console.log('Seeding completed')
}

main().catch(e=>{console.error(e);process.exit(1)}).finally(()=>prisma.$disconnect())
