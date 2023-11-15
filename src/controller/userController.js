import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { createToken, decodeToken } from "../config/jwt.js";

const prisma = new PrismaClient()
//            
export const registerUser = async (req, res) => {
    let { email, mat_khau, ho_ten, tuoi } = req.body;

    let checkEmail = await prisma.nguoi_dung.findMany({
        where: {
            email: email,
        }
    })
    if (checkEmail.length > 0) {
        res.status(400).send("Email đã tồn tại")
        return;
    }
    let newPass = bcrypt.hashSync(mat_khau, 10)

    await prisma.nguoi_dung.create({ data: { email, mat_khau: newPass, ho_ten, tuoi } })
    res.status(200).send("Đăng kí thành công")
}

export const userLogin = async (req, res) => {
    let { email, mat_khau } = req.body

    let checkEmail = await prisma.nguoi_dung.findFirst({
        where: {
            email: email
        }
    })
    if (checkEmail) {

        let checkPass = bcrypt.compare(mat_khau, checkEmail.mat_khau)

        if (checkPass) {
            let token = createToken({ checkEmail });
            res.status(200).send({ "message": "Đăng Nhập Thành Công", checkEmail, token })
        } else {
            res.status(400).send("Sai mật khẩu")
        }
    } else {
        res.status(400).send("Email không tồn tại hoặc sai email")
    }

}

//get thong tin user

export const getInfoUser = async (req, res) => {
    let { token } = req.headers
    let infoUser = decodeToken(token)
    let { nguoi_dung_id } = infoUser.data.checkEmail
    console.log(nguoi_dung_id)
    res.status(200).send({ "message": "lấy dữ liệu thành công", "thông tin người dùng": infoUser.data.checkEmail })
}

export const getInfoUserById = async (req, res) => {
    let { id } = req.params
    let data = await prisma.nguoi_dung.findMany({
        where: {
            nguoi_dung_id: Number(id)
        }
    })
    res.send({ "message": "lấy dữ liệu thành công", data })
}

// get danh sách ảnh đã lưu theo user Id

export const getSavePictureByUserId = async (req, res) => {
    let { id } = req.params
    let data = await prisma.luu_anh.findMany({
        where: {
            nguoi_dung_id: Number(id)
        },
        include: {
            hinh_anh: true
        }
    })
    res.status(200).send({ "message": "lấy dữ liệu thành công", data })
}

//get danh sách ảnh đã tạp theo user id

export const getPictureByUserId = async (req, res) => {
    let { id } = req.params
    let data = await prisma.hinh_anh.findMany({
        where: {
            nguoi_dung_id: Number(id)
        },
    })
    res.status(200).send({ "message": "lấy dữ liệu thành công", data })
}

// xóa ảnh tạo theo id ảnh

export const deletePictureByPictureId = async (req, res) => {
    let { id } = req.params

    await prisma.luu_anh.deleteMany({
        where: {
            hinh_id: Number(id)
        }
    })
    await prisma.binh_luan.deleteMany({
        where: {
            hinh_id: Number(id)
        }
    })
    await prisma.hinh_anh.delete({
        where: {
            hinh_id: Number(id)
        }
    })
    res.status(200).send("xóa thành công")
}

// put thông tin người dùng

export const updateUser = async (req, res) => {
    let { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body
    // let { id } = req.params
    let { token } = req.headers;
    let infoUser = decodeToken(token);
    let { nguoi_dung_id } = infoUser.data.checkEmail;

    let checkEmail = await prisma.nguoi_dung.findMany({
        where: {
            email: email
        }
    })
    if (checkEmail.length > 0) {
        res.send("email đã tồn tại")
        return;
    }

    let newPass = bcrypt.hashSync(mat_khau, 10)

    await prisma.nguoi_dung.update({
        where: {
            nguoi_dung_id: nguoi_dung_id
        },
        data: { email: email, mat_khau: newPass, ho_ten: ho_ten, tuoi: tuoi, anh_dai_dien: anh_dai_dien }
    })
    res.status(200).send("cập nhật thành công")

}

export const uploadAvatar = async (req, res) => {

}