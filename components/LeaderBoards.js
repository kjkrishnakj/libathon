import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const LeaderBoards = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    fetch("/api/topUser")
      .then((res) => res.json())
      .then((data) => {
        setTopUsers(data);
      })
      .catch((err) => console.error("Error fetching top users:", err));
  }, []);

  useEffect(() => {
    console.log("Updated topUsers state:", topUsers);
  }, [topUsers]); // Log only after state updates
  
  console.log(" topUsers state:", topUsers)
  return (
    <>
    <section className="bg-gradient-to-r from-blue-400 to-indigo-600 text-white body-font py-1">
      <div className="container px-5 mx-auto text-center" style={{ height: "44vh" }}>
        <h2 className="text-2xl font-bold mb-2">🏆 Top 3 Issuers</h2>

        {topUsers.length > 0 ? (
          <div className="bg-white p-6 mb-6 shadow-lg">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={topUsers} layout="vertical">
                <XAxis type="number" hide tick={{ fill: "#4F46E5", fontSize: 14, fontWeight: "bold" }} />
                <YAxis
                  dataKey="_id"
                  type="category"
                  width={100}
                  tickFormatter={(id) => id.toUpperCase()}
                  tick={{ fill: "#323", fontSize: 14, fontWeight: "bold" }}
                />
                <Tooltip cursor={{ fill: "rgba(79,70,229,0.1)" }} />
                <Bar dataKey="count" fill="#4F46E5" barSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-lg font-semibold animate-pulse">Loading...</p>
        )}
      </div>
    </section>
    </>
  );
};

export default LeaderBoards;
