const { useParams } = require("react-router-dom");
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

async function hcGetRecords(req, res) {
  try {
    const { userId } = req.params;
    const records = await Record.find({ userId });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Unable to get record" });
  }
}

async function hcGetOneRecord(req, res) {
  try {
    const { recordId } = req.params;
    const record = await Record.findById({ _id: recordId });
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: "Unable to find this record" });
  }
}

async function deleteRecord(req, res) {
  try {
    const { recordId } = req.params;
    const record = await Record.findOneAndDelete({ _id: recordId });
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: "Error deleting record" });
  }
}

async function editRecord(req, res) {
  try {
    // need to add validataion here or anybody can add any data in
    const { recordId } = req.params;
    const editedData = req.body;
    // console.log("edited" + editedData);
    const record = await Record.findOneAndUpdate(
      { _id: recordId },
      editedData,
      { new: true }
    );
    res.json(record);
    await record.save();
  } catch (error) {
    // need to have different error codes
    res.status(500).json({ error: "Error updating record" });
  }
}

module.exports = {
  createRecord,
  getRecords,
  deleteRecord,
  editRecord,
  hcGetRecords,
  hcGetOneRecord,
};
