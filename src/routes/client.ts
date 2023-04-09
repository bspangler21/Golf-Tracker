import express from "express";
const router = express.Router();

router.get("/home", (req, res) => {
	res.sendFile("Home.tsx", { root: "pages" });
	console.log("router running...");
});

module.exports = router;
