const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../server');
const secret = require('../config/jwtSecret');
const Config = require('../database/Config.model');

const { initConfig, setupDatabase } = require('./config.dataInit');
const { validAdminUser, validNormalUser } = require('./users.dataInit');

const testURL = '/api/configs';
const adminToken = jwt.sign({ id: validAdminUser._id, accType: 0, platform: 'web' }, secret);
const normalToken = jwt.sign({ id: validNormalUser._id, accType: 2, platform: 'web' }, secret);

beforeEach(setupDatabase);

test('Get all config', async () => {
    const response = await request(app).get(testURL)
        .send()
        .expect(200);

    expect(response.body.error.isError).toBeFalsy();
});

test('Add a valid config', async () => {
    const response = await request(app).post(testURL)
        .set('access-token', adminToken)
        .send({
            "values": [
                {
                    "title": "Phan 1",
                    "paragraphs": [
                        "Doan van 1",
                        "Doan van 2"
                    ]
                },
                {
                    "title": "Phan 2",
                    "paragraphs": [
                        "Doan van 1",
                        "Doan van 2"
                    ]
                },
                {
                    "title": "Phan 3",
                    "paragraphs": [
                        "Doan van 1",
                        "Doan van 2"
                    ]
                }
            ],
            "key": "Chinh sach"
        })
        .expect(201);
    expect(response.body.error.isError).toBeFalsy();
    const newConfig = await Config.findOne({ key: 'Chinh sach' });
    expect(newConfig).toBeTruthy();
});

test('Prevent adding a config using false token', async () => {
    const response = await request(app).post(testURL)
        .set('access-token', normalToken)
        .send({
            "values": [
                {
                    "title": "Phan 1",
                    "paragraphs": [
                        "Doan van 1",
                        "Doan van 2"
                    ]
                },
                {
                    "title": "Phan 2",
                    "paragraphs": [
                        "Doan van 1",
                        "Doan van 2"
                    ]
                },
                {
                    "title": "Phan 3",
                    "paragraphs": [
                        "Doan van 1",
                        "Doan van 2"
                    ]
                }
            ],
            "key": "Chinh sach"
        })
        .expect(403);
    expect(response.body.error.isError).toBeTruthy();
    expect(response.body.error).toMatchObject({ isError: true, errorMessage: { authorization: 'Admin only' } });
});

test('Prevent adding a cofig with invalid data', async () => {
    const response = await request(app).post(testURL)
        .set('access-token', adminToken)
        .send({})
        .expect(400);
    expect(response.body.error.isError).toBeTruthy();
});

test('Update a valid config', async () => {
    const response = await request(app).patch(testURL)
        .query({ id: initConfig._id.toHexString() })
        .set('access-token', adminToken)
        .send({
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
        })
        .expect(200);
    expect(response.body.error.isError).toBeFalsy();
    const newConfig = await Config.findById(initConfig._id);
    expect(newConfig.values[1].title).toBe('CHẤP NHẬN ĐIỀU KHOẢN SỬ DỤNG VÀ SỬA ĐỔI');
});

test('Prevent adding with a false token', async () => {
    const response = await request(app).patch(testURL)
        .query({ id: initConfig._id.toHexString() })
        .set('access-token', normalToken)
        .send({
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
        })
        .expect(403);
    expect(response.body.error.isError).toBeTruthy();
    expect(response.body.error).toMatchObject({ isError: true, errorMessage: { authorization: 'Admin only' } });

});

test('Prevent updating a config with invalid id', async () => {
    const response = await request(app).patch(testURL)
        .query({ id: '123123132' })
        .set('access-token', adminToken)
        .send({
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
        })
        .expect(500);
    expect(response.body.error.isError).toBeTruthy();
});

test('Prevent updating a config with invalid data', async () => {
    const response = await request(app).patch(testURL)
        .query({ id: initConfig._id.toHexString() })
        .set('access-token', adminToken)
        .send()
        .expect(400);
    expect(response.body.error.isError).toBeTruthy();
});

test('Get config with valid key', async () => {
    const response = await request(app).get(testURL + '/search')
        .query({ key: "ĐIỀU KHOẢN SỬ DỤNG" })
        .send()
        .expect(200);
    expect(response.body.error.isError).toBeFalsy();
});

test('Prevent getting config with invalid key', async () => {
    const response = await request(app).get(testURL + '/search')
        .query({ key: 'Invalid key' })
        .send()
        .expect(404);
    expect(response.body.error.isError).toBeTruthy();
});

test('Delete a valid config', async () => {
    const response = await request(app).delete(testURL)
        .query({ id: initConfig._id.toHexString() })
        .set('access-token', adminToken)
        .send()
        .expect(200);
    expect(response.body.error.isError).toBeFalsy();
    const exist = await Config.findById(initConfig._id);
    expect(exist).toBeFalsy();
});

test('Prevent deleting a config with invalid id', async () => {
    const response = await request(app).delete(testURL)
        .query({ id: '123123123' })
        .set('access-token', adminToken)
        .send()
        .expect(500);

    expect(response.body.error.isError).toBeTruthy();
});

test('Prevent deleting a config with false token', async () => {
    const response = await request(app).delete(testURL)
        .set('access-token', normalToken)
        .query({ id: initConfig._id })
        .expect(403);

    expect(response.body.error.isError).toBeTruthy();
})