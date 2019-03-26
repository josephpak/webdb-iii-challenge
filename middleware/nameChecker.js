function nameChecker(req,res,next) {
    if (!req.body.hasOwnProperty('name')) {
        res.status(400).json({
            message: "Please include a name"
        })
    } else {
        next()
    }
}

module.exports = nameChecker