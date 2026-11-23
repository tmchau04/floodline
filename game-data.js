// ================= CẤU HÌNH FIREBASE CỦA BẠN =================
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBL-PJ4_7o0BUK-g_cK90RO6WnmKxKQUt8",
  authDomain: "floodline-4ca1b.firebaseapp.com",
  databaseURL: "https://floodline-4ca1b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "floodline-4ca1b",
  storageBucket: "floodline-4ca1b.firebasestorage.app",
  messagingSenderId: "484763434016",
  appId: "1:484763434016:web:6c5475a4b9a39b5ab8d045",
  measurementId: "G-RVEV9YW42S"
};

firebase.initializeApp(FIREBASE_CONFIG);
const DB = firebase.database();

// ================= DỮ LIỆU 25 THẺ VAI HỘ GIA ĐÌNH =================
const PROFILES = [
  // NHÓM 1: BÌNH THƯỜNG (14 hộ)
  {id:'H03',group:'normal',groupLabel:'Bình thường',title:'Hộ 3 · Mẹ đơn thân nuôi con',membersText:'2 người (Mẹ & bé 13 tuổi)',members:2,baseFood:0,baseWater:1,reqFood:2,reqWater:2,
   circumstance:'Hai mẹ con sống trong căn nhà cấp 4 nhỏ ven đường, thu nhập vừa đủ đắp đổi qua ngày.',
   needText:'Không có nhu cầu y tế đặc thù, nhưng thiếu dự trữ lương thực sẵn tại nhà.',
   script:'Một mình bạn xoay xở quán ăn nhỏ ven đường để nuôi con gái đang học lớp 8. Bữa cơm thường ngày vừa đủ đắp đổi nên trong nhà chẳng bao giờ tích trữ sẵn đồ ăn. Nghe tin bão về, hai mẹ con chỉ biết trông chờ vào chiếc ba lô chuẩn bị lúc này.'},
  {id:'H04',group:'normal',groupLabel:'Bình thường',title:'Hộ 4 · Vợ chồng trẻ mới cưới',membersText:'2 người lớn',members:2,baseFood:1,baseWater:1,reqFood:2,reqWater:2,
   circumstance:'Hai vợ chồng mới ra ở riêng chưa đầy nửa năm, trẻ khỏe, nhanh nhẹn.',
   needText:'Không có nhu cầu riêng. Nếu chuẩn bị dư dả có thể hỗ trợ hàng xóm.',
   script:'Hai vợ chồng bạn vừa dọn về căn nhà nhỏ ở Hội An chưa đầy nửa năm. Cả hai đều trẻ khỏe, nhanh nhẹn nhưng chưa từng trải qua một trận lũ lớn nào ở miền Trung. Nếu chuẩn bị dư dả, nhà bạn sẽ là điểm tựa rất tốt cho hàng xóm xung quanh.'},
  {id:'H06',group:'normal',groupLabel:'Bình thường',title:'Hộ 6 · Người lao động xa quê',membersText:'1 người lớn',members:1,baseFood:0,baseWater:1,reqFood:2,reqWater:2,
   circumstance:'Thuê phòng trọ nhỏ cuối hẻm sống một mình, họ hàng đều ở tận quê xa.',
   needText:'Không có nhu cầu y tế riêng. Dễ bị cô lập nếu không giữ kết nối với xóm giềng.',
   script:'Bạn từ quê lên Hội An làm phụ bếp, thuê một phòng trọ nhỏ cuối hẻm, họ hàng đều ở xa. Không có người thân bên cạnh, lúc mưa gió mất điện, sự hỏi thăm qua lại với hàng xóm chính là điểm tựa duy nhất của bạn.'},
  {id:'H07',group:'normal',groupLabel:'Bình thường',title:'Hộ 7 · Gia đình có ông nội khỏe mạnh',membersText:'4 người (2 lớn, 1 cụ khỏe, 1 bé 8t)',members:4,baseFood:2,baseWater:1,reqFood:4,reqWater:4,
   circumstance:'Ông nội tuy ngoài 70 nhưng vốn là dân chài, sức khỏe dẻo dai và rất có kinh nghiệm nhìn con nước.',
   needText:'Không có nhu cầu y tế riêng (người cao tuổi khỏe mạnh).',
   script:'Dù đã ngoài 70 nhưng ông nội vốn là dân chài vùng sông nước, sức khỏe dẻo dai và nhìn con nước rất chuẩn. Cả nhà quây quần nghe ông dặn dò cách chằng chống cửa nẻo, tinh thần rất vững vàng.'},
  {id:'H08',group:'normal',groupLabel:'Bình thường',title:'Hộ 8 · Ba anh chị em thuê nhà',membersText:'3 người lớn',members:3,baseFood:1,baseWater:2,reqFood:3,reqWater:3,
   circumstance:'Ba anh chị em ruột cùng thuê chung căn nhà để tiện đi làm, ban ngày đều bận rộn.',
   needText:'Không có nhu cầu riêng. Nhân lực trẻ, dễ phối hợp hỗ trợ cộng đồng.',
   script:'Ba anh chị em ruột cùng thuê chung một căn nhà để tiện đi làm. Cả ba đều là thanh niên khỏe mạnh, tháo vát, chỉ có điều ban ngày ai cũng đi làm tối mịt mới về nên tủ bếp hầu như trống trơn.'},
  {id:'H09',group:'normal',groupLabel:'Bình thường',title:'Hộ 9 · Gia đình có con tuổi teen',membersText:'3 người (2 lớn, 1 bạn 15 tuổi)',members:3,baseFood:1,baseWater:1,reqFood:3,reqWater:3,
   circumstance:'Con trai 15 tuổi đã lớn, có thể phụ cha mẹ kê cao đồ đạc và theo dõi tin tức.',
   needText:'Không có nhu cầu y tế đặc thù.',
   script:'Cậu con trai 15 tuổi nhà bạn đã cao lớn, biết phụ cha mẹ khuân đồ đạc lên gác và theo dõi bản tin thời tiết. Cả nhà phối hợp với nhau khá nhịp nhàng trước giờ bão đổ bộ.'},
  {id:'H10',group:'normal',groupLabel:'Bình thường',title:'Hộ 10 · Người cha đơn thân',membersText:'3 người (Cha & 2 bé 6, 10 tuổi)',members:3,baseFood:1,baseWater:0,reqFood:3,reqWater:3,
   circumstance:'Một mình người cha vừa đi làm vừa chăm hai con nhỏ, bồn nước chưa kịp bơm đầy.',
   needText:'Không có nhu cầu y tế riêng, nhưng đang thiếu nước sạch dự trữ.',
   script:'Sau ly hôn, một mình bạn vừa chạy xe giao hàng vừa lo từng bữa ăn giấc ngủ cho hai đứa nhỏ. Mưa dông kéo đến bất ngờ đúng lúc bồn nước sinh hoạt ở nhà chưa kịp bơm đầy.'},
  {id:'H12',group:'normal',groupLabel:'Bình thường',title:'Hộ 12 · Bốn anh chị em trưởng thành',membersText:'4 người lớn',members:4,baseFood:2,baseWater:2,reqFood:4,reqWater:4,
   circumstance:'Bốn anh chị em cùng sống chung nhà tổ, đều đã đi làm nên có sẵn một ít dự trữ.',
   needText:'Không có nhu cầu riêng. Nguồn lực khá ổn định.',
   script:'Bốn anh chị em cùng sống chung trong căn nhà cũ của gia đình. Nhờ đông người lớn cùng đi làm nên trong nhà luôn có sẵn một ít gạo, mì và nước uống dự phòng.'},
  {id:'H14',group:'normal',groupLabel:'Bình thường',title:'Hộ 14 · Gia đình có con đã đi làm',membersText:'3 người (2 lớn, 1 con 22 tuổi)',members:3,baseFood:2,baseWater:1,reqFood:3,reqWater:3,
   circumstance:'Con gái 22 tuổi nhanh nhạy tin tức, luôn nhắc cha mẹ cảnh giác tin đồn.',
   needText:'Không có nhu cầu y tế đặc thù.',
   script:'Cô con gái 22 tuổi đã đi làm, rất rành tin tức và luôn dặn cha mẹ phải kiểm chứng kỹ thông tin trước khi tin lời đồn trên mạng. Gia đình bạn giữ được sự bình tĩnh cần thiết.'},
  {id:'H15',group:'normal',groupLabel:'Bình thường',title:'Hộ 15 · Cặp vợ chồng son',membersText:'2 người lớn',members:2,baseFood:1,baseWater:1,reqFood:2,reqWater:2,
   circumstance:'Nhà cửa gọn nhẹ, hai vợ chồng trẻ khỏe, sẵn sàng chạy qua lại giúp hàng xóm.',
   needText:'Không có nhu cầu y tế đặc thù.',
   script:'Hai vợ chồng trẻ sống gọn nhẹ trong căn nhà cấp 4. Tuy chưa có nhiều kinh nghiệm chống bão nhưng cả hai đều khỏe khoắn, sẵn sàng chạy qua chạy lại phụ giúp các nhà neo người.'},
  {id:'H16',group:'normal',groupLabel:'Bình thường',title:'Hộ 16 · Mẹ và con sinh viên',membersText:'2 người (Mẹ & con 19 tuổi)',members:2,baseFood:1,baseWater:1,reqFood:2,reqWater:2,
   circumstance:'Hai mẹ con sống nương tựa nhau, con trai học đại học gần nhà rất năng nổ.',
   needText:'Không có nhu cầu y tế đặc thù.',
   script:'Hai mẹ con sống nương tựa nhau, cậu con trai 19 tuổi đang học đại học gần nhà nên rất năng nổ, nhiệt tình. Hai mẹ con luôn giữ thói quen lắng nghe thông báo chính thức từ phường.'},
  {id:'H19',group:'normal',groupLabel:'Bình thường',title:'Hộ 19 · Gia đình có hai con trung học',membersText:'4 người (2 lớn, 2 con 13 & 16t)',members:4,baseFood:2,baseWater:1,reqFood:4,reqWater:4,
   circumstance:'Hai con đã học cấp 2 và cấp 3, biết tự lo và phụ cha mẹ kê cao đồ đạc.',
   needText:'Không có nhu cầu y tế đặc thù.',
   script:'Hai đứa nhỏ đều đã học cấp 2, cấp 3 nên biết tự lo cho bản thân và phụ cha mẹ kê cao bàn ghế, sách vở. Cả nhà chia việc cho nhau rất ăn ý.'},
  {id:'H20',group:'normal',groupLabel:'Bình thường',title:'Hộ 20 · Bạn trẻ mới chuyển đến Hội An',membersText:'1 người lớn',members:1,baseFood:1,baseWater:0,reqFood:2,reqWater:2,
   circumstance:'Mới chuyển đến Hội An làm việc vài tháng, chưa từng trải qua lũ miền Trung.',
   needText:'Không có nhu cầu y tế riêng, cần nghe ngóng kinh nghiệm từ hàng xóm.',
   script:'Bạn mới chuyển đến Hội An làm việc được vài tháng, đường ngang ngõ tắt còn chưa thuộc hết. Lần đầu nghe cảnh báo lũ lớn, bạn không khỏi hồi hộp và cần nghe ngóng kinh nghiệm từ dân bản địa.'},
  {id:'H22',group:'normal',groupLabel:'Bình thường',title:'Hộ 22 · Gia đình đông nhân khẩu',membersText:'5 người lớn',members:5,baseFood:2,baseWater:2,reqFood:5,reqWater:5,
   circumstance:'Đông nhân khẩu nhất khu phố nên tiêu thụ nhiều, bù lại có nhân lực hùng hậu.',
   needText:'Mức duy trì cao (5 Ăn · 5 Nước), có sức khỏe để hỗ trợ cộng đồng.',
   script:'Năm người lớn cùng sinh hoạt dưới một mái nhà nên lượng thức ăn và nước uống tiêu thụ mỗi ngày rất lớn. Bù lại, nhà bạn có nhân lực hùng hậu nhất xóm để hỗ trợ cộng đồng.'},

  // NHÓM 2: CÓ EM BÉ (4 hộ)
  {id:'H01',group:'baby',groupLabel:'Có em bé',title:'Hộ 1 · Gia đình trẻ có bé 5 tháng',membersText:'3 người (2 lớn, 1 bé 5 tháng)',members:3,baseFood:1,baseWater:1,reqFood:3,reqWater:3,
   circumstance:'Gia đình trẻ mới đón bé Bắp tròn 5 tháng tuổi, hộp sữa và bịch tã ở nhà sắp cạn.',
   needText:'BẮT BUỘC: Tã em bé & Sữa công thức (từ ba lô Part I hoặc xin hàng xóm ở Part III).',
   script:'Vợ chồng bạn vừa đón bé Bắp tròn 5 tháng tuổi. Mưa bão ập đến đúng lúc hộp sữa công thức và bịch tã ở nhà chỉ còn dùng được vài bữa nữa. Mọi ưu tiên lúc này đều dành cho hơi ấm và bữa sữa của con.'},
  {id:'H11',group:'baby',groupLabel:'Có em bé',title:'Hộ 11 · Gia đình có bé mẫu giáo & bé sơ sinh',membersText:'4 người (2 lớn, 1 bé 5t, 1 bé 10 tháng)',members:4,baseFood:1,baseWater:1,reqFood:4,reqWater:4,
   circumstance:'Nhà có hai con nhỏ, đặc biệt bé út mới 10 tháng tuổi còn bú bình và đóng tã cả ngày.',
   needText:'BẮT BUỘC: Tã em bé & Sữa công thức (từ ba lô Part I hoặc xin hàng xóm ở Part III).',
   script:'Nhà có hai con nhỏ sàn sàn nhau, đặc biệt bé út mới 10 tháng tuổi còn bú bình và đóng tã cả ngày. Chỉ cần thiếu sữa hay tã ướt lạnh trong đêm lũ là bé sẽ quấy khóc và ốm ngay.'},
  {id:'H17',group:'baby',groupLabel:'Có em bé',title:'Hộ 17 · Vợ chồng trẻ đón con đầu lòng',membersText:'3 người (2 lớn, 1 bé 4 tháng)',members:3,baseFood:1,baseWater:1,reqFood:3,reqWater:3,
   circumstance:'Lần đầu làm cha mẹ với em bé mới 4 tháng tuổi, không tránh khỏi lúng túng khi nghe tin bão.',
   needText:'BẮT BUỘC: Tã em bé & Sữa công thức (từ ba lô Part I hoặc xin hàng xóm ở Part III).',
   script:'Lần đầu làm cha mẹ với em bé mới 4 tháng tuổi, vợ chồng bạn không giấu được sự lúng túng khi nghe tin bão lớn. Giữa lúc vội vàng thu dọn, đừng quên nhặt đủ sữa và tã cho con.'},
  {id:'H24',group:'baby',groupLabel:'Có em bé',title:'Hộ 24 · Gia đình có bé 1 tuổi & bé 7 tuổi',membersText:'4 người (2 lớn, 1 bé 7t, 1 bé 1 tuổi)',members:4,baseFood:1,baseWater:1,reqFood:4,reqWater:4,
   circumstance:'Bé út vừa tròn 1 tuổi vẫn phụ thuộc hoàn toàn vào sữa bột và tã giấy suốt những ngày ngập nước.',
   needText:'BẮT BUỘC: Tã em bé & Sữa công thức (từ ba lô Part I hoặc xin hàng xóm ở Part III).',
   script:'Bé lớn 7 tuổi đã biết nghe lời, nhưng bé út vừa tròn 1 tuổi vẫn phụ thuộc hoàn toàn vào sữa bột và tã giấy. Cả nhà phải tính toán thật kỹ để con không bị thiếu thốn suốt những ngày ngập nước.'},

  // NHÓM 3: BỆNH NỀN (4 hộ)
  {id:'H02',group:'chronic',groupLabel:'Bệnh nền',title:'Hộ 2 · Gia đình có cụ ông cao huyết áp',membersText:'3 người (2 lớn, 1 cụ ông)',members:3,baseFood:1,baseWater:1,reqFood:3,reqWater:3,
   circumstance:'Cụ ông bị cao huyết áp nặng nhiều năm nay, ngày nào cũng phải uống thuốc đúng cữ.',
   needText:'BẮT BUỘC: Thuốc đặc trị (từ ba lô Part I hoặc xin hàng xóm ở Part III).',
   script:'Cụ ông sống cùng vợ chồng bạn bị cao huyết áp nặng nhiều năm nay, ngày nào cũng phải uống thuốc đúng cữ. Nếu mất điện, nước dâng mà trong nhà hết thuốc, huyết áp cụ tăng vọt sẽ cực kỳ nguy hiểm.'},
  {id:'H05',group:'chronic',groupLabel:'Bệnh nền',title:'Hộ 5 · Gia đình có cụ bà bệnh tim',membersText:'3 người (2 lớn, 1 cụ bà)',members:3,baseFood:1,baseWater:1,reqFood:3,reqWater:3,
   circumstance:'Cụ bà 76 tuổi có tiền sử bệnh tim mạch, rất dễ lên cơn khi lo âu lúc mưa bão.',
   needText:'BẮT BUỘC: Thuốc đặc trị (từ ba lô Part I hoặc xin hàng xóm ở Part III).',
   script:'Cụ bà 76 tuổi có tiền sử bệnh tim mạch. Cứ mỗi khi trời trở gió, sấm chớp hay lo âu vì mưa bão, tim cụ lại đập loạn nhịp và cần có sẵn thuốc đặc trị bên cạnh để giữ ổn định.'},
  {id:'H13',group:'chronic',groupLabel:'Bệnh nền',title:'Hộ 13 · Vợ chồng hưu trí bị hen suyễn',membersText:'2 người cao tuổi',members:2,baseFood:1,baseWater:1,reqFood:2,reqWater:2,
   circumstance:'Hai vợ chồng già về hưu sống nương tựa nhau, ông bị hen suyễn mãn tính.',
   needText:'BẮT BUỘC: Thuốc đặc trị (từ ba lô Part I hoặc xin hàng xóm ở Part III).',
   script:'Hai vợ chồng già về hưu sống lặng lẽ bên nhau. Ông có bệnh hen suyễn mãn tính, mỗi khi không khí ẩm lạnh và gió lùa vào nhà mà thiếu ống xịt thuốc thì ông sẽ khó thở ngay lập tức.'},
  {id:'H25',group:'chronic',groupLabel:'Bệnh nền',title:'Hộ 25 · Gia đình có cụ bà tiểu đường',membersText:'4 người (2 lớn, 1 cụ bà, 1 con 18t)',members:4,baseFood:1,baseWater:1,reqFood:4,reqWater:4,
   circumstance:'Cụ bà 82 tuổi mắc bệnh tiểu đường mãn tính, cần dùng thuốc điều trị hằng ngày.',
   needText:'BẮT BUỘC: Thuốc đặc trị (từ ba lô Part I hoặc xin hàng xóm ở Part III).',
   script:'Gia đình ba thế hệ sống quây quần bên nhau. Cụ bà 82 tuổi mắc bệnh tiểu đường mãn tính, bắt buộc phải dùng thuốc điều trị hằng ngày để không rơi vào biến chứng nguy hiểm.'},

  // NHÓM 4: NGƯỜI CAO TUỔI YẾU (3 hộ)
  {id:'H18',group:'elderly_weak',groupLabel:'Người cao tuổi yếu',title:'Hộ 18 · Hai bà cháu sống cùng nhau',membersText:'2 người (Bà yếu & cháu 10 tuổi)',members:2,baseFood:0,baseWater:1,reqFood:2,reqWater:2,
   circumstance:'Cha mẹ cháu đi làm xa, bà tuổi cao chân yếu đi lại rất chậm chạp.',
   needText:'BẮT BUỘC: Ưu tiên sơ tán sớm (Chủ động chuẩn bị Part II + Đèn/Áo mưa, hoặc được hàng xóm hỗ trợ Part III).',
   script:'Cha mẹ cháu đi làm ăn xa, ở nhà chỉ có hai bà cháu nương tựa nhau. Bà tuổi đã cao, chân yếu đi lại rất chậm chạp nên nếu không được sơ tán từ sớm thì một mình đứa cháu 10 tuổi không thể dìu bà chạy lũ.'},
  {id:'H21',group:'elderly_weak',groupLabel:'Người cao tuổi yếu',title:'Hộ 21 · Gia đình có cụ ông sau tai biến',membersText:'3 người (2 lớn, 1 cụ ông yếu)',members:3,baseFood:1,baseWater:1,reqFood:3,reqWater:3,
   circumstance:'Cụ ông từng bị tai biến nhẹ nên việc đi lại rất khó khăn, phải có người dìu từng bước.',
   needText:'BẮT BUỘC: Ưu tiên sơ tán sớm (Chủ động chuẩn bị Part II + Đèn/Áo mưa, hoặc được hàng xóm hỗ trợ Part III).',
   script:'Cụ ông từng bị tai biến nhẹ nên việc đi lại rất khó khăn, phải có người dìu từng bước. Khi nước bắt đầu dâng, việc đưa cụ lên chỗ cao ráo hoặc sơ tán phải làm thật sớm, không thể chờ nước ngập mới xoay xở.'},
  {id:'H23',group:'elderly_weak',groupLabel:'Người cao tuổi yếu',title:'Hộ 23 · Người con chăm hai cụ già ngoài 80',membersText:'3 người (1 người lớn, 2 cụ yếu)',members:3,baseFood:1,baseWater:1,reqFood:3,reqWater:3,
   circumstance:'Một mình người con chăm sóc cả cha lẫn mẹ đều đã ngoài 80 tuổi, sức khỏe suy yếu.',
   needText:'BẮT BUỘC: Ưu tiên sơ tán sớm (Chủ động chuẩn bị Part II + Đèn/Áo mưa, hoặc được hàng xóm hỗ trợ Part III).',
   script:'Một mình bạn chăm sóc cả cha lẫn mẹ đều đã ngoài 80 tuổi, sức khỏe suy yếu. Nếu chủ quan chần chừ để nước tràn vào nhà, một mình bạn khó lòng xoay xở đưa cả hai cụ đến nơi an toàn.'}
];

const BAG_ITEMS = [
  ["water","💧","Nước uống",11],["food","🥫","Thực phẩm ăn liền",9],
  ["med","💊","Thuốc đặc trị & sơ cứu",5],["milk","🍼","Sữa công thức & bình",5],
  ["diaper","👶","Tã em bé",5],["light","🔦","Đèn pin",3],
  ["power","🔋","Sạc dự phòng",5],["docs","📄","Giấy tờ chống nước",2],
  ["whistle","📣","Còi cứu hộ",1],["rain","🧥","Áo mưa",4],
  ["clothes","👕","Quần áo khô",9],["pads","🌸","Băng vệ sinh",3],
  ["hygiene","🪥","Bàn chải & kem ĐR",2],["blanket","🧣","Chăn giữ nhiệt",2],
  ["bags","🛍️","Túi rác loại dày",2],["laptop","💻","Laptop",17],
  ["bear","🧸","Gấu bông",4],["photo","🖼️","Ảnh gia đình",2],
  ["book","📔","Nhật ký",5],["cash","💵","Tiền mặt",2],
  ["radio","📻","Radio dùng pin",6],["intimate","🧴","Dung dịch VS nữ",3],
  ["underwear","🩲","Đồ lót sạch",3],["shampoo","🫧","Dầu gội xả gói",2],
  ["soap","🧼","Xà phòng",2],["contraceptive","💉","Thuốc tránh thai",1],
  ["detergent","🧺","Bột giặt",1],["bottle","🥤","Bình nước rỗng",3],
  ["tissues","🧻","Khăn giấy",2],["sanitizer","🧴","Nước rửa tay",2]
];

const TASKS = [
  {id:'profile_card',phase:1,label:'Part I · Bước 1: Nhận thẻ hộ gia đình',sec:45,
   mcScript:'Chào mừng các hộ dân Hội An! Hãy mở thẻ hộ gia đình vừa nhận được, đọc kỹ hoàn cảnh, số thành viên và nhu cầu đặc biệt của nhà mình.'},
  {id:'bag_90s',phase:1,label:'Part I · Bước 2: 90 giây chuẩn bị ba lô khẩn cấp',sec:90,
   mcScript:'Bão đang tiến gần! Mỗi hộ có đúng 90 giây (tối đa 12 món, 5.0kg) để chọn túi đựng và vật dụng cần thiết nhất cho gia đình mình.'},
  {id:'news',phase:2,label:'Part II · Bước 1: Tiếp nhận thông tin (T–48h)',sec:45,
   mcScript:'T–48 giờ trước lũ: Mưa bắt đầu kéo dài. Mỗi hộ vừa nhận được một mẩu thông tin khác nhau từ nhiều nguồn. Hãy đọc kỹ tin nhà mình đang có.'},
  {id:'talk1',phase:2,label:'Part II · Bước 2A: Thảo luận bộ đàm khu phố',sec:150,
   mcScript:'Mở mic toàn khu phố! Các hộ hãy trao đổi, đối chiếu thông tin với nhau xem tin nào đáng tin, tin nào là tin đồn thất thiệt.'},
  {id:'vote_news',phase:2,label:'Part II · Bước 2B: Bình chọn tối đa 3 tin đáng tin nhất',sec:45,
   mcScript:'Khóa mic thảo luận! Mỗi hộ có 45 giây để tick chọn tối đa 3 mẩu tin tin tưởng nhất đưa lên Bảng tin chung của khu phố.'},
  {id:'news_after_vote',phase:2,label:'Part II · Bước 2C: Bảng tin thông báo sau bình chọn',sec:45,
   mcScript:'Bảng tin tổng hợp sau bình chọn đã mở. Các hộ hãy đọc kỹ thông báo và bấm xác nhận đã đọc bảng tin.'},
  {id:'board_decide',phase:2,label:'Part II · Bước 3: Lựa chọn phương án ứng phó',sec:55,
   mcScript:'Dựa trên bảng tin cộng đồng và hoàn cảnh gia đình, mỗi hộ chọn phương án phù hợp nhất với mình.'},
  {id:'checklist',phase:2,label:'Part II · Bước 4: Sắp xếp thứ tự ưu tiên chuẩn bị',sec:80,
   mcScript:'Các hộ chủ động chuẩn bị hãy sắp xếp thứ tự ưu tiên các mục chuẩn bị theo hoàn cảnh gia đình.'},
  {id:'break',phase:2,label:'Break: Sharing Session trước mùa lũ',sec:600,
   mcScript:'Khoảng nghỉ chia sẻ thực tế (Không tiết lộ biến cố Part III): Cùng nhìn lại 5 nguyên tắc ứng phó bão lũ và chia sẻ trải nghiệm cá nhân.'},
  {id:'alert',phase:3,label:'Part III: Bão lũ đổ bộ & Kích hoạt hệ quả',sec:50,
   mcScript:'BÃO LŨ ĐỔ BỘ! Nước sông Thu Bồn dâng tràn khu dân cư. Hãy kiểm tra ngay tình trạng thực tế và kho tài nguyên còn lại của nhà mình!'},
  {id:'talk2',phase:3,label:'Part III: Mở mic thương lượng nguồn lực',sec:150,
   mcScript:'Hệ thống KHÔNG công khai kho đồ từng nhà. Các hộ hãy mở mic chủ động báo tình trạng thiếu/dư và thương lượng hỗ trợ lẫn nhau!'},
  {id:'transfer',phase:3,label:'Part III: Kết nối & Chia sẻ tài nguyên',sec:360,
   mcScript:'Cổng giao dịch tiếp tế đã mở! Chạm vào nhà hàng xóm trên bản đồ để chuyển Thực phẩm, Nước, Thuốc, Sữa/Tã hoặc Băng vệ sinh.'},
  {id:'ending',phase:4,label:'Part IV: Ngày mai trời lại sáng · Reflection',sec:300,
   mcScript:'Nước đã rút, bình minh lên trên phố Hội. Host MC công bố bức tranh tổng thể và dẫn dắt 4 câu hỏi Reflection.'}
];

const NEWS = [
  {official:true,source:'Bản tin thời tiết VTV (mô phỏng)',text:'Một cơn bão mạnh cấp 10-11, giật cấp 13 đang tiến vào khu vực Trung Trung Bộ trong 24 giờ tới. Hoàn lưu bão dự kiến gây mưa lớn 150-300 mm, khiến mực nước các sông tại Hội An có nguy cơ dâng cao, gia tăng khả năng ngập lụt...'},
  {official:false,source:'Bài đăng trên Facebook (giả định)',text:'Mấy đợt trước cũng báo bão lớn mà nước rút nhanh lắm. Nghe nói đợt này tối nay nước cũng sẽ rút thôi, mọi người cứ bình tĩnh, chưa cần chuẩn bị gì đâu!'},
  {official:true,source:'Ban Chỉ huy Phòng thủ dân sự địa phương (mô phỏng)',text:'Theo số liệu quan trắc mới nhất, mực nước sông Thu Bồn và các sông khác đang tiếp tục dâng do mưa lớn kéo dài...'},
  {official:false,source:'Nhóm Zalo cộng đồng dân cư Hội An (giả định)',text:'Tin khẩn mọi người ơi! Nghe nói tối nay thủy điện phía thượng nguồn sẽ xả lũ lớn, cả Hội An có thể ngập sâu trong vài tiếng nữa. Ai có người quen ở đó thì báo ngay nha!'},
  {official:false,source:'TikTok @Thánh Soi Bão (giả định)',text:'🚨 BÃO CẤP 11 NHƯNG HỘI AN KHÔNG ĐÁNG LO⁉️ Tôi soi hết đường đi nước bước của cơn bão này rồi. Bão đang yếu dần trước khi vào đất liền, Hội An khó mà ngập nặng được. Kèo này không có gì phải rén!'},
  {official:true,source:'Trung tâm Dự báo Khí tượng Thủy văn Quốc gia (mô phỏng)',text:'Hoàn lưu bão có khả năng gây mưa lớn kéo dài tại Trung Trung Bộ. Nguy cơ lũ trên các sông từ Quảng Trị đến Quảng Ngãi gia tăng, đặc biệt tại những khu vực trũng thấp ven sông.'},
  {official:false,source:'Nhóm Zalo Hội An Có Gì? (giả định)',text:'Mọi người ơi, nghe bảo mấy tuyến đường ven sông đã bắt đầu ngập rồi đó! Nhà ai gần sông thì coi chừng nha, tình hình có vẻ căng hơn dự báo ban đầu!'},
  {official:false,source:'YouTube Chuyên Gia Bão Lũ 24H (giả định)',text:'Bão cấp 11 nghe thì đáng sợ, nhưng nhìn đường đi hiện tại thì khả năng ảnh hưởng trực tiếp đến Hội An không quá lớn. Mọi người đừng vội lo lắng quá mức!'},
  {official:true,source:'Báo Tuổi Trẻ (mô phỏng)',text:'Mưa lớn tại miền Trung khiến mực nước nhiều sông tiếp tục tăng. Các địa phương đang chủ động theo dõi nguy cơ ngập lụt và cập nhật phương án ứng phó với diễn biến thời tiết phức tạp.'},
  {official:false,source:'Nhóm Facebook Người Hội An (giả định)',text:'Nhà mình ở Hội An mấy chục năm rồi, năm nào cũng có mưa bão. Mấy hôm nay thấy nước vẫn chưa lên bao nhiêu, chắc đợt này cũng không nghiêm trọng như mọi người đang nói đâu!'},
  {official:false,source:'Nhóm Zalo Hội An Mình Ơi! (giả định)',text:'Mọi người ơi, nghe nói khu vực mình sẽ được hỗ trợ nhu yếu phẩm tận nhà nếu nước lên cao. Vậy nên chắc không cần tích trữ nhiều đâu, cứ đợi thông báo chính thức là được!'},
  {official:false,source:'Livestream Facebook Hội An 360 (giả định)',text:'Cập nhật trực tiếp từ khu vực Chùa Cầu: hiện tại một số tuyến đường vẫn chưa ghi nhận ngập. Nhiều người dân vẫn đi lại bình thường, các hoạt động sinh hoạt chưa bị gián đoạn.'}
];

const CHECKLIST = [
  '🎒 Kiểm tra nhu yếu phẩm và thuốc thiết yếu',
  '📡 Kiểm tra thông tin cảnh báo từ nguồn đáng tin cậy',
  '📁 Bảo vệ giấy tờ và vật dụng quan trọng',
  '⚡ Kiểm tra an toàn điện; không chạm vào thiết bị điện đã ngập',
  '🏠 Xác định phương án trú ẩn và sơ tán',
  '🤝 Kiểm tra kế hoạch liên lạc và hỗ trợ hàng xóm'
];

// ================= THUẬT TOÁN CHIA VAI & TÍNH LOGIC SỐNG CÒN =================
function assignProfilesStratified(n) {
  const shuffle = arr => { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
  const buckets = {
    normal: shuffle(PROFILES.filter(x=>x.group==='normal')),
    baby: shuffle(PROFILES.filter(x=>x.group==='baby')),
    chronic: shuffle(PROFILES.filter(x=>x.group==='chronic')),
    elderly_weak: shuffle(PROFILES.filter(x=>x.group==='elderly_weak'))
  };
  const order = shuffle(['normal','baby','chronic','elderly_weak']);
  const out = [];
  for(let i=0;i<n;i++){
    const g = order[i%4];
    if(!buckets[g].length) buckets[g] = shuffle(PROFILES.filter(x=>x.group===g));
    out.push(buckets[g].pop());
  }
  return shuffle(out);
}

function assignNewsViral(n) {
  const official=[0,2,5,8], unverified=[1,3,4,6,7,9,10,11];
  const viralOff = official[Math.floor(Math.random()*official.length)];
  const viralFake = unverified[Math.floor(Math.random()*unverified.length)];
  const pool = [];
  if(n>=4) pool.push(viralOff, viralOff, viralFake, viralFake);
  if(n>=10) pool.push(viralFake);
  const allIdx = Array.from({length:12},(_,i)=>i);
  while(pool.length<n){
    for(let i=allIdx.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[allIdx[i],allIdx[j]]=[allIdx[j],allIdx[i]];}
    pool.push(...allIdx);
  }
  const res = pool.slice(0,n);
  for(let i=res.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[res[i],res[j]]=[res[j],res[i]];}
  return res;
}

function calcResultsFromState(room) {
  const playersObj = room.players || {};
  const transfersObj = room.transfers || {};
  const all = Object.values(playersObj).filter(p => p && p.status !== 'left');
  const transfers = Object.values(transfersObj);
  let totalMembers = 0, survivedMembers = 0, deadMembers = 0;

  const houses = all.map(p => {
    const prof = p.profile || PROFILES[0];
    totalMembers += prof.members;

    if (p.status === 'flooded') {
      deadMembers += prof.members;
      return {
        id:p.id, name:p.name, group:prof.groupLabel, title:prof.title, members:prof.members,
        status:'flooded', outcome:'flooded', outcomeLabel:'🌊 Gặp nạn do lũ cuốn (Mất liên lạc)',
        survivedCount:0, lostCount:prof.members, food:0, water:0, reqFood:p.reqFood, reqWater:p.reqWater,
        prepared:p.prepared, sentCount:0, issues:['Bị lũ cuốn mất liên lạc'], logs:p.consequenceLogs||[]
      };
    }

    let specialLoss = 0;
    const issues = [];
    if (p.needBaby && (p.babyQty||0) < 1) { specialLoss += 1; issues.push('Thiếu Sữa & Tã em bé (-1 thành viên)'); }
    if (p.needMed && (p.medQty||0) < 1) { specialLoss += 1; issues.push('Thiếu Thuốc đặc trị (-1 thành viên)'); }
    if (p.needEvac && !p.evacHelped) { specialLoss += 1; issues.push('Người cao tuổi yếu không kịp sơ tán (-1 thành viên)'); }
    if (p.needPads && (p.padsQty||0) < 1) { issues.push('Thiếu Băng vệ sinh khẩn cấp'); }

    const defFood = Math.max(0, (p.reqFood||2) - (p.food||0));
    const defWater = Math.max(0, (p.reqWater||2) - (p.water||0));
    const basicLoss = Math.floor((defFood + defWater) / 2);
    if (defFood > 0 || defWater > 0) issues.push(`Thiếu ${defFood} Ăn, ${defWater} Nước`);

    const totalLoss = Math.min(prof.members, specialLoss + basicLoss);
    const surv = Math.max(0, prof.members - totalLoss);
    survivedMembers += surv;
    deadMembers += totalLoss;

    let outcome = 'safe', outcomeLabel = '☀️ Bình an trọn vẹn';
    if (totalLoss > 0) { outcome = 'damaged'; outcomeLabel = `🩹 Vượt qua nhưng có ${totalLoss} thành viên gặp nạn`; }
    else if (issues.length > 0) { outcome = 'damaged'; outcomeLabel = '⚠️ Sống sót nhưng chịu tổn thương sinh hoạt'; }

    const sentCount = transfers.filter(x => x.from === p.id && x.status === 'accepted').length;
    return {
      id:p.id, name:p.name, group:prof.groupLabel, title:prof.title, members:prof.members,
      status:'active', outcome, outcomeLabel, survivedCount:surv, lostCount:totalLoss,
      food:p.food||0, water:p.water||0, reqFood:p.reqFood||2, reqWater:p.reqWater||2,
      prepared:p.prepared, sentCount, issues, logs:p.consequenceLogs||[]
    };
  });

  return {
    totalHouses: all.length,
    safeHouses: houses.filter(h => h.outcome === 'safe').length,
    damagedHouses: houses.filter(h => h.outcome === 'damaged').length,
    floodedHouses: houses.filter(h => h.outcome === 'flooded').length,
    totalMembers, survivedMembers, deadMembers, houses
  };
}
