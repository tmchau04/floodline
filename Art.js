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

  // 2. Tạo 12 mẫu nhà Hội An x 3 trạng thái (normal, cracked, flooded)
  const wallColors = ['#f6d465', '#f2c14e', '#f7df8b', '#e8b948', '#f5cb5c', '#edd074'];
  const roofColors = ['#9e4737', '#8c3b2b', '#b3533e', '#7d3325'];

  c.width = 68; c.height = 68;
  for (let i = 0; i < 12; i++) {
    ['normal', 'cracked', 'flooded'].forEach(st => {
      ctx.clearRect(0, 0, 68, 68);
      const wall = wallColors[i % wallColors.length];
      const roof = roofColors[i % roofColors.length];

      // Bóng đổ dưới nền
      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.fillRect(10, 56, 48, 6);

      // Thân nhà tường vàng đặc trưng Hội An
      ctx.fillStyle = wall;
      ctx.fillRect(14, 28, 40, 28);
      ctx.strokeStyle = '#5c4028';
      ctx.lineWidth = 2;
      ctx.strokeRect(14, 28, 40, 28);

      // Mái ngói âm dương
      ctx.fillStyle = roof;
      ctx.beginPath();
      ctx.moveTo(8, 30);
      ctx.lineTo(34, 12);
      ctx.lineTo(60, 30);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Đường gân ngói
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fillRect(22, 22, 24, 2);

      // Cửa chính & Cửa sổ gỗ nâu
      ctx.fillStyle = '#5c3822';
      ctx.fillRect(29, 40, 10, 16); // Cửa chính
      ctx.fillRect(18, 36, 7, 8);   // Cửa sổ trái
      ctx.fillRect(43, 36, 7, 8);   // Cửa sổ phải

      // Đèn lồng Hội An treo trước hiên
      ctx.fillStyle = (i % 2 === 0) ? '#e63946' : '#f4a261';
      ctx.fillRect(25, 31, 4, 5);
      ctx.fillRect(39, 31, 4, 5);

      // Trạng thái hư hại / nứt tường (cracked)
      if (st === 'cracked') {
        ctx.strokeStyle = '#3b2416';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(20, 30); ctx.lineTo(25, 42); ctx.lineTo(22, 52);
        ctx.moveTo(46, 32); ctx.lineTo(42, 46);
        ctx.stroke();
        // Mái ngói xô lệch
        ctx.fillStyle = '#4a3525';
        ctx.fillRect(36, 18, 8, 6);
      }

      // Trạng thái ngập lụt (flooded)
      if (st === 'flooded') {
        ctx.fillStyle = 'rgba(42, 118, 156, 0.78)';
        ctx.fillRect(8, 38, 52, 22);
        ctx.fillStyle = '#a8e6ff';
        ctx.fillRect(12, 40, 16, 2);
        ctx.fillRect(36, 45, 18, 2);
      }

      assets[`house_${i}_${st}.png`] = c.toDataURL();
    });
  }
  return assets;
})();