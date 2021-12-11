import { createClient } from '@supabase/supabase-js'

export default function(req, res, next) {
  // const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
  // supabase.auth.api.setAuthCookie(req, res)
  next()
}

// import express from 'express'
// import cookieParser from 'cookie-parser'
// const app = express()
// app.use(cookieParser())
// //app.use(bodyParser.json())
// // app.all('/getJSON', (req, res) => {
// //   res.json({ data: 'data' })
// // })
// app.get('*', (req, res) => {
//   console.log(req.cookies)
// })

// export default app
