export class Navigation {
  /** @type {string} */
  home = undefined

  /** @type {string} */
  header = undefined

  /** @type {Link[]} */
  links = undefined

  /** @type {Link[]} */
  summaries = undefined

  /**
   * @param {string} header
   * @param {Link[]} links
   * @param {Link[]} summaries
   * @param {string} home
   */
  constructor(header, links, summaries, home) {
    this.home = home
    this.links = links || []
    this.header = header || []
    this.summaries = summaries || []
  }

  // generate()
}

export class Link {
  /** @type {string} */
  to = undefined

  /** @type {string} */
  icon = undefined

  /** @type {string} */
  text = undefined

  /**
   * @param {string} icon
   * @param {string} text
   * @param {string} to
   */
  constructor(icon, text, to) {
    this.to = to
    this.icon = icon
    this.text = text
  }
}
