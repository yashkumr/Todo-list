
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

//createuserController
export const createUserController = async (req, res) => {
  try {
    const { name, email, password,number} = req.body;
    

    let productPictures = [];
    const { productPicture } = req.files;

    if (productPicture && productPicture.length > 0) {
      productPictures = productPicture.map((file) => {
        return { img: file.filename };
      });
    }

    //validations
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password && password !== 10) {
      return res.send({ message: "Password is required  & 10 character long" });
    }
    if(!number ){
      return res.send({message:"Number is Required"});
    }

    //chech user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      console.log(existingUser);
      return res.status(200).send({
        success: false,
        message: "This email is already register",
      });
    }
    const hashedPassword = await hashPassword(password);


    
    //save
    const user = await new userModel({
      name,
      
      productPictures,
      email,
      number,
      password:hashedPassword,
    }).save();
    

    res.status(200).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

//POST Routes
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//getUserController
export const getUserController = async (req, res) => {
  try {
    const users = await userModel.find({});

    res.status(200).send({
      success: true,
      message: "All Users",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting  users",
      error,
    });
  }
};

//getSingleUserController
export const getSingleUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.params._id });
    console.log(user);

    res.status(200).send({
      success: true,
      message: "Error in getting single User",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      message: "Error getting single user",
    });
  }
};

//updateUserController

export const updateUserController = async (req, res) => {
  try {
    const { name, email, password,number } = req.body;

    let productPictures = [];
    const { productPicture } = req.files;

    if (productPicture && productPicture.length > 0) {
      productPictures = productPicture.map((file) => {
        return { img: file.filename };
      });
    }

    const users = await userModel.findByIdAndUpdate(
      req.params.pid,
      {
        name: name,
        
        email: email,
        number: number,
        password: password,
        productPictures,
      },
      { new: true }
    );
    await users.save();
    res.status(201).send({
      success: true,
      message: "users Updated Successfully",
      users,
    });

  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      message: "Error in user Updation",
      error,
    });
  }
};

//deleteUserController

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await userModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Porduct",
      error,
    });
  }
};
