import { Link } from './index'

export default {
  pages: [
    'Reception',
    new Link(
      'mdi-badge-account',
      'Generate Token',
      '/reception/generate-token'
    ),
    new Link('mdi-printer', 'Duplicate Token', '/reception/duplicate-token'),
    new Link('mdi-account-plus', 'Register Patient', '/reception/patients/add'),
    new Link('mdi-account-group', 'Registered Patients', '/reception/patients'),
    new Link('mdi-numeric-2-box', 'Second Turn', '/reception/second-turn'),
    new Link('mdi-numeric-3-box', 'Third Turn', '/reception/third-turn')
  ],
  summaries: []
}
