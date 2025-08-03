const Session = require("../Models/Session");


const getPublishedSessions = async (req, res) => {
  const sessions = await Session.find({ status: "published" });
  res.json(sessions);
};

const getMySessions = async (req, res) => {
  try {
    console.log("Current user in getMySessions:", req.user);

    const sessions = await Session.find({ user_id: req.user.id });
    res.json(sessions);
  } catch (err) {
    console.error("Error fetching my sessions:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

 const getSessionById = async (req, res) => {
  const session = await Session.findOne({ _id: req.params.id, user_id: req.user.id });
  if (!session) return res.status(404).json({ error: "Session not found" });
  res.json(session);
};

  const saveDraft = async (req, res) => {
   try {
     const { title, tags, json_file_url, _id } = req.body;

     if (!title || !json_file_url) {
       return res.status(400).json({ error: "Title and JSON URL are required" });
     }

     let session;
     if (_id) {
       // Update existing draft
       session = await Session.findOneAndUpdate(
         { _id, user_id: req.user.id },
         { title, tags, json_file_url, status: "draft", updated_at: new Date() },
         { new: true }
       );
     } else {
       // Create new draft
       session = new Session({
         user_id: req.user.id,
         title,
         tags,
         json_file_url,
         status: "draft",
       });
       await session.save();
     }

     res.json(session);
   } catch (err) {
     console.error("Error saving draft:", err.message);
     res.status(500).json({ error: "Server error saving draft" });
   }
 };


const publishSession = async (req, res) => {
  try {
    const { _id, title, tags, json_file_url } = req.body;

    if (!_id) {
      return res.status(400).json({ error: "Session ID required to publish" });
    }

    const session = await Session.findOneAndUpdate(
      { _id, user_id: req.user.id }, // ensure user owns it
      {
        title,
        tags,
        json_file_url,
        status: "published",
        updated_at: new Date(),
      },
      { new: true }
    );

    if (!session) {
      console.log("Publish failed: session not found for user", req.user.id);
      return res.status(400).json({ error: "Failed to publish session" });
    }

    res.json(session);
  } catch (err) {
    console.error("Publish error:", err.message);
    res.status(500).json({ error: "Server error while publishing" });
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