const Record = require("../../models/Record");

async function createRecord(req, res) {
  const data = req.body;
  try {
    const newRecord = await Record.create(data);
    res.json(newRecord);
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function getRecords(req, res) {
  try {
    const userId = req.user._id;
    const records = await Record.find({ userId });
    res.json(records);
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching records:", error);
    res.status(500).json({ error: "Error fetching records" });
  }
}

module.exports = {
  createRecord,
  getRecords,
};
