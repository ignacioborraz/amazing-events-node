const User = require('../models/User')

function serverError(err, res) {
    console.error(err)
    return res.status(500).end()
}

const userController = {
    /**
     * Get all users
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    all: async (req, res) => {
        try {
            let users = await User.find()

            return res.json({
                message: "you get users",
                response: users,
                success: true
            })
        } catch (error) {
            serverError(error, res)
        }
    },

    /**
     * Update one user by the given id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    update: async (req, res) => {
        const {
            id
        } = req.params

        try {
            let {matchedCount} = await User.updateOne(
                {_id: id},
                {...req.body},
                {new: true}
            )

            if (matchedCount > 0) {
                return res.status(404).json({
                    message: "couldn't find user",
                    success: false
                })
            }

            return res.status(200).json({
                message: "user updated",
                success: true
            })
        } catch (error) {
            serverError(error, res)
        }
    },

    /**
     * Delete one user by the given id
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    destroy: async
        (req, res) => {
        const {
            id
        } = req.params

        try {
            let {deletedCount} = await User.deleteOne({
                _id: id
            })

            if (deletedCount > 0) {
                return res.status(200).json({
                    message: "user deleted",
                    success: true
                })
            }

            return res.status(404).json({
                message: "couldn't find user",
                success: false
            })
        } catch (error) {
            serverError(error, res)
        }
    }
}

module.exports = userController
