import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
const data = [
    { week: 'W1', weight: 75, readiness: 68 },
    { week: 'W2', weight: 74, readiness: 72 },
    { week: 'W3', weight: 73, readiness: 79 },
    { week: 'W4', weight: 72, readiness: 82 },
];
export function ProgressChart() {
    return (_jsxs("article", { className: "rounded-3xl bg-slate-900 p-6 text-white", children: [_jsx("h3", { className: "text-xl font-semibold", children: "Progress Trends" }), _jsx(ResponsiveContainer, { width: "100%", height: 280, children: _jsxs(LineChart, { data: data, children: [_jsx(XAxis, { dataKey: "week", stroke: "#94a3b8" }), _jsx(YAxis, { stroke: "#94a3b8" }), _jsx(Tooltip, { contentStyle: { background: '#0f172a', border: '1px solid #1f2937' } }), _jsx(Line, { type: "monotone", dataKey: "weight", stroke: "#34d399", strokeWidth: 2, dot: false }), _jsx(Line, { type: "monotone", dataKey: "readiness", stroke: "#60a5fa", strokeWidth: 2, dot: false })] }) })] }));
}
