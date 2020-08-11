import administrator from './administrator'
import laboratory from './laboratory'
import reception from './reception'
import pharmacy from './pharmacy'

/**
 * @param {number[]} scope
 * @return {{summaries: string[], pages: any[]}|null}
 */
export function resolveNav(scope) {
  const nav = {
    summaries: [],
    pages: []
  }

  if (scope.includes(3)) {
    nav.pages = [
      ...administrator.pages,
      ...reception.pages,
      ...pharmacy.pages,
      ...laboratory.pages
    ]
  } else {
    if (scope.includes(0)) nav.pages.push(...reception.pages)
    if (scope.includes(1)) nav.pages.push(...pharmacy.pages)
    if (scope.includes(2)) nav.pages.push(...laboratory.pages)
    if (scope.includes(4)) return null
  }

  return nav
}
