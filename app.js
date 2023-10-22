const express = require('express');
const path = require('path');

const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const portfolioRouter = require('./routes/portfolioRoutes');
const inviteRouter = require('./routes/inviteRoutes');
const messageRouter = require('./routes/messageRoutes');
const userRouter = require('./routes/userRoutes');
const menuRouter = require('./routes/menuRoutes');
const viewRouter = require('./routes/viewRoutes');
const catalougeRouter = require('./routes/catalougeRoutes');
const brochureRouter = require('./routes/brochureRoutes');
const themeRouter = require('./routes/themeRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const searchRouter = require('./routes/searchRoutes');
const customRouter = require('./routes/customRoutes');

const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.options('*', cors());

// app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: false,
        "block-all-mixed-content": true,
        "upgrade-insecure-requests": true,
        directives: {
            "default-src": [
                "'self'",
                "https://portiblobstorage.blob.core.windows.net"
                // "https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.17.0.0.0/payment_gateway_widget.html",
            ],
            "base-uri": "'self'",
            "font-src": [
                "'self'",
                "https:",
                "data:"
            ],
            "frame-ancestors": [
                "'self'"
            ],
            "img-src": [
                "'self'",
                "data:",
                "https://portiblobstorage.blob.core.windows.net"
                // "https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.17.0.0.0/icons/infinity-loader.svg",
            ],
            "object-src": [
                "'none'",
            ],
            "script-src": [
                "'self'",
                "'unsafe-inline'",
                "https://portiblobstorage.blob.core.windows.net",
                "https://cdn.jsdelivr.net/npm/chart.js"
                // "https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.17.0.0.0/khalti-checkout.iffe.js",
            ],
            "script-src-attr": "'none'",
            "style-src": [
                "'self'",
                "'unsafe-inline'",
                "https://fonts.googleapis.com",
                "https://portiblobstorage.blob.core.windows.net"
                // "https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.17.0.0.0/khalti-checkout.iffe.js",
            ]
        },
    }),
    helmet.dnsPrefetchControl({
        allow: true
    }),
    helmet.frameguard({
        action: "deny"
    }),
    helmet.hidePoweredBy(),
    helmet.hsts({
        maxAge: 123456,
        includeSubDomains: false
    }),
    helmet.ieNoOpen(),
    helmet.noSniff(),
    helmet.referrerPolicy({
        policy: ["origin", "unsafe-url"]
    }),
    helmet.xssFilter()
);
app.use(mongoSanitize());
app.use(xss());
app.use(compression());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === 'development') {
    console.log('running development server...')
} else {
    console.log('running production server...')
}

app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', viewRouter);
app.use('/api/users', userRouter);
app.use('/api/themes', themeRouter);
app.use('/paywith', paymentRouter);
app.use('/api/v1/portfolio', portfolioRouter);
app.use('/api/v1/invite', inviteRouter);
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/menu', menuRouter);
app.use('/api/v1/catalouge', catalougeRouter);
app.use('/api/v1/brochure', brochureRouter);
app.use('/api/v1/search', searchRouter);
app.use('/api/v1/customTheme', customRouter);


app.get('*', function (req, res, next) {
    res.locals.user = req.user || null;
    next();
})

app.all('*', (req, res, next) => {
    res.status(404).render('404', {
        title: "Page Not Found"
    })
    // next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;