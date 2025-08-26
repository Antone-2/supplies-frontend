const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            trim: true,
        },
        firstName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        passwordChangedAt: Date,
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        blocked: {
            type: Boolean,
            default: false,
        },

        wishlist: [{ type: Schema.ObjectId, ref: 'product' }],
        addresses: [{
            city: String,
            street: String,
            phone: String
        }]
    },
    { timestamps: true }
);

userSchema.pre("save", function (next) {
    if (!this.isModified('password')) return next();
    // Only hash if not already hashed (bcrypt hash starts with $2)
    if (!this.password.startsWith('$2')) {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    next();
});

userSchema.pre("findOneAndUpdate", function () {
    if (this._update.password) {
        this._update.password = bcrypt.hashSync(this._update.password, 8);
    }

});

module.exports = mongoose.models.user || model("user", userSchema);