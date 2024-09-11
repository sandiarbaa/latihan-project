interface PersonProps {
  id: number;
  name: string;
  nik: string;
  gender: string;
}

export const persons: PersonProps[] = [
  {
    id: 1,
    name: "Hashirama Senju",
    nik: "1234567890000001",
    gender: "Male",
  },
  {
    id: 2,
    name: "Tobirama Senju",
    nik: "1234567890000002",
    gender: "Male",
  },
  {
    id: 3,
    name: "Hiruzen Sarutobi",
    nik: "1234567890000003",
    gender: "Male",
  },
  {
    id: 4,
    name: "Minato Namikaze",
    nik: "1234567890000004",
    gender: "Male",
  },
  {
    id: 5,
    name: "Tsunade Senju",
    nik: "1234567890000005",
    gender: "Female",
  },
];
