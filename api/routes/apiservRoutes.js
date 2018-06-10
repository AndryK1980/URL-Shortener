'use strict';

module.exports = function (app) {
   var url = require('../controllers/urlController');

  // apiServ Routes
  app.route('/urls')
    .post(url.create_a_url)
    .get(url.list_all_urls)

  app.route('/:url_code')
    .get(url.redirect)
};
