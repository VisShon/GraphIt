const passport = require('passport');
const {Strategy} = require('passport-google-oauth2');
const jwt = require('jsonwebtoken');
const Member = require('../models/Member');

passport.use('google',new Strategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback",
    passReqToCallback   : true,
    scope: ["profile", "email"],
    },
    async(request, accessToken, refreshToken, profile, done) => {
        try {
            const obj = await Member.findOne({email: profile.email});Member

            if (!obj){
                const newUser = new Member({
                    email: profile.email,
                    phone: 'No Phone Number',
                    name: profile.displayName,
                })
                await newUser.save()

                const token = await jwt.sign({
                    _id: newUser._id,
                    email: newUser.email,
                    phone: newUser.phone,
                    name: newUser.name,
                },process.env.JWT_SECRET);

                done(null,newUser,{message:"Auth Successfull",token: token})
            }
            else{
                const token = await jwt.sign({
                    _id: obj._id,
                    email: obj.email,
                    phone: obj.phone,
                    name: obj.name,
                },process.env.JWT_SECRET);
                done(null,obj,{message:"Auth Successfull",token: token})
            }
        }
        catch (err){
            console.error(err);
            done(err,false,{message: "Internal Server Error"});
        }
    }
));

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
