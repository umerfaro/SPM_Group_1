const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const ContactInfoSchema = new mongoose.Schema({
    email: { type: String, 
        required: true },
    phone: { type: String,
         required: true },
});

const BusinessDetailsSchema = new mongoose.Schema({
    businessName: { type: String },
    businessType: { type: String },
});

const PersonalDetailsSchema = new mongoose.Schema({
    firstName: { type: String, 
        required: true },
    lastName: { type: String, 
        required: true },
    contactInfo: { type: ContactInfoSchema, 
        required: true },
    address: { type: String,
         required: true },
    businessDetails: BusinessDetailsSchema,
});

const PreferencesSchema = new mongoose.Schema({
    notifications: { type: Boolean, 
        default: true },
});

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    username: { type: String, minlength: 3, maxlength: 30, required: true },
    password: { type: String, required: true }, // Hashed password
    roles: {
        type: [String],
        enum: ['Farmer', 'Supplier', 'Buyer', 'Admin', 'GovernmentOfficial'],
        required: true,
    },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    failedLoginAttempts: { type: Number, default: 0 },
    lastLogin: { type: Date },
    personalDetails: { type: PersonalDetailsSchema, required: true },
    preferences: { type: PreferencesSchema },
}, { timestamps: true });


// Hash password before saving user
UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});


// Method to compare passwords
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);