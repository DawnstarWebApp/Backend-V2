const {ReasonPhrases, StatusCodes} = require('http-status-codes');
const redis = require("redis");
const {hostname} = require("os");
const PORT = process.env.PORT || 4000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const redisClient = redis.createClient(REDIS_PORT);

exports.errorResponse = (err, res, objectName) => {
    console.log(err.name);

    if (err.name === "SequelizeValidationError" || err.name === "ValidationErrorValidationError") {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({
            host:hostname(),
            status: err.statusCode || StatusCodes.UNPROCESSABLE_ENTITY,
            error: ReasonPhrases.UNPROCESSABLE_ENTITY,
            message: err.message || " Validation Error " + objectName + "."
        });

    } else if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(StatusCodes.CONFLICT).send({
            host:hostname(),
            status: err.statusCode || StatusCodes.CONFLICT,
            error: ReasonPhrases.CONFLICT,
            message: err.message || " Duplication Error on " + objectName + "."
        });
    } else if (err.name === "AssociationError") {
        return res.status(StatusCodes.CONFLICT).send({
            host:hostname(),
            status: err.statusCode || StatusCodes.CONFLICT,
            error: ReasonPhrases.CONFLICT,
            message: err.message || " Association Error on " + objectName + "."
        });
    } else if (err.message === "NotFound" || err.name === "NotFoundError") {
        return res.status(StatusCodes.NOT_FOUND).send({
            host:hostname(),
            status: err.statusCode || StatusCodes.NOT_FOUND,
            error: ReasonPhrases.NOT_FOUND,
            message: objectName + " Not Found."
        });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        host:hostname(),
        status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        error: ReasonPhrases.INTERNAL_SERVER_ERROR,
        message: err.message || " Internal Server Error occurred while processing " + objectName + "."
    });
}

exports.showAll = (res, model) => {


    return res.status(StatusCodes.OK).send({
        host:hostname(),
        status: StatusCodes.OK,
        message: ReasonPhrases.OK,
        data: model
    });
}
exports.successMessage = (res, name, action) => {
    let status = StatusCodes.OK
    if (action === "delete") {
        host:hostname(),
        status = StatusCodes.NO_CONTENT
    }

    return res.status(status).send({
        host:hostname(),
        status: status,
        message: ReasonPhrases.OK,
        data: "Successfully " + action + "d " + name
    });
}

exports.createOne = (res, model) => {
    return res.status(StatusCodes.CREATED).send({
        host:hostname(),
        status: StatusCodes.CREATED,
        message: ReasonPhrases.CREATED,
        data: model
    });
}

exports.showOne = (res, model) => {
    return res.status(StatusCodes.OK).send({
        host:hostname(),
        status: StatusCodes.OK,
        message: ReasonPhrases.OK,
        data: model
    });
}


