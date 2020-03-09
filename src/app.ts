import env from 'dotenv';
import express from 'express';
import auth from '~routes/auth';
import middleWares from '~middlewares';
import dashboard from '~routes/dashboard';

const app = express();

// ENVs
env.config();

// middlewares
middleWares(app);

// frontEnd
app.use('/app', express.static('public'));

app.get('/', (_req, res) => {
  // res.redirect('/app')
  res.status(400).send("nope")
});


// APIs
app.use('/auth', auth);
app.use('/dashboard', dashboard);

// responding to all unknowns requests
app.use((req, res) => {
  res.status(404).json({
    title: 'Unknown Request',
    message: 'WARNING: sending more suspicious requests will get you BLOCKED',
    clientInformation: {
      requestUrl: req.baseUrl,
      clientIp: req.ip
    }
  });
});



export default app;