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
  // 3. Tạo nền khu phố Hội An chi tiết (1120x740): đường, bờ sông, cầu, cây, hoa giấy hồng, lồng đèn
  const bgCanvas = document.createElement('canvas');
  bgCanvas.width = 1120;
  bgCanvas.height = 740;
  const bctx = bgCanvas.getContext('2d');
  bctx.imageSmoothingEnabled = false;

  const tileImg = new Image();
  tileImg.src = assets['tiles.png'];

  // Nền cỏ & lưới gạch/đất
  bctx.fillStyle = '#89b587';
  bctx.fillRect(0, 0, 1120, 740);
  for (let ty = 0; ty < 740; ty += 32) {
    for (let tx = 0; tx < 1120; tx += 32) {
      const isRoad = (ty >= 320 && ty < 365) || (tx >= 995 && tx < 1035);
      bctx.fillStyle = isRoad ? '#b8a688' : '#89b587';
      bctx.fillRect(tx, ty, 32, 32);
      bctx.fillStyle = isRoad ? '#9f8d70' : '#79a477';
      if (((tx + ty) / 32) % 2 === 0) {
        bctx.fillRect(tx + 5, ty + 7, 4, 2);
        bctx.fillRect(tx + 20, ty + 21, 3, 2);
      }
    }
  }

  // Tuyến đường chính & viền lề
  bctx.fillStyle = '#c4b293';
  bctx.fillRect(24, 326, 982, 40);
  bctx.fillStyle = '#75634b';
  bctx.fillRect(24, 324, 982, 2);
  bctx.fillRect(24, 366, 982, 2);

  // Dòng sông & bờ kè bên phải
  bctx.fillStyle = '#4e919c';
  bctx.fillRect(1040, 0, 80, 740);
  bctx.fillStyle = '#73b3bd';
  bctx.fillRect(1040, 0, 6, 740);
  bctx.fillStyle = '#6c5842';
  bctx.fillRect(1034, 0, 6, 740);

  // Cầu gỗ bắc qua sông tại trục đường chính (y = 322..370)
  bctx.fillStyle = '#7c5230';
  bctx.fillRect(1002, 320, 46, 50);
  bctx.fillStyle = '#a87444';
  for (let py = 323; py < 368; py += 6) {
    bctx.fillRect(1005, py, 40, 3);
  }
  bctx.fillStyle = '#4f321b';
  bctx.fillRect(1002, 320, 46, 3);
  bctx.fillRect(1002, 367, 46, 3);

  // Hàm vẽ bụi cây xanh + hoa giấy hồng
  function drawBougainvilleaBush(cx, cy, scale = 1) {
    bctx.save();
    bctx.translate(cx, cy);
    bctx.scale(scale, scale);
    // Tán lá xanh đậm
    bctx.fillStyle = '#2d6a4f';
    bctx.beginPath();
    bctx.arc(-8, 2, 11, 0, Math.PI * 2);
    bctx.arc(8, 2, 11, 0, Math.PI * 2);
    bctx.arc(0, -6, 13, 0, Math.PI * 2);
    bctx.fill();
    // Tán lá sáng hơn
    bctx.fillStyle = '#40916c';
    bctx.beginPath();
    bctx.arc(-5, -2, 8, 0, Math.PI * 2);
    bctx.arc(6, -1, 8, 0, Math.PI * 2);
    bctx.fill();
    // Cụm bông hoa giấy màu hồng
    const petals = [
      [-9, -3, '#ff5d8f'], [-3, -9, '#ff75a0'], [4, -8, '#ff4d84'],
      [9, -2, '#ff85ad'], [-5, 3, '#ff477e'], [2, 4, '#ff709c'], [7, 4, '#ff5c8d']
    ];
    petals.forEach(([px, py, col]) => {
      bctx.fillStyle = col;
      bctx.beginPath();
      bctx.arc(px, py, 3.6, 0, Math.PI * 2);
      bctx.fill();
      bctx.fillStyle = '#ffd6e5';
      bctx.fillRect(px - 1, py - 1, 1.5, 1.5);
    });
    bctx.restore();
  }

  // Hàm vẽ cây xanh phố cổ ở các khoảng trống
  function drawStreetTree(cx, cy) {
    bctx.fillStyle = 'rgba(0,0,0,0.16)';
    bctx.beginPath();
    bctx.ellipse(cx, cy + 12, 13, 5, 0, 0, Math.PI * 2);
    bctx.fill();
    bctx.fillStyle = '#5c3d24';
    bctx.fillRect(cx - 2.5, cy, 5, 12);
    bctx.fillStyle = '#3b7a57';
    bctx.beginPath();
    bctx.arc(cx, cy - 5, 11, 0, Math.PI * 2);
    bctx.fill();
    bctx.fillStyle = '#52996e';
    bctx.beginPath();
    bctx.arc(cx - 3, cy - 8, 7, 0, Math.PI * 2);
    bctx.fill();
  }

  // Rải cây xanh & hoa giấy hồng ở các hành lang giữa các hàng nhà (tránh đè spots)
  const treeSpots = [
    [72, 82], [252, 80], [448, 82], [645, 80], [840, 82],
    [70, 428], [448, 426], [842, 428],
    [160, 668], [355, 672], [550, 668], [745, 672], [935, 668]
  ];
  treeSpots.forEach(([tx, ty]) => drawStreetTree(tx, ty));

  const bougainvilleaSpots = [
    [118, 198, 1.0], [312, 195, 1.1], [508, 198, 0.95], [702, 195, 1.1], [896, 198, 1.0],
    [252, 305, 0.9], [645, 305, 0.95], [840, 305, 0.9],
    [118, 385, 0.95], [312, 386, 1.05], [508, 385, 0.95], [702, 386, 1.05], [896, 385, 0.95],
    [252, 542, 1.05], [645, 540, 1.1], [1022, 175, 1.05], [1022, 495, 1.05]
  ];
  bougainvilleaSpots.forEach(([bx, by, sc]) => drawBougainvilleaBush(bx, by, sc));

  // Dây lồng đèn đủ màu mắc dọc tuyến đường chính phía trên (y ~ 314)
  const lanternColors = ['#e63946', '#f4a261', '#2a9d8f', '#e9c46a', '#d62828', '#e76f51', '#4ea8de', '#c9184a'];
  const startX = 65, endX = 995, spanW = 116;
  for (let sx = startX; sx < endX; sx += spanW) {
    const nx = Math.min(endX, sx + spanW);
    // Dây treo võng nhẹ
    bctx.strokeStyle = '#4a3525';
    bctx.lineWidth = 1.5;
    bctx.beginPath();
    bctx.moveTo(sx, 306);
    bctx.quadraticCurveTo((sx + nx) / 2, 318, nx, 306);
    bctx.stroke();

    // 3 đèn lồng mỗi nhịp
    [0.25, 0.5, 0.75].forEach((tRatio, idx) => {
      const lx = Math.round(sx + (nx - sx) * tRatio);
      const ly = Math.round((1 - tRatio) * (1 - tRatio) * 306 + 2 * (1 - tRatio) * tRatio * 318 + tRatio * tRatio * 306);
      const col = lanternColors[(Math.floor(sx / spanW) * 3 + idx) % lanternColors.length];

      bctx.strokeStyle = '#3a2a1d';
      bctx.lineWidth = 1;
      bctx.beginPath();
      bctx.moveTo(lx, ly);
      bctx.lineTo(lx, ly + 3);
      bctx.stroke();

      bctx.fillStyle = col;
      bctx.beginPath();
      bctx.ellipse(lx, ly + 8, 5, 6, 0, 0, Math.PI * 2);
      bctx.fill();

      bctx.strokeStyle = '#3a2a1d';
      bctx.lineWidth = 1.1;
      bctx.stroke();

      // Vệt sáng giữa đèn
      bctx.fillStyle = 'rgba(255, 245, 190, 0.55)';
      bctx.fillRect(lx - 1.5, ly + 5, 3, 5);

      // Tua rua nhỏ
      bctx.fillStyle = '#f9c74f';
      bctx.fillRect(lx - 0.8, ly + 14, 1.6, 3);
    });
  }

  assets['map_bg.png'] = bgCanvas.toDataURL();
  return assets;
})();
