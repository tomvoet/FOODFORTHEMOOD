import jwt from "jsonwebtoken"

const TOKEN_SECRET = "testhilfeichwillkeinscretschreibenwassolldas"
const TOKEN_SECRET_REFRESH =
    "testhilfeichwillkeinscretschreibenwassolldasrefresh"
const RESET_SECRET = "testhilfeichwillkeinscretschreibenwassolldascooler"

//check whether admin
/*
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    //send 401 if user does not have token
    if (token == null) return res.sendStatus(401)
    //verify users jwt
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) console.log(err)
        if (err) return res.sendStatus(403)
        //check whether admin == true for database manipulation
        if (req.path.includes("edit/") && !user.data.admin)
            return res.sendStatus(403)
        req.user = user.data
        next()
    })
}
*/

export const generateAccessToken = (username: string) => {
    return jwt.sign({ data: { username } }, TOKEN_SECRET, { expiresIn: "1h" })
}

//to be implemented, to prevent having to log in every hour
export const generateRefreshToken = (username: string) => {
    return jwt.sign({ data: { username } }, TOKEN_SECRET_REFRESH, {
        expiresIn: "1d",
    })
}

export const generateResetToken = (email: string) => {
    return jwt.sign({ data: { email } }, RESET_SECRET, { expiresIn: "15m" })
}
