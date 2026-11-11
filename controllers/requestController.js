const Service= require('../models/ServiceRequest')
// create request


exports.createRequest=async(req, res)=> {
  try {
    const { title, category, description, priority, } = req.body;
    console.log("Incoming user from Auth Middleware:", req.user); // 🔍 MUST NOT BE UNDEFINED

    const attachments =req.files.map((file) => ({
        url: file.path,
        type: file.mimetype.startsWith("image")
          ? "image"
          : file.mimetype.startsWith("video")
            ? "video"
            : "file",

        originalName: file.originalname,
        format: file.originalname.split(".").pop(),
      })) || [];
      console.log("Is attachments a real array?:", Array.isArray(attachments)); 
console.log("Raw attachments payload:", attachments);

    const newRequest = new Service({
      title,
      category,
      description,
      priority,
      attachments,
      user: req.user.id,
    });
   await newRequest.save()
    res.status(201).json({ message: "Request Created", data:newRequest });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    console.log(err.message);
    
  }
}

// get request
 exports.getMyRequests=async(req, res)=> {
  try {
    const requests = await Service.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });
    // board task
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// single request
 exports.getRequest=async(req, res) =>{
  try {
    const request = await Service.findById(req.params.id).populate(
      "user",
      "email role",
    );
    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }
    if (
      req.user.role !== "admin" &&
      request.user._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Not allowed",
      });
    }
    res.json(request);
  } catch (err) {
    res.status(500).json({
      errors: err.message,});
    console.log(err.message);
    
  }
}

// Update own request

 exports.updateRequest=async(req, res)=> {
  try {
    const request = await Service.findByIdAndUpdate(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    if (req.user.role !== "admin" && request.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }
    request.title = req.body.title || request.title;
    request.description = req.body.description || request.description;
    request.priority = req.body.priority || request.priority;

    await request.save();
    res.json({
      message: "Request Updated",
    });
  } catch (err) {
    res.status(500).json({
      errors: err.message,
    });
  }
}

// Delete Request
 exports.deleteRequest=async(req, res)=> {
  try {
    const request = await Service.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    if (req.user.role !== "admin" && request.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }
    await request.deleteOne();
    res.json({
      message: "Request Deleted",
    });
  } catch (err) {
    res.status(500).json({
      errors: err.message,
    });
  }
}

// ADMIN

// ADMIN - All Request
 exports.getAllRequests=async(req, res)=> {
  try {
    const request = await Service.find()
      .populate("user", "email role")
      .sort({ createdAt: -1 });
      res.json(request);
  } catch (err) {
    res.status(500).json({
      errors: err.message,
    });
  }
}

// ADMIN - Update Status
 exports.updateStatus=async(req, res)=> {
  try {
    const { status } = req.body;
    const request = await Service.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
      },
    );
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.json({
      message: "Status updated",
      request,
    });
  } catch (err) {
    res.status(500).json({
      errors: err.message,
    });
  }
}
