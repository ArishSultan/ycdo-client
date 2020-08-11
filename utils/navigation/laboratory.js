import { Link } from './index'

export default {
  pages: [
    'Laboratory',
    new Link(
      'mdi-flask-round-bottom',
      'Diagnostics',
      '/laboratory/diagnostics'
    ),
    new Link('mdi-badge-account', 'Diagnostic Token', '/laboratory')
  ],
  summaries: []
}
