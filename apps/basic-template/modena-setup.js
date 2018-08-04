const { express } = require('modena');
const router = express.Router();

const configureRouter = middleware => {
    router.get('/', function (req, res, next) {
        return res.render('index');
    });
    return router;
}

module.exports = { configureRouter };
