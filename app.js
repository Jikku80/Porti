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
const catalougeRouter = require('./routes/catalougeRoutes')
const themeRouter = require('./routes/themeRoutes')

const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.options('*', cors());

app.use(helmet());
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
app.use('/api/v1/portfolio', portfolioRouter);
app.use('/api/v1/invite', inviteRouter);
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/menu', menuRouter);
app.use('/api/v1/catalouge', catalougeRouter);


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