function propChecker(req,res,next) {
    if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('cohort_id')) {
        res.status(400).json({
            message: "Please include a name and a cohort id"
        })
    } else {
        next()
    }
}

module.exports = propChecker