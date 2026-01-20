// Import multer library - a middleware for handling multipart/form-data (file uploads)
import multer from "multer";
// Import path module to work with file and directory paths
import path from "path";

// Configure disk storage for multer
// diskStorage stores files on the server's disk instead of in memory
const storage = multer.diskStorage({
  // destination function determines where uploaded files will be stored
  // req: Express request object
  // file: Object containing file information
  // cb: Callback function to call when done (error, destinationPath)
  destination: function (req, file, cb) {
    // __dirname is the directory of the current module (src/middlewares)
    // path.join combines path segments correctly for the OS
    // "../media" goes up one level from src/middlewares to src, then into media folder
    // This creates the path: src/media (matches the static file serving path)
    const uploadPath = path.join(__dirname, "../media");
    // cb(null, ...) means no error, and uploadPath is the destination folder
    cb(null, uploadPath);
  },
  // filename function determines how uploaded files will be named
  // req: Express request object
  // file: Object containing file information (fieldname, originalname, etc.)
  // cb: Callback function to call when done (error, filename)
  filename: function (req, file, cb) {
    // Generate a unique suffix using current timestamp and random number
    // Date.now() returns milliseconds since epoch (ensures uniqueness based on time)
    // Math.round(Math.random() * 1e9) adds a random 9-digit number for extra uniqueness
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Create filename: original fieldname + unique suffix + original filename
    // file.fieldname is the name attribute from the HTML form input (e.g., "image", "avatar")
    // file.originalname is the original filename from the user's computer
    // This prevents filename conflicts and preserves the original extension
    // Example result: "image-1234567890-987654321-photo.jpg"
    cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
  },
});

// Create and export the multer middleware instance
// storage option tells multer to use our diskStorage configuration
// This middleware can be used in routes to handle file uploads
// Usage: upload.single("fieldname") for single file, upload.array("fieldname") for multiple
export const upload = multer({ storage });
