const user = require("../models/user.model")

async function handleGetAllUsers(req, res) {
    const allDBUser = await user.find({})
    res.send(allDBUser)
}

async function handleGetUserByID(req, res) {
    const allDBUsers = await user.findById(req.params.id)
    if (!allDBUsers) return res.status(404).json({ error: "User Not Found" })
    res.send(allDBUsers)
}
async function handleUpdateUserByID(req, res) {
    await user.findByIdAndUpdate(req.params.id, { lastName: "Changed ln" });
    res.send({ status: "User Updated Successfully" })
}
async function handleDeleteUserByID(req, res) {
    await user.findByIdAndDelete(req.params.id);
    res.send({ status: "User Deleted Successfully" })
}
async function handleCreateUsers(req, res) {
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.job || !body.department) {
        return res.status(400).json({ message: "All Field Are Required" })
    }
    const result = await user.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        job: body.job,
        department: body.department,
    })
    console.log("Result: ", result)
    return res.status(201).json({ msg: "Success" })

}

module.exports = {
    handleGetAllUsers,
    handleGetUserByID,
    handleUpdateUserByID,
    handleDeleteUserByID,
    handleCreateUsers
}