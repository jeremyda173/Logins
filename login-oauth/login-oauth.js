// function loginWithGoogle() {
//     const clientId = '589973080117-pvctr2n900v0badf43a3nokmsekfvlnn.apps.googleusercontent.com';
//     const redirectUri = 'https://loginconoauth.com'; // Debe coincidir con la URL configurada en Google Developers Console

//     const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=email%20profile`;
    

//     window.location.href = authUrl;
// }

const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();

passport.use(new GoogleStrategy({
    clientID: '589973080117-pvctr2n900v0badf43a3nokmsekfvlnn.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'https://loginconoauth.com'
  },
  (accessToken, refreshToken, profile, done) => {
    // Aquí puedes guardar el perfil de usuario en tu base de datos o hacer otras operaciones
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Autenticación exitosa, redirige a la página de inicio o dashboard
    res.redirect('/dashboard');
  }
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/', (req, res) => {
  res.send('Página de inicio');
});

app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Bienvenido, ${req.user.displayName}!`);
  } else {
    res.redirect('/login');
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
