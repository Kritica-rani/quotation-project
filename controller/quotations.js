const Quotation = require("../model/quotation");

module.exports.createQuotation = async (req, res) => {
  try {
    // 1. fetch the content and userId from req.body
    console.log("req.user", req.user);
    console.log("req.body", req.body);
    const { _id: userId } = req.user;
    // const userId = req._id
    const { content } = req.body; // destructing
    //2. save the data in db
    const quotation = await Quotation.create({
      content: content,
      userId: userId,
    });
    //3. return response
    return res.status(201).json({
      message: "Quotation created sucessfully",
      data: {
        quotation: quotation,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error in creating quotation",
      data: {},
    });
  }
};

module.exports.getAllQuotations = async (req, res) => {
  try {
    //1. fetch all the quotation from db
    const quotations = await Quotation.find({}).populate([
      {
        path: "user",
        select: "name",
        //nested populate
        // populate:{
        //   path:"friends",
        //   select:"likes"
        // }
      },
    ]);
    // const quotations = await Quotation.find({}).populate("user", "name");
    //2. send the fetched quotation
    return res.status(200).json({
      message: "Quotations fetch succesfully",
      data: {
        quotations: quotations,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while getting data",
      data: {
        error: err,
      },
    });
  }
};
