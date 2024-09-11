"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface ApiResponse {
  status: number;
  message: string;
  data: PersonProps[];
}

interface PersonProps {
  id: number;
  name: string;
  nik: string;
  gender: string;
}

export default function Home() {
  const [persons, setPersons] = useState<PersonProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [indexExpandTable, setIndexExpandTable] = useState<number[]>([]);

  const fetchPersons = async (): Promise<void> => {
    try {
      const result = await axios.get<ApiResponse>(
        "http://localhost:3000/api/persons"
      );
      setPersons(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPersons().finally(() => setIsLoading(false));
  }, []);

  const handleToggleRow = (index: number) => {
    setIndexExpandTable((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  useEffect(() => {
    console.log("Show indexExpandTable:", indexExpandTable);
  }, [indexExpandTable]);

  return (
    <div className="w-full min-h-screen container mx-auto px-20 py-5">
      <h1 className="text-2xl font-bold text-slate-700 mb-3">Fetch Persons</h1>

      <div className="overflow-x-auto">
        <table className="border rounded-md shadow transition-all duration-500">
          <thead>
            <tr className="text-white bg-slate-500">
              <th className="min-w-10 border">No</th>
              <th className="min-w-32 border">Nama</th>
              <th className="min-w-40 border">Nik</th>
              <th className="min-w-20 border">Gender</th>
            </tr>
          </thead>
          <tbody className="text-sm text-center">
            {isLoading ? (
              <tr className="border">
                <td className="py-1.5" colSpan={4}>
                  loading...
                </td>
              </tr>
            ) : persons.length > 0 ? (
              persons.map((person: PersonProps, index: number) => (
                <React.Fragment key={person.id}>
                  <tr
                    className=" hover:cursor-pointer hover:bg-slate-300"
                    onClick={() => handleToggleRow(index)}
                  >
                    <td className="border py-1.5">{index + 1}</td>
                    <td className="border">{person.name}</td>
                    <td className="border">{person.nik}</td>
                    <td className="border">{person.gender}</td>
                  </tr>
                  {indexExpandTable.includes(index) && (
                    <tr>
                      <td colSpan={4} className="border bg-gray-100">
                        <div className="p-2">
                          Detail tambahan untuk {person.name}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
                // {indexExpandTable.includes(index) && (
                //   <tr>
                //   <td>test</td></tr>
                // )}
              ))
            ) : (
              <tr className="border">
                <td className="py-1.5" colSpan={4}>
                  Data masih kosong!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
