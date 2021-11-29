const {ReasonPhrases, StatusCodes} = require('http-status-codes');

exports.errorResponse = (err, res, objectName) => {
    console.log(err.name);

    if (err.name === "SequelizeValidationError" || err.name === "ValidationErrorValidationError") {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({
            status: err.statusCode || StatusCodes.UNPROCESSABLE_ENTITY,
            error: ReasonPhrases.UNPROCESSABLE_ENTITY,
            message: err.message || " Validation Error " + objectName + "."
        });

    } else if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(StatusCodes.CONFLICT).send({
            status: err.statusCode || StatusCodes.CONFLICT,
            error: ReasonPhrases.CONFLICT,
            message: err.message || " Duplication Error on " + objectName + "."
        });
    } else if (err.name === "AssociationError") {
        return res.status(StatusCodes.CONFLICT).send({
            status: err.statusCode || StatusCodes.CONFLICT,
            error: ReasonPhrases.CONFLICT,
            message: err.message || " Association Error on " + objectName + "."
        });
    } else if (err.message === "NotFound"  || err.name === "NotFoundError") {
        return res.status(StatusCodes.NOT_FOUND).send({
            status: err.statusCode || StatusCodes.NOT_FOUND,
            error: ReasonPhrases.NOT_FOUND,
            message: objectName + " Not Found."
        });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        error: ReasonPhrases.INTERNAL_SERVER_ERROR,
        message: err.message || " Internal Server Error occurred while processing " + objectName + "."
    });
}

exports.showAll = (res, model) => {
    return res.status(StatusCodes.OK).send({
        status: StatusCodes.OK,
        message: ReasonPhrases.OK,
        data: model
    });
}
exports.successMessage = (res, name, action) => {
    let status = StatusCodes.OK
    if (action === "delete") {
        status = StatusCodes.NO_CONTENT
    }

    return res.status(status).send({
        status: status,
        message: ReasonPhrases.OK,
        data: "Successfully " + action + "d " + name
    });
}

exports.createOne = (res, model) => {
    return res.status(StatusCodes.CREATED).send({
        status: StatusCodes.CREATED,
        message: ReasonPhrases.CREATED,
        data: model
    });
}

exports.showOne = (res, model) => {
    return res.status(StatusCodes.OK).send({
        status: StatusCodes.OK,
        message: ReasonPhrases.OK,
        data: model
    });
}

