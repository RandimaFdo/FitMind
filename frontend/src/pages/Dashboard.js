import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DashboardSummary } from '../components/dashboard/DashboardSummary';
import { ProgressChart } from '../components/charts/ProgressChart';
import { AICoachCard } from '../components/coach/AICoachCard';
export function Dashboard() {
    return (_jsxs("div", { className: "space-y-8 px-4 py-8", children: [_jsx(DashboardSummary, {}), _jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [_jsx(ProgressChart, {}), _jsx(AICoachCard, {})] })] }));
}
