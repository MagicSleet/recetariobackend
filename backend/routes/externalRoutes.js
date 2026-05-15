const express = require('express')
const router = express.Router()

router.get('/search', async (req, res) => {
  const q = req.query.q || ''
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`
    const response = await fetch(url)
    const data = await response.json()
    return res.json(data)
  } catch (error) {
    console.error('External API error', error)
    return res.status(502).json({ message: 'External API error' })
  }
})

module.exports = router
