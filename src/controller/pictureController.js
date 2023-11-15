import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

//get danh sách ảnh 

export const getAllPicture = async (req, res) => {

    let listPicture = await prisma.hinh_anh.findMany();
    res.status(200).send({ "message": "Lấy danh sách ảnh thành công", listPicture })
}

// get tìm kiếm ảnh theo tên

export const getPictureByName = async (req, res) => {
    let { name } = req.params
    let listPictureByName = await prisma.hinh_anh.findMany({
        where: {
            ten_hinh: {
                contains: name
            }
        }
    })
    res.status(200).send({ "message": "lấy dữ liệu thành công", listPictureByName })
}

//get thông tin ảnh và người tạo ảnh bằng id ảnh

export const getInfoPictureAndUserByPictureId = async (req, res) => {
    let { id } = req.params
    let infoPicture = await prisma.hinh_anh.findMany({
        where: {
            hinh_id: Number(id)
        }, include: {
            nguoi_dung: true

        }
    })
    res.status(200).send({
        "message": "lấy dữ liệu thành công",
        infoPicture
    })
}

// get thông tin bình luận theo id ảnh

export const getCmtByPictureId = async (req, res) => {
    let { id } = req.params

    let listCmt = await prisma.binh_luan.findMany({
        where: {
            hinh_id: Number(id)
        }
    })
    res.status(200).send({
        "message": "lấy dữ liệu thành công",
        listCmt
    })
}

// get thông tin đã lưu hình này chưa theo id ảnh(để kiểm tra ảnh đã lưu hay chưa)

export const getCheckSavePicture = async (req, res) => {
    let { id } = req.params

    let checkSave = await prisma.luu_anh.findMany({
        where: {
            hinh_id: Number(id)
        }
    })

    if (checkSave.length > 0) {
        res.send("hình đã lưu")
    } else {
        res.send("hình chưa lưu")
    }
}

// post để lưu thông tin bình luận người dùng với ảnh 

export const postCmt = async (req, res) => {
    let { nguoi_dung_id, hinh_id, noi_dung } = req.body
    let checkUser = await prisma.nguoi_dung.findMany({
        where: {
            nguoi_dung_id: nguoi_dung_id
        }
    })
    let checkPicture = await prisma.hinh_anh.findMany({
        where: {
            hinh_id: hinh_id
        }
    })
    if (checkUser.length == 0) {
        res.status(400).send("không tìm thấy Người dùng")
        return;
    }
    if (checkPicture.length == 0) {
        res.status(400).send("không tìm thấy ảnh")
        return;

    }
    await prisma.binh_luan.create({
        data: { nguoi_dung_id: nguoi_dung_id, hinh_id: hinh_id, ngay_binh_luan: new Date(), noi_dung: noi_dung }
    })
    res.status(200).send("đã thêm bình luận")
}