import express from "express";

const router = express.Router();

module.exports = function golfers(db: any) {
	router.route("/golfers").get((req, res) => {
		res.send(db.get("golfers").value());
	});

	return router;
};
