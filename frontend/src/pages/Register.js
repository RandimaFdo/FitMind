import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
function createDemoToken(email) {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
        sub: email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
    }));
    return `${header}.${payload}.demo`;
}
export function Register() {
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm();
    const redirectPath = useMemo(() => {
        const fromState = location.state;
        return fromState?.from?.pathname ?? '/';
    }, [location.state]);
    const onSubmit = handleSubmit(async (values) => {
        localStorage.setItem('fitmind_token', createDemoToken(values.email));
        await new Promise((resolve) => setTimeout(resolve, 600));
        navigate(redirectPath, { replace: true });
    });
    return (_jsx("main", { className: "flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-white", children: _jsxs("section", { className: "w-full max-w-md space-y-8 rounded-3xl bg-slate-900/70 p-10 shadow-glow", children: [_jsxs("header", { className: "space-y-3 text-center", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-slate-400", children: "FitMind" }), _jsx("h1", { className: "text-3xl font-semibold", children: "Create your account" }), _jsx("p", { className: "text-sm text-slate-300", children: "Start tracking your readiness insights." })] }), _jsxs("form", { className: "space-y-5", onSubmit: onSubmit, children: [_jsxs("label", { className: "block text-sm", children: ["Full name", _jsx("input", { type: "text", className: "mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 focus:border-brand-aqua focus:outline-none", placeholder: "Avery Lee", ...register('name', { required: 'Name is required' }) }), errors.name && _jsx("span", { className: "mt-1 block text-xs text-rose-400", children: errors.name.message })] }), _jsxs("label", { className: "block text-sm", children: ["Email", _jsx("input", { type: "email", className: "mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 focus:border-brand-aqua focus:outline-none", placeholder: "you@fitmind.io", ...register('email', { required: 'Email is required' }) }), errors.email && _jsx("span", { className: "mt-1 block text-xs text-rose-400", children: errors.email.message })] }), _jsxs("label", { className: "block text-sm", children: ["Password", _jsx("input", { type: "password", className: "mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 focus:border-brand-aqua focus:outline-none", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", ...register('password', { required: 'Password is required', minLength: 6 }) }), errors.password && (_jsx("span", { className: "mt-1 block text-xs text-rose-400", children: "Password must be at least 6 characters" }))] }), _jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full rounded-2xl bg-brand-aqua/80 py-3 text-sm font-semibold text-white transition hover:bg-brand-aqua disabled:opacity-70", children: isSubmitting ? 'Creating account…' : 'Create account' })] }), _jsxs("p", { className: "text-center text-sm text-slate-300", children: ["Already have an account?", ' ', _jsx(Link, { to: "/login", className: "text-brand-neon hover:text-brand-aqua", children: "Sign in" })] })] }) }));
}
