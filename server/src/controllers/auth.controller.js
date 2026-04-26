import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import { getCookieOptions } from '../utils/cookie.js';

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Логин и пароль обязательны' });
    }

    const existingUser = await db('users').where({ username }).first();
    if (existingUser) {
      return res.status(409).json({ message: 'Пользователь уже существует' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const [user] = await db('users')
      .insert({ username, password_hash })
      .returning(['id', 'username', 'role']);

    return res.status(201).json({ message: 'Регистрация успешна', user });
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка регистрации', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await db('users').where({ username }).first();
    if (!user) {
      return res.status(401).json({ message: 'Неверный логин или пароль' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Неверный логин или пароль' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie(process.env.COOKIE_NAME || 'token', token, getCookieOptions());

    return res.json({
      message: 'Вход выполнен',
      user: { id: user.id, username: user.username, role: user.role }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка входа', error: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME || 'token', getCookieOptions());
  return res.json({ message: 'Выход выполнен' });
};

export const me = async (req, res) => {
  try {
    const user = await db('users')
      .select('id', 'username', 'role', 'email', 'first_name', 'last_name', 'middle_name')
      .where({ id: req.user.id })
      .first();

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка получения профиля', error: error.message });
  }
};

export const restore = async (req, res) => {
  return res.json({ message: 'Функция восстановления пароля будет реализована на следующем шаге' });
};