const express = require("express");
const { getPublishedSessions, getMySessions, getSessionById, saveDraft, publishSession,deleteSession } = require("../Controllers/sessionControllers");

const authMiddleware = require("../middleware/authmiddleware")


const router = express.Router();

router.get("/", getPublishedSessions);
router.get("/my", authMiddleware, getMySessions);
router.get("/my/:id", authMiddleware, getSessionById);
router.post("/save-draft", authMiddleware, saveDraft);
router.post("/publish", authMiddleware, publishSession)
router.delete("/my/:id", authMiddleware, deleteSession)


module.exports = router
