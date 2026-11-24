// ================= BỘ TẠO PIXEL ART HỘI AN TÍCH HỢP =================
const EMBEDDED_ASSETS = (() => {
  const assets = {};
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');

  // 1. Tạo tileset mặt đất & đường đi (64x32)
  c.width = 64; c.height = 32;
  ctx.fillStyle = '#8eb88d'; ctx.fillRect(0, 0, 32, 32);
  ctx.fillStyle = '#7ea87d';
  ctx.fillRect(4, 6, 3, 2); ctx.fillRect(20, 18, 3, 2); ctx.fillRect(12, 26, 2, 2);
  ctx.fillStyle = '#b6a68c'; ctx.fillRect(32, 0, 32, 32);
  ctx.fillStyle = '#9e8e74';
  ctx.fillRect(36, 8, 4, 2); ctx.fillRect(50, 20, 4, 2);
  assets['tiles.png'] = c.toDataURL();

 // 2. Tạo 12 mẫu nhà phố cổ Hội An x 3 trạng thái (normal, cracked, flooded)
  const wallColors = ['#e8b438', '#dfaa30', '#eabf45', '#d9a12b', '#e6b843', '#dfb13b'];
  const roofColors = [
    { main: '#7a4b3a', rib: '#9e6852', edge: '#4a352d' },
    { main: '#3d6b7a', rib: '#5b8c9c', edge: '#24414a' },
    { main: '#9c562b', rib: '#bf7646', edge: '#5c3117' },
    { main: '#535861', rib: '#747a85', edge: '#2f3238' },
    { main: '#8a3b34', rib: '#b0554d', edge: '#4f201c' },
    { main: '#4f6e4b', rib: '#6f916a', edge: '#2d402a' }
  ];

  c.width = 68; c.height = 68;
  for (let i = 0; i < 12; i++) {
    ['normal', 'cracked', 'flooded'].forEach(st => {
      ctx.clearRect(0, 0, 68, 68);
      const wall = wallColors[i % wallColors.length];
      const roof = roofColors[i % roofColors.length];

      // Bóng đổ & bậc thềm đá xám dưới chân nhà
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(9, 57, 50, 5);
      ctx.fillStyle = '#6f7375';
      ctx.fillRect(11, 54, 46, 5);
      ctx.fillStyle = '#8e9396';
      ctx.fillRect(12, 54, 44, 1.5);

      // Thân tường vàng cổ Hội An + viền khung gọn
      ctx.fillStyle = wall;
      ctx.fillRect(13, 27, 42, 27);
      ctx.strokeStyle = '#5a3e25';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(13, 27, 42, 27);

      // Gờ trang trí góc tường 2 bên (đứng yên)
      ctx.fillStyle = '#fff3c9';
      ctx.fillRect(14, 30, 5, 1.5);
      ctx.fillRect(14, 33, 5, 1.5);
      ctx.fillRect(49, 30, 5, 1.5);
      ctx.fillRect(49, 33, 5, 1.5);

      // Biển / gờ ngang nhỏ cố định phía trên cửa chính
      ctx.fillStyle = '#3b2b22';
      ctx.fillRect(28, 30, 12, 4);
      ctx.strokeStyle = '#c9a66b';
      ctx.lineWidth = 1;
      ctx.strokeRect(28.5, 30.5, 11, 3);

      // Cửa chính gỗ sẫm màu ở giữa (cố định)
      ctx.fillStyle = '#2d221c';
      ctx.fillRect(28.5, 35, 11, 19);
      ctx.fillStyle = '#47362c';
      ctx.fillRect(30, 36.5, 3.3, 7);
      ctx.fillRect(34.7, 36.5, 3.3, 7);
      ctx.fillRect(30, 45.5, 3.3, 7);
      ctx.fillRect(34.7, 45.5, 3.3, 7);

      // Cửa sổ gỗ lá sách 2 bên (cố định, không lắc lư)
      [16, 41].forEach(wx => {
        ctx.fillStyle = '#2d221c';
        ctx.fillRect(wx, 36, 11, 12);
        ctx.fillStyle = '#423229';
        for (let ly = 38; ly <= 46; ly += 2.5) {
          ctx.fillRect(wx + 1.5, ly, 8, 1);
        }
      });

      // Mái ngói dốc ngang đặc trưng mặt tiền nhà cổ Hội An
      ctx.fillStyle = roof.main;
      ctx.beginPath();
      ctx.moveTo(8, 28);
      ctx.lineTo(13, 13);
      ctx.lineTo(55, 13);
      ctx.lineTo(60, 28);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#3b261b';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Các hàng ngói dốc song song
      for (let row = 0; row < 4; row++) {
        const ry = 15 + row * 3;
        ctx.fillStyle = roof.rib;
        ctx.fillRect(14 + row * 0.5, ry, 40 - row, 1.5);
      }

      // Diềm mái & đầu ngói tròn dọc mép dưới mái (cố định)
      ctx.fillStyle = roof.edge;
      ctx.fillRect(8, 26.5, 52, 2.5);
      for (let tx = 11; tx <= 55; tx += 5) {
        ctx.fillStyle = '#96918b';
        ctx.fillRect(tx, 26, 3, 2);
      }

      // Trạng thái hư hại / nứt tường (cracked)
      if (st === 'cracked') {
        ctx.strokeStyle = '#3b2416';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(47, 29); ctx.lineTo(44, 38); ctx.lineTo(48, 47);
        ctx.moveTo(20, 31); ctx.lineTo(22, 40);
        ctx.stroke();
      }

      // Trạng thái ngập lụt (flooded)
      if (st === 'flooded') {
        ctx.fillStyle = 'rgba(34, 118, 152, 0.72)';
        ctx.fillRect(8, 43, 52, 18);
        ctx.fillStyle = '#b8ebff';
        ctx.fillRect(12, 45, 14, 1.5);
        ctx.fillRect(38, 49, 16, 1.5);
      }

      assets[`house_${i}_${st}.png`] = c.toDataURL();
    });
  }
  return assets;
})();
