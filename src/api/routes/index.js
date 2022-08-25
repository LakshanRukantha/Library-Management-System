const routesinit = (app, passport, logger) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
      // Successful authentication, redirect home.
      logger.info("✅ User Authenticated.");
      res.redirect("/welcome");
    }
  );
};
export { routesinit };
