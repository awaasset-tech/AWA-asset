// controllers/documentController.js - UPDATED
const cloudinary = require('../config/cloudinary');
const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit (reduced from 5MB)
  },
  fileFilter: (req, file, cb) => {
    // Only JPG, PNG, PDF - removed WebP
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, and PDF files are allowed.'));
    }
  }
}).single('file');

// Upload document to Cloudinary
const uploadDocument = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      // Multer errors (file size, file type)
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          error: 'File too large. Maximum size is 2MB.'
        });
      }
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }
    
    try {
      const { documentType } = req.body;
      
      if (!documentType) {
        return res.status(400).json({
          success: false,
          error: 'Document type is required'
        });
      }

      // Valid document types
      const validDocTypes = ['panCard', 'aadharCard', 'cancelledCheque', 'nomineeAadhar', 'nomineePan'];
      if (!validDocTypes.includes(documentType)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid document type'
        });
      }
      
      // Upload to Cloudinary (overwrites if same public_id)
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: `awa-partners/${documentType}`,
            resource_type: 'auto',
            // Use original filename for easier identification
            use_filename: true,
            unique_filename: true
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        
        uploadStream.end(req.file.buffer);
      });
      
      res.json({
        success: true,
        message: 'Document uploaded successfully',
        data: {
          url: result.secure_url,
          publicId: result.public_id,
          format: result.format,
          size: result.bytes,
          fileName: req.file.originalname
        }
      });
      
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to upload document. Please try again.'
      });
    }
  });
};

module.exports = {
  uploadDocument
};
