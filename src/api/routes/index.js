import { authenticate } from "../middlewares/auth.middleware";

const routesinit = (app, passport, logger) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/books",
      failureRedirect: "/login",
    }),
    (req, res) => {
      logger.info("✅ User Authenticated.");
    }
  );
  app.get("/books", authenticate, (req, res) => {
    res.send("<h4>User is authenticated.</h4>");
  });
};
export { routesinit };
