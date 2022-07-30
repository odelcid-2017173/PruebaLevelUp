"use strict";
const { set } = require("mongoose");
const User = require("../models/user");
const { validateData } = require("../utils/validate");
exports.test = (req, res) => {
  return res.send({ message: "Function test is running Form" });
};

exports.registerForm = async (req, res) => {
  try {
    const params = req.body;
    const data = {
      name: params.name,
      address: params.address,
      gender: params.gender,
      number: params.number,
      date: params.date,
      student: params.student,
      enrollmentDate: new Date(),
      carne: params.carne,
      poetry: params.poetry,
      fecha: new Date(),
    };
    const msg = validateData(data);
    if (msg) return res.status(400).send(msg);

    if (data.date < "17")
      return res.send({ message: "Only over 17 years old are accepted" });
    const already = await User.findOne({ carne: params.carne });
    if (
      data.gender !== "masculino" &&
      data.gender !== "femenino" &&
      data.gender !== "Femenino" &&
      data.gender !== "Masculino"
    )
      return res.send({ message: "Gender Invalid, sorry" });
    if (already)
      return res.status(400).send({ message: "carne already in use" });
    if (
      data.poetry !== "lírica" &&
      data.poetry !== "épica" &&
      data.poetry !== "dramática" &&
      data.poetry !== "Lírica" &&
      data.poetry !== "Épica" &&
      data.poetry !== "Dramática"
    )
      return res.send({ message: "Poetry genre not found" });

    if (
      data.carne.charAt(0) !== "A" ||
      data.carne.charAt(2) !== "5" ||
      data.carne.charAt() === "0" ||
      (data.carne.charAt(4) !== "1" &&
        data.carne.charAt(4) !== "3" &&
        data.carne.charAt(4) !== "9")
    )
      return res.send({ message: "Invalid Credentials" });
    if (data.carne.length < 5) {
      return res.send({ message: "Minimum 5 characters" });
    } else if (data.carne.length > 5) {
      return res.send({ message: "Maximum 5 characters" });
    }

    const user = new User(data);
    await user.save();
    if (data.carne.charAt(4) === "1") {
      const d = new Date();
      return res.send({
        message: "Your poetry genre is Drama " + d.setMonth(d.getMonth() + 2),
      });
    }
    if (data.carne.charAt(4) === "3") {
      return res.send({ message: "Your poetry genre is Epic" });
    }
    if (data.carne.charAt(4) === "9") {
      return res.send({ message: "Your poetry genre is Lyrical" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

exports.getForms = async (req, res) => {
  try {
    const forms = await User.find();
    if (!forms) return res.status(404).send({ message: "forms not found" });
    return res.send({ message: "Forms found: ", forms });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
