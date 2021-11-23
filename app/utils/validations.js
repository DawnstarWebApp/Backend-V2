const {ReasonPhrases, StatusCodes} = require('http-status-codes');
const {errorResponse} = require("./validations");

exports.errorResponse = (err, res, objectName) => {
    if (err.type === 'ObjectId') {

        return res.status(StatusCodes.NOT_FOUND).json({
            status: ReasonPhrase.NOT_FOUND,
        });
    }
    if (err ) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: ReasonPhrase.BAD_REQUEST,
        });
    }
    if (err.type === 'ValidationError') {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: ReasonPhrases.INTERNAL_SERVER_ERROR,
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) + " " + objectName,
            status: StatusCodes.INTERNAL_SERVER_ERROR
        });
    }
    if(err.type === 'CastError'){
        return errorResponse(res, StatusCodes.BAD_REQUEST, 'CastError', objectName);
    }
    if(err.type === 'DocumentNotFoundError'){
        return errorResponse(res, StatusCodes.BAD_REQUEST, 'MongoError', objectName);
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        error: ReasonPhrases.INTERNAL_SERVER_ERROR,
        message: " Internal Server Error occurred while processing " + objectName + "."
    });
}

exports.showAll = (res, model) => {
    return res.status(StatusCodes.OK).send({
        status: StatusCodes.OK,
        message: ReasonPhrases.OK,
        data: model
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

exports.deleteOne = (res, model) => {
    return res.status(StatusCodes.NO_CONTENT).send({
        status: StatusCodes.NO_CONTENT,
        message: model + " deleted successfully"
    });
}