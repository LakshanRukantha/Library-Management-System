const authenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send("<h4>User is not authenticated.</h4>");
  }
};

export { authenticate };
