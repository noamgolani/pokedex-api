// eslint-disable-next-line no-unused-vars
module.exports.errorHandler = function (err, req, res, next) {
  if (!err.status) {
    console.error(err);
    res.status(500);
    res.send("Internal server error");
  } else {
    res.status(err.status);
    res.send(err.message);
  }
};
