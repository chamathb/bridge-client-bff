const {bltypesService} = require('../service/BlTypesService');
const {
    PATHS,
    HTTP_METHODS
} = require('../conf');
const JSON = require('circular-json');
const { ERROR_CODES} = require('../conf/ErrorCodes');


const getHandler = (req, res) => {
    console.log('bl0')
    try {
        console.log('bl0.0')
        if (req.params.ID !== null && typeof req.params.ID !== 'undefined') {
            bltypesService.get(req.params.ID).then(function (result) {
                return res.status(result.status).send(result.data);
                
            }).catch(function (error) {
                return res.status(ERROR_CODES.INTERNAL_SERVER_ERROR).send(JSON.stringify(error));
                
            });

            console.error('bl1')
        }
        else {
            bltypesService.getAll().then(function (result) {
                return res.status(result.status).send(result.data);
            }).catch(function (error) {
                return res.status(ERROR_CODES.INTERNAL_SERVER_ERROR).send(JSON.stringify(error));
            });
            console.error('bl2')
        }
        console.error('bl3')
    }

    catch (error) {
        return res.status(ERROR_CODES.INTERNAL_SERVER_ERROR).send(JSON.stringify(error));
        
    }

    
};

const postHandler = (req, res) => {

    try {
        bltypesService.post(req.body).then(function (result) {

            return res.status(result.status).send(result.data);

        }).catch(function (error) {
            console.error(error);
            return res.status(ERROR_CODES.INTERNAL_SERVER_ERROR).send(JSON.stringify(error));
        });
    } catch (error) {
        console.error(error);
        return res.status(ERROR_CODES.INTERNAL_SERVER_ERROR).send(JSON.stringify(error));
    }
};

const putHandler = (req, res) => {
    try {
        bltypesService.put(req.body).then(function (result) {
            return res.status(result.status).send(result.data);

        }).catch(function (error) {
            return res.status(ERROR_CODES.INTERNAL_SERVER_ERROR).send(JSON.stringify(error));
        });
    } catch (error) {
        return res.status(ERROR_CODES.INTERNAL_SERVER_ERROR).send(JSON.stringify(error));
    }
};

module.exports = {
    blType : {
        [PATHS.BLTYPE] : [{
            method : HTTP_METHODS.GET,
            handler :getHandler
        },
        {
            method : HTTP_METHODS.POST,
            handler : postHandler
        },
        {
            method : HTTP_METHODS.PUT,
            handler : putHandler
        }
    ],
    [PATHS.BLTYPE_ID]: [{
        method:HTTP_METHODS.GET,
        handler : getHandler
    }]
    }
};