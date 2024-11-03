import { Webhook } from "svix";
import User from "../models/userModels.js";
import razorpay from "razorpay";
import Transaction from "../models/transactionModel.js";
export const clerkWebhook = async (req, res) => {
  // console.log("inside Clerk Webhook");

  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await webhook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-signature"],
      "svix-timestamp": req.headers["svix-timestamp"],
    });
    // console.log(t);

    const { data, type } = req.body;
    // console.log("this is data--->>",data);
    // console.log("this is type--->>",type);

    switch (type) {
      case "user.created": {
        const res = await User.create({
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
          firstName: data.first_name,
          lastName: data.last_name,
        });
        // console.log("this is res--->>",res);
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
          firstName: data.first_name,
          lastName: data.last_name,
        };

        const res2 = await User.findOneAndUpdate(
          { clerkId: data.id },
          userData
        );

        //  console.log("this is res2--->>",res2);

        break;
      }

      case "user.deleted": {
        const res3 = await User.findOneAndDelete({ clerkId: data.id });
        //  console.log("this is res3--->>",res3);

        break;
      }

      default:
        console.log("Unknown Event");
        break;
    }
  } catch (error) {
    res.json({ error: error.message, success: false });
  }
};

export const userCredits = async (req, res) => {
  try {
    const { clerkId } = req.body;
    //   console.log("this is clerkId--->>",clerkId);
    const userCredits = await User.findOne({ clerkId });
    //   console.log("this is userCredits--->>",userCredits);
    if (userCredits) {
      res.json(userCredits);
    } else {
      res.status(404).json({ message: "User not found", success: false });
    }
  } catch (error) {
    res.json({ error: error.message, success: false });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const razorpayPayment = async (req, res) => {
  try {
    const { clerkId, planId } = req.body;
   // console.log("this is clerkId--->>", req.body);
    const userData = User.findOne({ clerkId });

    if (!userData || !planId) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    let credit, plan, amount, date;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        credit = 100;
        amount = 10;
        break;
      case "Advanced":
        plan = "Advanced";
        credit = 500;
        amount = 50;
        break;
      case "Business":
        plan = "Business";
        credit = 5000;
        amount = 200;
        break;
        default:
            return res.status(404).json({ message: "Plan not found", success: false });
    }
    date= Date.now()

    const transactionData = {
      clerkId,
      plan,
      amount,
      credit,
      date

      
    };

    const newPayment = await Transaction.create(transactionData)

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: newPayment._id,
    };

    await razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        return res.status(500).json({ message: "Something went wrong", success: false });
      }
      res.json(order);
    })
  } catch (error) {
    res.json({ error: error.message, success: false });
  }
};
