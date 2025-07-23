import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String,
            required: true,
            validate: {
                validator: (v) => /\.(mp4|mov|avi|mkv)$/i.test(v),
                message: "Invalid video file format. Allowed formats are: mp4, mov, avi, mkv.",
            },
        },
        thumbnail: {
            type: String,
            required: true,
            validate: {
                validator: (v) => /\.(jpg|jpeg|png)$/i.test(v),
                message: "Invalid image file format. Allowed formats are: jpg, jpeg, png.",
            },
        },
        title: {
            type: String,
            required: true,
            index: true,  // Index for faster title searches
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        views: {
            type: Number,
            default: 0,  // Default to 0 views when video is created
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,  // Ensure every video has an owner
        },
        isDeleted: {
            type: Boolean,
            default: false,  // For soft deletes (optional)
        },
    },
    {
        timestamps: true,
    }
);

// Plugin for aggregate pagination
videoSchema.plugin(mongooseAggregatePaginate);

// Static method to increment views (for example, after the video is played)
videoSchema.methods.incrementViews = async function () {
    this.views += 1;
    await this.save();
};

export const Video = mongoose.model('Video', videoSchema);
