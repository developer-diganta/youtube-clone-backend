require("dotenv").config();
const express = require('express');
const session = require("express-session");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const cors = require("cors");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const app = express();
app.use(cors())
app.use(express.json())
app.use(
    session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            // Here, you can store user details in your database
            done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        console.log(req.user)
        const token = jwt.sign(
            { id: req.user.id, name: req.user.displayName, email: req.user.emails[0].value },
            "your_jwt_secret",
            { expiresIn: "1h" }
        );
        console.log({token})
        res.redirect(`http://localhost:5173/auth?token=${token}`);
    }
);

// 🔹 Protected Route Middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, "your_jwt_secret", (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
};

app.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "You have access!", user: req.user });
});

app.get("/", (req, res) => {
    res.status(200).json({
        message:"Ok"
    })
})

app.listen(3000, () => {
    console.log("RUNNING ON 3000")
})