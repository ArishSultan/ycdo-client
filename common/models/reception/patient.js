// import moment from 'moment'
import { Model } from '../_.model'

/**
 * @extends Model
 * @author Arish Khan <arishsultan104@gmail.com>
 */
export class Patient extends Model {
  /** @type {string} */
  dob = new Date().toISOString().substr(0, 10)

  /** @type {string} */
  name = undefined

  /** @type {string} */
  cnic = undefined

  /** @type {string} */
  contact = undefined

  /** @type {string} */
  address = undefined

  /** @type {Date | number} */
  createdAt = undefined
}
