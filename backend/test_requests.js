const fetch = globalThis.fetch ? globalThis.fetch : (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const base = 'http://localhost:5000'

async function run(){
  console.log('Seeding recipes...')
  let res = await fetch(base + '/api/recipes/seed', { method: 'POST' })
  let data = await res.json()
  console.log('seed:', JSON.stringify(data, null, 2))

  res = await fetch(base + '/api/recipes')
  const recipes = await res.json()
  console.log('recipes:', JSON.stringify(recipes, null, 2))

  console.log('Creating admin user...')
  res = await fetch(base + '/api/users', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ name: 'Admin', email: 'admin@ex.com', key: '1' }) })
  const admin = await res.json()
  console.log('admin:', JSON.stringify(admin, null, 2))

  console.log('Creating normal user...')
  res = await fetch(base + '/api/users', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ name: 'User', email: 'user@ex.com', key: '0' }) })
  const user = await res.json()
  console.log('user:', JSON.stringify(user, null, 2))

  const recipeId = recipes[0]._id
  const userId = user._id

  console.log('Creating review...')
  res = await fetch(base + '/api/reviews', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ userId, recipeId, rating: 5, comment: 'Muy buena receta' }) })
  const review = await res.json()
  console.log('review created:', JSON.stringify(review, null, 2))

  res = await fetch(base + '/api/reviews')
  const reviews = await res.json()
  console.log('all reviews:', JSON.stringify(reviews, null, 2))
}

run().catch(e=>{ console.error(e); process.exit(1) })
