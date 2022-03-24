import { body } from 'express-validator';

const subscribeToNewsletterRule = () => {
  return [
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .trim()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .withMessage('Enter a valid email address'),
    body('fullName').notEmpty().withMessage('First name is required').trim(),
  ];
};

export default {
  subscribeToNewsletterRule,
};
