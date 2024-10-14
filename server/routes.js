import { getHelloWorld } from "./api/index.js";
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

router.get("/hello-world", getHelloWorld);

export default router;
