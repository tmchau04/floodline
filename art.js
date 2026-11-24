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

// 2. Tạo 12 mẫu nhà pixel Hội An x 3 trạng thái (normal, cracked, flooded) theo mẫu image_88bdc0.png
  const roofThemes = [
    { main: '#a83b36', light: '#c9564e', dark: '#6b221f' }, // Đỏ gạch
    { main: '#386e91', light: '#5691b8', dark: '#21455c' }, // Xanh dương đậm
    { main: '#b87635', light: '#d99652', dark: '#75481c' }, // Cam nâu đất
    { main: '#5c6168', light: '#7d838c', dark: '#383b40' }, // Xám mái (dùng cho nhà ngập/mưa)
    { main: '#963b64', light: '#ba5784', dark: '#5e213d' }, // Đỏ tím / hồng mận
    { main: '#3d5a9e', light: '#5c7bc4', dark: '#253763' }  // Xanh lam
  ];
  const wallPalette = {
    bg: '#e5c175',
    light: '#f2d38d',
    shadow: '#c79f50',
    outline: '#3a2a1d',
    wood: '#6b442a',
    woodDark: '#472b18',
    winGlass: '#9ec5c4',
    winFrame: '#5a7878',
    lantern: '#e05a2b'
  };

  c.width = 76; c.height = 76;
  for (let i = 0; i < 12; i++) {
    ['normal', 'cracked', 'flooded'].forEach(st => {
      ctx.clearRect(0, 0, 76, 76);
      const rt = roofThemes[i % roofThemes.length];

      // 1. Vùng nền mờ nhẹ phía sau nhà (giống ô nền sau ngôi nhà trên map)
      ctx.fillStyle = 'rgba(130, 158, 108, 0.45)';
      ctx.fillRect(10, 10, 56, 56);

      // 2. Thân tường vàng cổ Hội An
      const wx = 18, wy = 36, ww = 40, wh = 26;
      ctx.fillStyle = wallPalette.bg;
      ctx.fillRect(wx, wy, ww, wh);
      // Bóng nhẹ dưới chân tường
      ctx.fillStyle = wallPalette.shadow;
      ctx.fillRect(wx + 1, wy + wh - 4, ww - 2, 3);
      // Ánh sáng nhẹ mép trên tường
      ctx.fillStyle = wallPalette.light;
      ctx.fillRect(wx + 1, wy + 1, ww - 2, 2);

      // Viền ngoài thân tường
      ctx.strokeStyle = wallPalette.outline;
      ctx.lineWidth = 2;
      ctx.strokeRect(wx, wy, ww, wh);

      // 3. Cửa chính gỗ ở giữa
      const dx = 34, dy = 45, dw = 8, dh = 17;
      ctx.fillStyle = wallPalette.wood;
      ctx.fillRect(dx, dy, dw, dh);
      ctx.strokeStyle = wallPalette.outline;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(dx, dy, dw, dh);
      // Đường dọc chia cánh cửa & tay nắm nhỏ
      ctx.fillStyle = wallPalette.woodDark;
      ctx.fillRect(dx + 3.5, dy + 1, 1, dh - 2);
      ctx.fillStyle = '#e8c068';
      ctx.fillRect(dx + 5.5, dy + 9, 1.5, 1.5);

      // 4. Hai cửa sổ hai bên
      [22, 46].forEach(sx => {
        const sy = 43, sw = 8, sh = 8;
        ctx.fillStyle = wallPalette.winFrame;
        ctx.fillRect(sx, sy, sw, sh);
        ctx.fillStyle = wallPalette.winGlass;
        ctx.fillRect(sx + 1.5, sy + 1.5, sw - 3, sh - 3);
        // Ánh phản chiếu nhỏ trên kính
        ctx.fillStyle = '#dff2f2';
        ctx.fillRect(sx + 2, sy + 2, 2, 2);
        // Song cửa sổ
        ctx.fillStyle = wallPalette.woodDark;
        ctx.fillRect(sx + 3.5, sy + 1, 1, sh - 2);
        ctx.fillRect(sx + 1, sy + 4, sw - 2, 1);
        ctx.strokeStyle = wallPalette.outline;
        ctx.lineWidth = 1.2;
        ctx.strokeRect(sx, sy, sw, sh);
      });

      // 5. Đèn lồng nhỏ 2 bên tường (đứng yên, không rung lắc)
      [15.5, 58.5].forEach(lx => {
        ctx.fillStyle = wallPalette.outline;
        ctx.fillRect(lx, 39, 2, 2);
        ctx.fillStyle = wallPalette.lantern;
        ctx.fillRect(lx - 1, 41, 4, 5);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(lx, 42.5, 2, 2);
      });

      // 6. Mái ngói xếp lớp nhiều tầng giống mẫu
      const layers = [
        { x: 23, y: 15, w: 30, h: 5 },
        { x: 19, y: 20, w: 38, h: 5 },
        { x: 15, y: 25, w: 46, h: 5 },
        { x: 13, y: 30, w: 50, h: 6 }
      ];
      layers.forEach((lr, idx) => {
        const shiftX = (st === 'cracked' && idx === 1) ? 2 : 0;
        ctx.fillStyle = rt.main;
        ctx.fillRect(lr.x + shiftX, lr.y, lr.w, lr.h);
        // Viền sáng trên từng hàng ngói
        ctx.fillStyle = rt.light;
        ctx.fillRect(lr.x + shiftX + 1, lr.y, lr.w - 2, 1.5);
        // Đường chia từng viên ngói nhỏ
        ctx.fillStyle = rt.dark;
        for (let tx = lr.x + shiftX + 4; tx < lr.x + shiftX + lr.w - 2; tx += 5) {
          ctx.fillRect(tx, lr.y + 1, 1, lr.h - 1);
        }
        // Viền tối đậm quanh khối mái
        ctx.strokeStyle = wallPalette.outline;
        ctx.lineWidth = 1.6;
        ctx.strokeRect(lr.x + shiftX, lr.y, lr.w, lr.h);
      });

      // 7. Đường nứt tường & gạch rơi dưới chân khi bị hư hại (cracked)
      if (st === 'cracked') {
        ctx.strokeStyle = wallPalette.outline;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(45, 36);
        ctx.lineTo(42, 43);
        ctx.lineTo(46, 50);
        ctx.lineTo(43, 57);
        ctx.moveTo(42, 43);
        ctx.lineTo(39, 47);
        ctx.stroke();

        // Mảnh gạch/đá vỡ nhỏ rơi dưới chân nhà
        ctx.fillStyle = wallPalette.shadow;
        ctx.fillRect(24, 64, 4, 2.5);
        ctx.fillRect(46, 63, 3.5, 2.5);
      }

      // 8. Mực nước lũ xanh phủ phần dưới khi bị ngập (flooded)
      if (st === 'flooded') {
        ctx.fillStyle = 'rgba(42, 118, 156, 0.78)';
        ctx.fillRect(14, 42, 48, 22);
        // Gợn sóng trắng nhẹ trên mặt nước
        ctx.strokeStyle = '#cdeeff';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(15, 43); ctx.quadraticCurveTo(20, 41, 25, 43);
        ctx.moveTo(48, 43); ctx.quadraticCurveTo(53, 41, 58, 43);
        ctx.stroke();
      }

      assets[`house_${i}_${st}.png`] = c.toDataURL();
    });
  }
  return assets;
})();
