enum Role {
  Pracownik = 'Pracownik',
  Moderator = 'Moderator',
  Administrator = 'Administrator',
}

export type User = {
  id: number;
  email: string;
  password: string;
  role: Role;
  permissions?: UserPermission[];
  createdAt: Date;
  updatedAt: Date;
  firstName: string | null;
  lastName: string | null;
  workDays?: WorkDay[];
  taskHours?: TaskHour[];
  comments?: Comment[];
  userProjects?: UserProject[];
  userTasks?: UserTask[];
};

export type UserProject = {
  userId: number;
  user: User;
  projectId: number;
  project: Project;
};

export type UserTask = {
  userId: number;
  user: User;
  taskId: number;
  task: Task;
};

export type Permission = {
  id: number;
  name: string;
  users: UserPermission[];
};

export type UserPermission = {
  permissionId: number;
  permission: Permission;
  userId: number;
  user: User;
};

export type TaskHour = {
  id: number;
  taskId: number;
  createdAt: Date;
  startTime: Date;
  endTime: Date;
  duration: number;
  note: string | null;
  task: Task;
  workDay?: WorkDay | null;
  workDayId: number | null;
  userId: number;
  user?: User;
};

export type Comment = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  type: string;
  workdayId: number;
  workday?: WorkDay;
  userId: number;
  user?: User;
};

export type WorkDay = {
  id: number;
  userId: number;
  date: string;
  createdAt: Date;
  updatedAt: Date;
  isReviewed: boolean;
  reviewedBy: number | null;
  taskHours: TaskHour[];
  comments?: Comment[];
  user?: User;
};

export type Project = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  title: string;
  description: string;
  tasks?: Task[];
  userProjects?: UserProject[];
};

export type Task = {
  id: number;
  projectId: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  taskHours?: TaskHour[];
  project?: Project;
  userTasks?: UserTask[];
};
