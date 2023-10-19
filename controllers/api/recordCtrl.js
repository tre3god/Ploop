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

module.exports = {
  createRecord,
};
