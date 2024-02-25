const user = require('../models/user');



async function createUser(req, res, next) {
    try {

        let { fName, lName, email, password, userPanCard, userAdharCard } = req.body;
        console.log(req.body);

        let userfind = await user.findOne({ email: email });
        if (userfind) {
            res.status(403).json({ message: "user already exits" })
        }

        await user.create({
            fName,
            lName,
            email,
            password,
            userAdharCard,
            userPanCard
        });

        res.status(200).json({ message: "user create successfuly :)" })

    }
    catch (error) {
        res.status(500).json({ error });
    }
}


async function uploadDocuments(req, res, next) {
    try {
        const userId = req.body;
        console.log(userId)
        // Check if userId exists
        if (!userId) {
            return res.status(404).json({ error: 'userId is not found' });
        }

        // Save uploaded file paths to MongoDB
        const newUser = await user.updateOne({
            userPanCard: req.files['userPanCard'][0].path,
            userAdharCard: req.files['userAdharCard'][0].path,
        });
        console.log(newUser);

        res.status(200).json({ message: 'Files uploaded successfully', userId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    createUser, uploadDocuments
}