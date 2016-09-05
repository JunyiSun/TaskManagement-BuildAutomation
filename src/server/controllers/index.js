

// index page
exports.index = function(req, res) {
    var suser = req.session.user;

            res.render('index', {
                title: 'EMT',
                sessionuser: suser,
                user: {},
                roles: [{type: 'Specialist', id : 1}, {type: 'Auditor', id : 2}, {type: 'Administrator', id : 2}]//['Specialist', 'Auditor', 'Administrator']
            });
};
