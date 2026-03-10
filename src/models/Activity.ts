export type Subject =
  | "Matemática"
  | "Português"
  | "Ciências"
  | "História"
  | "Geografia";

export type Activity = {
  id: string;
  subject: Subject;
  title: string;
  completed: boolean;
  dayOfWeek: 1 | 2 | 3 | 4 | 5; // 1=Seg ... 5=Sex
};
