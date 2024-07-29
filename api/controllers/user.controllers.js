import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { sendEmail } from "../services/emailServices.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({
    message: "Api route is working.",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only see your own listings"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(errorHandler(404, "User not found!"));

    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const contactLandlord = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const { message, subject, mailto } = req.body;

    const user = await User.findOne({ _id: userId });

    if (!user.email) {
      return next(errorHandler(401, "Unauthorized! Please login first."));
    }

    const messageUrl = `<html>
    <head>
    <style>
   
  </style>
    </head>
    <body>
    <div class="container">
    <h1>New message for ${subject} in MeroEstate</h1>
    <p>from ${user.email}</p>
    <p>Subject: Regarding ${subject}</p>
    <p>
      ${message}
    </p>
  </div>
    </body>
  </html>`;

    const data = {
      to: mailto,
      text: "Hey,",
      subject: "New message",
      htm: messageUrl,
    };

    sendEmail(data);

    res.status(200).json({ message: "Message Sent" });
  } catch (error) {
    next(error);
  }
};
