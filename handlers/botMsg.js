'use strict';

var repository = require('../lib/BotMsgRepository');

module.exports = {
    post: function contacts_post(req, res) {
      res.json(repository.post(req.body));
    }
};
