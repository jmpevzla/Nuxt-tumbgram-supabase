import { parse } from 'cookie'
import { verify } from 'jsonwebtoken'

export default async function (ctx) {
  const resIsAuth = await isAuth(ctx)
  if(!resIsAuth) {
    console.log('NO AUTH :(')
    return ctx.redirect('/login')
  }
  console.log('AUTH!!')
}

/**
 * @param {NuxtApp} ctx
 * @returns
 */
async function isAuth(ctx) {
  // check if user session exists somehow
  //if (!process.server) {
  const { $supabase, req } = ctx

  if (!req.headers.cookie) return false

  const tumbgram = parse(req.headers.cookie)['tumbgram']
  const { token } = JSON.parse(tumbgram)

  try {
    const decoded = verify(token, process.env.SUPABASE_JWT)
    return !!decoded
  } catch(err) {
    // err
    console.error(err)
    return false
  }

  // const { user, error } = await $supabase.auth.api.getUser(token)
  // if (error) console.error(error)

  //return !!user;
}
