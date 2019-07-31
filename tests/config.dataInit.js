const mongoose = require('mongoose');
const Config = require('../database/Config.model');

const initConfig = {
    _id: new mongoose.Types.ObjectId(),
    "values": [
        {
            "title": "GIỚI THIỆU DỊCH VỤ Khoai TV",
            "paragraphs": [
                "Khoai TV (Khoai TV, hoặc chúng tôi,) cung cấp dịch vụ xem video online, bao gồm những chương trình chọn lọc với nhiều thể loại TV Show, phim, giáo dục, âm nhạc, clip ngắn và những nội dung khác (gọi chung là Nội dung). Dịch vụ video của chúng tôi, nội dung, hệ thống streaming, Video Player và những tính năng, công cụ, ứng dụng khác hoặc những dịch vụ đi kèm phát sinh trong quá trình phát triển và nâng cấp dịch vụ trong tương lai gọi chung là Dịch vụ Khoai TV",
                "Nội dung được cho phép xem thông qua các phương thức sau: (Gọi chung là Phương thức)"
            ]
        },
        {
            "title": "CHẤP NHẬN ĐIỀU KHOẢN SỬ DỤNG VÀ SỬA ĐỔI",
            "paragraphs": [
                "Chúng tôi hân hạnh mang đến Dịch vụ Khoai TV phục vụ nhu cầu giải trí, thưởng thức cá nhân của bạn phù hợp với Điều Khoản Sử Dụng này. Để truy cập và thưởng thức Dịch vụ Khoai TV, bạn phải đồng ý và tuân theo các điều khoản và điều kiện được quy định tại Điều Khoản Sử Dụng. Việc bạn lướt web, truy cập hoặc sử dụng bất kì Dịch Vụ Khoai TV nào (bao gồm việc tiếp cận Nội dung từ các website liên kết, ứng dụng của Khoai TV) phải tuân theo các điều khoản và điều kiện sau đây và bất kì điều khoản, điều kiện hoặc hướng dẫn nào khác được quy định tại trang Web này, cũng như tất cả các luật, quy tắc và quy định hiện hành, bao gồm nhưng không giới hạn trong những luật về thương hiệu, bản quyền, quyền riêng tư. BẰNG VIỆC SỬ DỤNG DỊCH VỤ Khoai TV, BẠN CHẤP NHẬN VÀ ĐỒNG Ý BỊ RÀNG BUỘC BỞI CÁC ĐIỀU KHOẢN VÀ TẤT CẢ CÁC LUẬT HIỆN HÀNH. Do đó, chúng tôi yêu cầu bạn đọc kỹ các điều khoản được quy định ở đây. Nếu bạn không đồng ý và không muốn bị ràng buộc bởi các điều khoản này, bạn không nên sử dụng dịch vụ của chúng tôi. Nếu bạn có bất kì câu hỏi hoặc phản ánh nào về Điều Khoản Sử Dụng, vui lòng liên hệ với chúng tôi theo địa chỉ contact@Khoaitv.comcom",
                "Chúng tôi bảo lưu quyền cải tiến, thay đổi, tạm ngưng hoặc tạm thời ngưng toàn bộ hoặc bất kì phần nào của Dịch vụ Khoai TV hoặc hạn chế truy cập vào dịch vụ. Bằng việc sử dụng Dịch vụ Khoai TV, quý khách đồng ý trước rằng mỗi lần sử dụng sẽ tuân thủ theo các điều khoản và điều kiện áp dụng sau đó.",
                "Chúng tôi có thể bổ sung, sửa đổi Điều khoản sử dụng vào bất cứ lúc nào bằng cách cập nhật sự thay đổi Điều Khoản Sử Dụng ở bên dưới trang Web và thông báo cho các bạn về sự thay đổi đó."
            ]
        }
    ],
    "key": "ĐIỀU KHOẢN SỬ DỤNG"
}

const setupDatabase = async () => {
    await Config.deleteMany({});
    await new Config(initConfig).save();
}

module.exports = {
    setupDatabase,
    initConfig
}