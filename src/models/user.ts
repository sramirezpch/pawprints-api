import { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
    fullName: string;
    email: string;
    password?: string;
}

interface UserDocument extends IUser, Document {
    verifyPassword(enteredPassword: string): Promise<boolean>;
};

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        validate: { 
            validator: function(value: string){
                return value.trim().length > 0;
            },
            message: "Name can't be null"
        }
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    }
})

userSchema.methods.verifyPassword = function (enteredPassword: string) {
    return bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;

            next();
        })
    })
})
export const User = model<UserDocument>('User', userSchema);