export default function({ route, $auth, redirect }) {
  if ($auth.hasScope(4)) {
    if (route.path === '/doctor') {
      redirect('/')
    }

    return
  }

  if ($auth.hasScope(4)) {
    if (!route.path.includes('doctor')) {
      redirect('/doctor')
    }
  }
}
