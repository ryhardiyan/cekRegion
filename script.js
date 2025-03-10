document.getElementById('stalkForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Mencegah form submit default

  // Ambil nilai dari input
  const userId = document.getElementById('user_id').value;
  const zoneId = document.getElementById('zone_id').value;

  // Buat payload untuk request
  const payload = {
    user_id: userId,
    zone_id: zoneId,
  };

  // Lakukan request ke API
  fetch('https://api.naimstore.id/api/stack-ml', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
      'Referer': 'https://naimstore.id/stalk-ml',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json()) // Parse response sebagai JSON
    .then((data) => {
      // Tampilkan hasil di elemen dengan id 'result'
      const resultElement = document.getElementById('result');
      const resultUserId = document.getElementById('resultUserId');
      const resultZoneId = document.getElementById('resultZoneId');
      const resultNick = document.getElementById('resultNick');
      const resultRegion = document.getElementById('resultRegion');

      if (data.status) {
        resultUserId.textContent = userId;
        resultZoneId.textContent = zoneId;
        resultNick.textContent = data.data.nick;
        resultRegion.textContent = data.data.region;
        resultElement.style.display = 'block';
      } else {
        alert('Data tidak ditemukan.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mengambil data.');
    });
});