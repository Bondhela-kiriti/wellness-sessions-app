const Session = require("../Models/Session");


const getPublishedSessions = async (req, res) => {
  const sessions = await Session.find({ status: "published" });
  res.json(sessions);
};

 const getMySessions = async (req, res) => {
  const sessions = await Session.find({ user_id: req.user.id });
  res.json(sessions);
};

 const getSessionById = async (req, res) => {
  const session = await Session.findOne({ _id: req.params.id, user_id: req.user.id });
  if (!session) return res.status(404).json({ error: "Session not found" });
  res.json(session);
};

 const saveDraft = async (req, res) => {
  try {
    const { _id, title, tags, json_file_url } = req.body;
    let session;

    if (_id) {
      session = await Session.findOneAndUpdate(
        { _id, user_id: req.user.id },
        { title, tags, json_file_url, status: "draft", updated_at: new Date() },
        { new: true }
      );
    } else {
      session = await Session.create({
        user_id: req.user.id,
        title,
        tags,
        json_file_url,
        status: "draft",
      });
    }

    res.json(session);
  } catch (err) {
    res.status(500).json({ error: "Failed to save draft" });
  }
};

 const publishSession = async (req, res) => {
  try {
    const { _id, title, tags, json_file_url } = req.body;
    let session;

    if (_id) {
      session = await Session.findOneAndUpdate(
        { _id, user_id: req.user.id },
        { status: "published", title, tags, json_file_url, updated_at: new Date() },
        { new: true }
      );
    } else {
      session = await Session.create({
        user_id: req.user.id,
        title,
        tags,
        json_file_url,
        status: "published",
      });
    }

    res.json(session);
  } catch (err) {
    res.status(500).json({ error: "Failed to publish session" });
  }
};

 const deleteSession = async (req, res) => {
  try {
    const session = await Session.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });
    if (!session) return res.status(404).json({ error: "Session not found" });
    res.json({ message: "✅ Session deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete session" });
  }
};


module.exports={getPublishedSessions, getMySessions, getSessionById, saveDraft, publishSession, deleteSession}