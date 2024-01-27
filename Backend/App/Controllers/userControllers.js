import userModel from "../../Database/Models/userModels.js";
import { resGen } from "../MiddleWare/helper.js";
import { cathcAsync } from "./errorContollers.js";

export const addUser = cathcAsync(async function (req, res, next) {
  const user = await userModel.create(req.body);
  resGen(res, 201, "success", "User added to the system", user);
});

export const showAllUsers = cathcAsync(async function (req, res, next) {
  const users = await userModel.find();
  resGen(res, 200, "success", "All users showed successfully", users);
});

export const showSingleUser = cathcAsync(async function (req, res, next) {
  resGen(res, 200, "success", "User showed successfully", req.singleUser);
});

export const deleteUser = cathcAsync(async function (req, res, next) {
  const user = await userModel.findByIdAndUpdate(
    req.params.id,
    { active: false },
    { new: true, runValidators: true }
  );
  resGen(res, 204, "success", "User deleted successfully", user);
});

export const deleteAllUsers = cathcAsync(async function (req, res, next) {
  await userModel.deleteMany();
  resGen(res, 204, "success", "All users deleted form DB !!");
});

export const getUserStatistics = cathcAsync(async function (req, res, next) {
  const stats = await userModel.aggregate([
    {
      $match: { userName: /^Admin/ },
    },
    {
      $group: {
        _id: "$active",
        sm: { $sum: 1 },
        lower: { $min: "$userName" },
      },
    },
    {
      $sort: { userName: 1 },
    },
    {
      $addFields: { Active: "$_id" },
    },
    {
      $project: { _id: 0 },
    },
  ]);
  resGen(res, 200, "Success", "statistics showed successfully", stats);
});
