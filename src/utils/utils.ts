import { CreateTaskLabelDto } from 'src/task-label/entity/task-label.dto';

export const getUniqueLabelNames = (
  labels: CreateTaskLabelDto[],
): CreateTaskLabelDto[] => {
  const uniqueNames = [...new Set(labels.map((label) => label.name))];
  return uniqueNames.map((name) => ({ name }));
};
