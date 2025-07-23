import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = async (req, res) => {
    const { fullname, username, email, password } = req.body;
    const { avatar, coverImage } = req.files;

    if ([fullname, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existedUser) {
        throw new ApiError(400, "User already exists with this username or email");
    }

    const avatarLocalPath = avatar?.[0]?.path;
    const coverImageLocalPath = coverImage?.[0]?.path;
    if (!avatarLocalPath || !coverImageLocalPath) {
        throw new ApiError(400, "Avatar and cover image are required");
    }

    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILES:", req.files);

    if (!password || typeof password !== "string") {
        throw new ApiError(400, "Password is missing or invalid");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Construct local URLs for avatar and coverImage by removing 'public' prefix
        const avatarUrl = avatarLocalPath.replace(/^public/, '');
        const coverImageUrl = coverImageLocalPath.replace(/^public/, '');

        const user = await User.create({
            fullname,
            avatar: avatarUrl || "",
            coverImage: coverImageUrl || "",
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword,
            watchHistory: [],
            refreshToken: "",
        });

        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        if (!createdUser) {
            throw new ApiError(500, "User registration failed");
        }

        return res.status(201).json(new ApiResponse(200, createdUser, "User created successfully"));
    } catch (error) {
        throw new ApiError(500, "Error saving user with local image URLs");
    }
};

export { registerUser };

