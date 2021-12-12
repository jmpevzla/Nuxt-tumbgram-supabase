import isAuth from './shared/isAuth'

export default async function (ctx) {
  const resIsAuth = isAuth(ctx)
  if(resIsAuth) {
    console.log('AUTH :(')
    return ctx.redirect('/')
  }
  console.log('NO AUTH!!')
}
