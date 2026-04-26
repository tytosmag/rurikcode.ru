import bcrypt from 'bcryptjs';
import db from '../config/db.js';

export const updateProfile = async (req, res) => {
  try {
    const { email, first_name, last_name, middle_name, password } = req.body;

    const payload = {
      email: email || null,
      first_name: first_name || null,
      last_name: last_name || null,
      middle_name: middle_name || null,
      updated_at: new Date(),
    };

    if (password) {
      payload.password_hash = await bcrypt.hash(password, 10);
    }

    const [updatedUser] = await db('users')
      .where({ id: req.user.id })
      .update(payload)
      .returning(['id', 'username', 'email', 'first_name', 'last_name', 'middle_name', 'role']);

    return res.json({ message: 'Профиль обновлён', user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка обновления профиля', error: error.message });
  }
};