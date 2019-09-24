const {bltypeService} = require('../service/BlTypeService');
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
            console.error('blIF')
            bltypeService.getbl(req.params.ID).then(function (result) {
                return res.status(result.status).send(result.data);
                
            }).catch(function (error) {
                return res.status(ERROR_CODES.INTERNAL_SERVER_ERROR).send(JSON.stringify(error));
                
            });

            console.error('bl1')
        }
        else {
            console.error("BL3")
            bltypeService.getblAll().then(function (result) {
                return res.status(result.status).send(result.data);
            
            }).catch(function (error) {
                return res.status(ERROR_CODES.INTERNAL_SERVER_ERROR).send(JSON.stringify(error));
            });
            console.error('bl4')
        }
        console.error('bl5')
    }

    catch (error) {
        return res.status(ERROR_CODES.INTERNAL_SERVER_ERROR).send(JSON.stringify(error));
        
    }

    
};

const postHandler = (req, res) => {

    try {
        bltypeService.postbl(req.body).then(function (result) {

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
        bltypeService.putbl(req.body).then(function (result) {
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