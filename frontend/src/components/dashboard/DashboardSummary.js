import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const cards = [
    { label: 'Calories', value: '1,840 kcal', detail: '+8% vs last week' },
    { label: 'Streak', value: '12 days', detail: '+4 days' },
    { label: 'Readiness', value: '82%', detail: 'Optimal range' },
];
export function DashboardSummary() {
    return (_jsx("div", { className: "grid gap-4 md:grid-cols-3", children: cards.map((card) => (_jsxs("article", { className: "rounded-3xl bg-slate-900 p-6 text-white shadow-glow", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-slate-400", children: card.label }), _jsx("p", { className: "mt-3 text-3xl font-semibold", children: card.value }), _jsx("p", { className: "text-sm text-emerald-300", children: card.detail })] }, card.label))) }));
}
