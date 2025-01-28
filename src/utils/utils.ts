import * as bcrypt from 'bcrypt';
import { CreateTaskLabelDto } from 'src/task-label/entity/task-label.dto';

export const getUniqueLabelNames = (
  labels: CreateTaskLabelDto[],
): CreateTaskLabelDto[] => {
  const uniqueNames = [...new Set(labels.map((label) => label.name))];
  return uniqueNames.map((name) => ({ name }));
};

export const hashPass = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const verifyPass = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
