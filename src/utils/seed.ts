import type { Activity } from "../models/Activity";

export function seedActivities(): Activity[] {
  return [
    {
      id: "mon-1",
      dayOfWeek: 1,
      subject: "Matemática",
      title: "Fazer página 12 (exercícios 1-5)",
      completed: false,
    },
    {
      id: "mon-2",
      dayOfWeek: 1,
      subject: "Português",
      title: "Ler 10 páginas e resumir",
      completed: false,
    },
    {
      id: "tue-1",
      dayOfWeek: 2,
      subject: "Ciências",
      title: "Revisar sistema solar",
      completed: false,
    },
    {
      id: "tue-2",
      dayOfWeek: 2,
      subject: "Matemática",
      title: "Tabuada do 7 (treinar 10 min)",
      completed: false,
    },
    {
      id: "wed-1",
      dayOfWeek: 3,
      subject: "História",
      title: "Responder questões do capítulo 3",
      completed: false,
    },
    {
      id: "wed-2",
      dayOfWeek: 3,
      subject: "Português",
      title: "Ortografia: lista de palavras",
      completed: false,
    },
    {
      id: "thu-1",
      dayOfWeek: 4,
      subject: "Geografia",
      title: "Mapa do Brasil: regiões",
      completed: false,
    },
    {
      id: "thu-2",
      dayOfWeek: 4,
      subject: "Matemática",
      title: "Problemas de soma e subtração",
      completed: false,
    },
    {
      id: "fri-1",
      dayOfWeek: 5,
      subject: "Ciências",
      title: "Experimento simples: registrar observação",
      completed: false,
    },
    {
      id: "fri-2",
      dayOfWeek: 5,
      subject: "Português",
      title: "Ditado (10 palavras)",
      completed: false,
    },
  ];
}
