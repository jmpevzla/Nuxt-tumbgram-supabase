import { parse } from 'cookie'
import { verify } from 'jsonwebtoken'

/**
 * @param {NuxtApp} ctx
 * @returns
 */
export default function isAuth(ctx) {
  // check if user session exists somehow

  if (process.server) {
    const { req } = ctx

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

  } else {
    const session = ctx.$supabase.auth.session()
    return !!session
  }

  //if (!process.server) {
  // const { req } = ctx

  // if (!req.headers.cookie) return false

  // const tumbgram = parse(req.headers.cookie)['tumbgram']
  // const { token } = JSON.parse(tumbgram)



  // const { user, error } = await $supabase.auth.api.getUser(token)
  // if (error) console.error(error)

  //return !!user;
}
