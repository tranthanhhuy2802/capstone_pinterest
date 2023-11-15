// yarn add jsonwebtoken
import jwt from 'jsonwebtoken';

// mã hóa data
export const createToken = (data) => {
    // tạo ra token
    let token = jwt.sign({ data }, "BIMAT", { algorithm: "HS256", expiresIn: "5y" }) // HS256, ES256

    return token;
}

// kiểm tra token
export const checkToken = (token) => {
    return jwt.verify(token, "BIMAT");
}

// giải mã token
export const decodeToken = (token) => {
    return jwt.decode(token, "BIMAT");
}

export const checkApi = (req, res, next) => {
    try {
        let { token } = req.headers;
        console.log(req.query)
        checkToken(token)
        next()
    } catch (exception) {

        res.status(401).send("Không có quyền")
    }

}
