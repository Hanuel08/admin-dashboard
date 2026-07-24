import { useState, useEffect } from "react"
import { helpHttp } from "../helpers/helpHttp.js"
import { BASE_URL } from "../const/const.js"

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts"

import {
  IconUsers, IconUserCheck, IconUserShield, IconCrown
} from "@tabler/icons-react"

const STATUS_COLORS = {
  activo: "#22c55e",
  suspendido: "#dc2626",
  licencia: "#ca8a04",
  vacaciones: "#3b82f6",
  inactivo: "#6b7280",
  pendiente: "#9ca3af",
}

const ROLE_COLORS = ["#6366f1", "#a78bfa"]
const GENDER_COLORS = ["#3b82f6", "#ec4899"]

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center gap-4">
      <div className={`p-3 rounded-lg`} style={{ backgroundColor: `${color}20` }}>
        <Icon size={24} style={{ color }} />
      </div>
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  )
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      {children}
    </div>
  )
}

export function Home() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { get } = helpHttp()
    get(`${BASE_URL}/users/stats`)
      .then(res => {
        if (!res.err) setStats(res.data)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">Loading analytics...</p>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">Failed to load analytics</p>
      </div>
    )
  }

  const statusData = Object.entries(stats.byStatus).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    fill: STATUS_COLORS[name] || "#6b7280",
  }))

  const roleData = Object.entries(stats.byRole).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }))

  const genderData = Object.entries(stats.byGender).map(([name, value]) => ({
    name: name === "male" ? "Male" : "Female",
    value,
  }))

  return (
    <section className="text-white p-6 w-full h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-400 text-sm">Overview of your platform analytics</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard icon={IconUsers} label="Total Users" value={stats.total} color="#6366f1" />
          <StatCard icon={IconUserCheck} label="Active Users" value={stats.byStatus.activo || 0} color="#22c55e" />
          <StatCard icon={IconUserShield} label="Admins" value={stats.byRole.admin || 0} color="#f59e0b" />
          <StatCard icon={IconCrown} label="Average Age" value={stats.age.avg} color="#ec4899" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <ChartCard title="Users by Status">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} />
                <Tooltip
                  cursor={false}
                  contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px" }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#d1d5db" }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {statusData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Users by Role">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  labelLine={false}
                  label={({ cx, cy, midAngle, outerRadius, name, percent }) => {
                    const RADIAN = Math.PI / 180
                    const radius = outerRadius + 30
                    const x = cx + radius * Math.cos(-midAngle * RADIAN)
                    const y = cy + radius * Math.sin(-midAngle * RADIAN)
                    return (
                      <text x={x} y={y} fill="#d1d5db" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={13}>
                        {`${name} ${(percent * 100).toFixed(0)}%`}
                      </text>
                    )
                  }}
                >
                  {roleData.map((_, i) => (
                    <Cell key={i} fill={ROLE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px" }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#d1d5db" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="grid grid-cols-2 gap-4 h-[400px] items-center justify-center">
          <ChartCard title="Gender Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={50}
                  paddingAngle={4}
                  dataKey="value"
                  labelLine={false}
                  label={({ cx, cy, midAngle, outerRadius, name, percent }) => {
                    const RADIAN = Math.PI / 180
                    const radius = outerRadius + 30
                    const x = cx + radius * Math.cos(-midAngle * RADIAN)
                    const y = cy + radius * Math.sin(-midAngle * RADIAN)
                    return (
                      <text x={x} y={y} fill="#d1d5db" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={13}>
                        {`${name} ${(percent * 100).toFixed(0)}%`}
                      </text>
                    )
                  }}
                >
                  {genderData.map((_, i) => (
                    <Cell key={i} fill={GENDER_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px" }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#d1d5db" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Age Range">
            <div className="flex items-center justify-center h-[300px]">
              <div className="text-center">
                <p className="text-5xl font-bold text-white mb-2">{stats.age.avg}</p>
                <p className="text-gray-400 text-sm mb-6">Average Age</p>
                <div className="flex gap-8 justify-center">
                  <div>
                    <p className="text-2xl font-semibold text-green-400">{stats.age.min}</p>
                    <p className="text-gray-500 text-xs">Youngest</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-red-400">{stats.age.max}</p>
                    <p className="text-gray-500 text-xs">Oldest</p>
                  </div>
                </div>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </section>
  )
}
