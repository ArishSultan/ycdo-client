export class Router {
  /**
   * @readonly
   * @type {({icon: string, name: string, to: string}|{icon: string, name: string, to: string}|{icon: string, name: string, to: string})[]}
   */
  static pharmacyRoutes = [
    { icon: 'mdi-pill', name: 'Medicines', to: '/pharmacy/medicines/' },
    {
      icon: 'mdi-content-cut',
      name: 'Surgical Equipments',
      to: '/pharmacy/surgical-equipments'
    },
    {
      icon: 'mdi-flask',
      name: 'Lab Test Equipments',
      to: '/pharmacy/lab-test-equipments'
    }
  ]

  /**
   *
   * @param {number[]} scope
   */
  static setupRoutes(scope) {
    this.routes = []

    if (scope.includes(1)) {
      Router.routes.push(...Router.pharmacyRoutes)
    }
  }
}
