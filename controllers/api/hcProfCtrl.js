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

async function getAllComments(req, res) {
  const { recordId } = req.params;
  try {
    const allComments = await Comment.find({ stoolRecordId: recordId });
    res.json(allComments);
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  createComment,
  getAllComments,
};
