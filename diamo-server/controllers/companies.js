const Company = require('../database/models/company')

exports.get = function(request, response) {
    Company.find({}, function(err, all) {
        if (err) {
            console.error(err)
            return response.status(403).json({message: "MongoDB error: " + err})
        }

        return response.json(all)
    })
}

exports.post = async function (request, response) {
    let companyObj = {
        name: request.body.name,
        imageUrl: request.body.imageUrl,
        foodMenu: request.body.foodMenu
    }

    const newCompany = new Company (companyObj)
    newCompany.save(function (err) {
        if (err) {
            console.error(err)
            return response.status(403).json({message: "MongoDB error: " + err})
        }

        return response.status(201).json(companyObj)
    })
}