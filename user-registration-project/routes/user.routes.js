const express = require("express")
const user = require("../models/user.model")
const { handleGetAllUsers, handleGetUserByID, handleUpdateUserByID, handleDeleteUserByID, handleCreateUsers } = require("../controllers/user.controller")

const router = express.Router();

router
    .route("/")
    .get(handleGetAllUsers)
    .post(handleCreateUsers)

router
    .route("/:id")
    .get(handleGetUserByID)
    .patch(handleUpdateUserByID)
    .delete(handleDeleteUserByID)

module.exports = router