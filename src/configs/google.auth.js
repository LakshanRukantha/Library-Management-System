import GoogleStrategy, { Strategy } from "passport-google-oauth20";

import { configs } from "./index";

const googleAuth = (passport) => {
  GoogleStrategy.Strategy;

  passport.use(
    new Strategy(
      {
        clientID: configs.GOOGLE_CLIENT_ID,
        clientSecret: configs.GOOGLE_CLIENT_SECRET,
        callbackURL: configs.GOOGLE_REDIRECT_URL,
      },
      (accessToken, refreshToken, profile, callback) => {
        return callback(null, profile);
      }
    )
  );
  passport.serializeUser((user, callback) => {
    callback(null, user.id);
  });

  passport.deserializeUser((id, callback) => {
    callback(null, id);
  });
};

export { googleAuth };
