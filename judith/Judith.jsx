import express from "express";
import userModel from "../model";

const getUser = async (req, res) => {
  try {
    const myGet = await userModel.find();
    res.status(200).json({
      message: "Data Gotten",
      data: myGet,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      data: error.message,
    });
  }
};

export default getUser;
