const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const sendEmail = require('../utils/sendEmail');

exports.contactLanding = asyncErrorHandler(async (req, res, next) => {

    try {
        const user  = req.body.email;
        const data  = req.body.message;
        const subject  = req.body.subject;
        console.log(user);
        console.log(data);
        await sendEmail(  user, subject, data);
        
        res.status(200).json({
            success: true,
            message: `Email sent to ${req.body.email} successfully`,
        });

    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});