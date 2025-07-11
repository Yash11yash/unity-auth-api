const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST allowed');
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Missing email or password');
  }

  try {
    const db = await mysql.createConnection({
      host: 'sql309.infinityfree.com',
      user: 'if0_39448089',
      password: 'MrWKwKCIL75',
      database: 'if0_39448089_if0_39448089',
    });

    const [rows] = await db.execute('SELECT password FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).send('❌ Email not found');
    }

    const match = await bcrypt.compare(password, rows[0].password);

    if (!match) {
      return res.status(401).send('❌ Invalid password');
    }

    res.status(200).send('✅ Login successful');
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server error');
  }
};
