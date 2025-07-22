import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, username, email, password } = req.body;

    // Ensure all required fields are provided
    if ([fullname, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists
    const existedUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existedUser) {
        throw new ApiError(400, "User already exists with this username or email");
    }

    // Handle avatar and cover image
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
    if (!avatarLocalPath || !coverImageLocalPath) {
        throw new ApiError(400, "Avatar and cover image are required");
    }

    // Upload images to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    // Create user data and store in the database
    const user = await User.create({
        fullname,
        avatar: avatar?.url || "",  // Store URL after successful upload
        coverImage: coverImage?.url || "", // Store URL after successful upload
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password,  // Ensure password is hashed in the model's pre-save hook
        watchHistory: [],
        refreshToken: "",
    });

    // Fetch the created user without password and refreshToken
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    // If user creation failed
    if (!createdUser) {
        throw new ApiError(500, "User registration failed");
    }

    // Return successful response
    return res.status(201).json(new ApiResponse(200, createdUser, "User created successfully"));
});

export { registerUser };
