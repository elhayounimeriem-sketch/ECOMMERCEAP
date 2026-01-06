const User = require('../model/UserModel');


async function getAllUser(req, res) {
    try {
        console.log("getAllUser called");
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
        console.log("Users retrieved:", users);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }

}

function getUserById(req, res) {
    console.log("getUserById called");
}

function createUser(req, res) {
    try {
        const newUser = new User(req.body);
        newUser.save()
            .then(user => res.status(201).json({ success: true, data: user }))
            .catch(err => res.status(500).json({ success: false, error: err.message }));
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function updateUser(req, res) {
    console.log("updateUser called");
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ success: false, error: 'Missing user id' });

        // Build update object from body but prevent _id modification
        const update = { ...req.body };
        delete update._id;

        // If password is provided, leave it to backend to hash it.
        // NOTE: in production you should hash the password here (bcrypt).

        const updated = await User.findByIdAndUpdate(id, update, { new: true }).lean();
        if (!updated) return res.status(404).json({ success: false, error: 'User not found' });

        // Do not return password
        if (updated.password) delete updated.password;

        res.status(200).json({ success: true, data: updated });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

function deleteUser(req, res) {
    console.log("deleteUser called");
}

module.exports = {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};

