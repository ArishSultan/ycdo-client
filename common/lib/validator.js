/**
 * @file provides the utility functions for validating
 * Vuetify forms.
 *
 * @version 1.0.0
 * @author arish <arishsultan104@gmail.com>
 */

/**
 * @param {string} value
 * @returns {boolean|string}
 */
export const required = value => !!value || 'Please provide some value'

/**
 * @param {string} value
 * @returns {boolean|string}
 */
export const price = value => +value > 0 || 'You have entered an invalid price'

/**
 * @param {string} value
 * @returns {boolean|string}
 */
export const priceWZ = value =>
  +value >= 0 || 'You have entered an invalid price'

/**
 * @param {string} value
 * @returns {boolean|string}
 */
export const priceDM = value => +value <= 999999 || 'Price provided is too high'

/**
 * @param {string} value
 * @returns {boolean|string}
 */
export const priceRules = [required, price, priceDM]
