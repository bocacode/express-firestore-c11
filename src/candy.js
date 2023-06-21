import { db } from "./connectDb.js"

export async function getCandy(req, res) {
  const candy = await db.collection('candy').get()
    .catch(err => {
      res.status(500).send({ success: false, message: err })
      return
    })
  // Now let's clean up candy
  const candyArray = candy.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  res.send(candyArray)
}

export async function addNewCandy(req, res) {
  const newCandy = req.body
  await db.collection('candy').add(newCandy)
    .catch(err => {
      res.status(500).send({ success: false, message: err })
      return
    })
  // res.status(201).send({ success: true, message: 'candy added' })
  getCandy(req, res)
}