const Comment = require("../../models/Comment");

async function createComment(req, res) {
  const data = req.body;
  try {
    const newComment = await Comment.create(data);
    res.json(newComment);
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  createComment,
};
