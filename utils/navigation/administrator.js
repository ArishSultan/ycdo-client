import { Link } from './index'

export default {
  pages: [
    'Administration',
    new Link('mdi-store-24-hour', 'Branches', '/administrator/branches'),
    new Link('mdi-doctor', 'Doctors', '/administrator/doctors/'),
    // new Link('mdi-plus', 'Donors', '/administrator/donors/'),
    new Link('mdi-door', 'Rooms', '/administrator/rooms/'),
    new Link('mdi-account-group', 'Users', '/administrator/users/'),
    new Link(
      'mdi-message',
      'Pending Messages',
      '/administrator/pending-messages/'
    ),
    new Link(
      'mdi-face',
      'Register User Faces',
      '/administrator/register-user-faces/'
    )
  ],
  summaries: [
    new Link('', 'Tokens Report', 'asdas'),
    new Link('', 'Medicines Stock', 'asdas'),
    new Link('', 'Surgical Items Stock', 'asdas'),
    new Link('', 'Diagnostics Items Stock', 'asdas')
  ]
}
