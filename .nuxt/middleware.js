const middleware = {}

middleware['check-scope'] = require('../middleware/check-scope.js')
middleware['check-scope'] = middleware['check-scope'].default || middleware['check-scope']

export default middleware
