let widget;
const createWidget = cloudinary => {
  widget = cloudinary.createUploadWidget(
    {
      cloudName: process.env.CLOUDINARY_NAME,
      uploadPreset: "members"
    },
    (err, result) => {
      if (!err && result && result.event === "success") {
      }
    }
  );
};

export { createWidget, widget };
