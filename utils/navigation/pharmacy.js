import { Link } from './index'

export default {
  pages: [
    'Pharmacy',
    new Link('mdi-pill', 'Add Medicines', '/pharmacy/medicines/add'),
    new Link(
      'mdi-scissors-cutting',
      'Add Surgical Item',
      '/pharmacy/surgical-items/add'
    ),
    new Link(
      'mdi-test-tube',
      'Add Diagnostic Item',
      '/pharmacy/diagnostic-items/add'
    ),
    new Link(
      'mdi-cash',
      'Purchase Medicines',
      '/pharmacy/stock-purchase/medicines'
    ),
    new Link(
      'mdi-cash',
      'Purchase Surgical Items',
      '/pharmacy/stock-purchase/surgical-items'
    ),
    new Link(
      'mdi-cash',
      'Purchase Diagnostic Items',
      '/pharmacy/stock-purchase/diagnostic-items'
    ),
    new Link('mdi-warehouse', 'Medicines Stock', '/pharmacy/stock/medicines'),
    new Link(
      'mdi-warehouse',
      'Surgical Items Stock',
      '/pharmacy/stock/surgical-items'
    ),
    new Link(
      'mdi-warehouse',
      'Diagnostic Items',
      '/pharmacy/stock/diagnostic-items'
    )
  ],
  summaries: []
}
