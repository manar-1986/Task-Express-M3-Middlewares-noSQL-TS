import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validatePost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 40 })
    .withMessage("Title must be under 40 characters")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Title must contain only letters and spaces"),
];
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};
