const Quotation = require("../model/quotation");

module.exports.createQuotation = async (req, res) => {
  try {
    // 1. fetch the content and userId from req.body
    console.log("req.body", req.body);
    const { content, userId } = req.body; // destructing
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
