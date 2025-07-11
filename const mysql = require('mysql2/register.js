const mysql = require('mysql2/promise');

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

    const [existing] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).send('Email already registered');
    }

    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

    res.status(200).send('✅ Registered successfully');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Server error');
  }
};
