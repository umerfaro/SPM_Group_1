const User = require('../models/User');  // Assuming the model file is in the models directory
const jwt = require('jsonwebtoken');
const userController = {
    // Get all users
    async getAllUsers(req, res, next) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Get user by ID
    async getUserById(req, res, next) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return next({ status: 404, message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },


async loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return next({ status: 401, message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next({ status: 401, message: 'Invalid email or password' });
    }

    // Generate JWT token
    const payload = {
      userId: user._id,
      email: user.email,
      roles: user.roles,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Optionally update last login time
    user.lastLogin = new Date();
    await user.save();
    console.log(payload);
    res.json({ token, user: payload });
  } catch (error) {
    console.error('Login error:', error);  // Log the actual error details
    next({ status: 500, message: 'Internal Server Error', error });
  }
},




    // Create a new user
    async createUser(req, res, next) {
        try {
            // const { userId, email, password, roles, status, personalDetails, preferences } = req.body;
            // const user = new User({
            //     userId,
            //     email,
            //     password,
            //     roles,
            //     status,
            //     personalDetails,
            //     preferences,
            // });
            const { email, password,  status, preferences } = req.body;
            const lastUser = await User.findOne().sort({ userId: -1 }).limit(1);
            let userId = 1; // Default starting ID
    
            // If there's a last user, increment the highest userId to generate the next
            if (lastUser) {
                userId = lastUser.userId + 1;
            }
            const roles ="Admin";
            const personalDetails = {
                firstName: "John",
                lastName: "Doe",
                contactInfo: {
                  email: "john.doe@example.com",
                  phone: "123-456-7890",
                  _id: "6749c5ba099c365b38d0ef8a",
                },
                address : "123 Main St, Anytown, USA",
              };

            const user = new User({
                userId,
                email,
                password,
                roles,
                status,
                personalDetails,
                preferences,
            });
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            console.log(error);
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateUser(req, res, next) {
        try {
            const updates = req.body;  
            const user = await User.findByIdAndUpdate(
                req.params.id,
                updates,
                { new: true, runValidators: true }
            );
            if (!user) {
                return next({ status: 404, message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    // Delete user
    async deleteUser(req, res, next) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return next({ status: 404, message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

   
    async updatePersonalDetails(req, res, next) {
        const { id } = req.params;
        const { firstName, lastName, contactInfo, address, businessDetails } = req.body;

        try {
            const user = await User.findById(id);
            if (!user) {
                return next({ status: 404, message: 'User not found' });
            }
            console.log('body:', req.body);
            console.log('User:', user);
            
            user.personalDetails.firstName = req.body.firstName || user.personalDetails.firstName;
            user.personalDetails.lastName = lastName || user.personalDetails.lastName;
            user.personalDetails.contactInfo = contactInfo || user.personalDetails.contactInfo;
            user.personalDetails.address = address || user.personalDetails.address;
            user.personalDetails.businessDetails = businessDetails || user.personalDetails.businessDetails;

            await user.save();
            res.status(200).json({ message: 'Personal details updated successfully', user });
        } catch (error) {
            console.error(error);
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

     // Update user preferences
     async updatePreferences(req, res, next) {
        try {
            const { notifications } = req.body;
            const user = await User.findById(req.params.id);
            if (!user) {
                return next({ status: 404, message: 'User not found' });
            }
            user.preferences.notifications = notifications;
            await user.save();
            res.json(user);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },
};

module.exports = userController;
