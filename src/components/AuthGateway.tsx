import React, { useState } from 'react';
import { 
  Shield, 
  Building2, 
  Eye, 
  ArrowRight, 
  Lock, 
  Smartphone, 
  HardHat, 
  Satellite,
  CheckCircle2
} from 'lucide-react';
import { AuthUser } from '../types';
import KhananRakshakLogo from './KhananRakshakLogo';

interface AuthGatewayProps {
  onSelectRole: (user: AuthUser, route: string) => void;
}

export default function AuthGateway({ onSelectRole }: AuthGatewayProps) {
  const [splashData, setSplashData] = useState<{
    user: AuthUser;
    route: string;
    protocol: string;
    step: string;
  } | null>(null);

  const startAuthFlow = (user: AuthUser, route: string, protocol: string) => {
    setSplashData({
      user,
      route,
      protocol,
      step: 'Authenticating token with NIC Parichay 2.0 / MeriPehchaan...'
    });

    // Realistic digital handshake progression
    setTimeout(() => {
      setSplashData(prev => prev ? { ...prev, step: 'Verifying X.509 Digital Signature & Role Credentials...' } : null);
    }, 600);

    setTimeout(() => {
      setSplashData(prev => prev ? { ...prev, step: 'Session Authorized. Redirecting to Command Console...' } : null);
    }, 1100);

    setTimeout(() => {
      onSelectRole(user, route);
    }, 1500);
  };

  const handleGovLogin = () => {
    startAuthFlow({
      role: 'gov',
      name: 'Dr. A. Sharma',
      designation: 'Deputy Director (Surveillance)',
      agency: 'DGMS / Ministry of Coal',
      badgeText: 'Restricted Officer Access (Tier-1)',
      avatarInitials: 'AS'
    }, '/command', 'Parichay 2.0 Enterprise SSO (Govt of India)');
  };

  const handleOperatorLogin = () => {
    startAuthFlow({
      role: 'operator',
      name: 'Eastern Coalfields Ltd (ECL)',
      designation: 'Rajmahal Area Colliery Office',
      agency: 'Eastern Coalfields Limited (CIL)',
      badgeText: 'Regulated Industry Portal (Coal India / Captive)',
      avatarInitials: 'EC'
    }, '/operator', 'MeriPehchaan Industry Leaseholder Gateway');
  };

  const handleOfficerLogin = () => {
    startAuthFlow({
      role: 'officer',
      name: 'Er. Vikram Sengupta',
      designation: 'Senior Safety Officer (First Class Mgr #9041)',
      agency: 'DGMS / ECL Rajmahal Field Station',
      badgeText: 'Colliery Field Safety & CAPA Station',
      avatarInitials: 'VS',
      colliery: 'Rajmahal OCP'
    }, '/officer', 'DGMS Colliery Field Officer Gateway');
  };

  const handleLabourLogin = () => {
    startAuthFlow({
      role: 'labour',
      name: 'Ramesh Soren',
      designation: 'Drill & Heavy Equipment Operator',
      agency: 'Rajmahal Area Colliery Worker Desk',
      badgeText: 'Labour Mobile App & Offline Geofence',
      avatarInitials: 'RS',
      workerId: 'WKR-8812',
      colliery: 'Rajmahal OCP'
    }, '/labour', 'e-Shramik Parichay Geofence Auth');
  };

  const handleCitizenLogin = () => {
    startAuthFlow({
      role: 'citizen',
      name: 'Citizen Observer',
      designation: 'Khanan Prahari Integrated Citizen Desk',
      agency: 'Public Environmental Vigilance',
      badgeText: 'Citizen Public Grievance',
      avatarInitials: 'KP'
    }, '/citizen', 'Jan Parichay / e-Pramaan Mobile OTP');
  };

  const portals = [
    {
      id: 'gov',
      title: 'Government & Regulator',
      badge: 'DGMS / MoC Command',
      icon: Satellite,
      desc: 'Real-time radar satellite surveillance, boundary AI audits & statutory show-cause notices.',
      persona: 'Dr. A. Sharma · Deputy Director (Surveillance)',
      accentBorder: 'border-cyan-500/30 hover:border-cyan-400 group-hover:shadow-[0_0_24px_rgba(6,182,212,0.22)]',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30',
      badgeBg: 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30',
      btnBg: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500',
      handler: handleGovLogin,
      btnId: 'btn-login-gov'
    },
    {
      id: 'officer',
      title: 'Mine Officer Portal',
      badge: 'Safety, CV & Inspections',
      icon: HardHat,
      desc: 'Live pit CCTV PPE computer vision, environmental gas telemetry & instant CAPA dispatch.',
      persona: 'Er. V. Sengupta · Senior Safety Officer (First Class)',
      accentBorder: 'border-amber-500/30 hover:border-amber-400 group-hover:shadow-[0_0_24px_rgba(245,158,11,0.22)]',
      iconBg: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
      badgeBg: 'bg-amber-500/10 text-amber-300 border border-amber-500/30',
      btnBg: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500',
      handler: handleOfficerLogin,
      btnId: 'btn-login-officer'
    },
    {
      id: 'labour',
      title: 'Labour Mobile Portal',
      badge: 'Shift Attendance & Near-Miss',
      icon: Smartphone,
      desc: 'Offline subterranean shift check-in, bilingual voice memos & near-miss hazard reports.',
      persona: 'Ramesh Soren · Excavator Operator (WKR-8812)',
      accentBorder: 'border-emerald-500/30 hover:border-emerald-400 group-hover:shadow-[0_0_24px_rgba(16,185,129,0.22)]',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
      badgeBg: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30',
      btnBg: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500',
      handler: handleLabourLogin,
      btnId: 'btn-login-labour'
    },
    {
      id: 'operator',
      title: 'Colliery Operator Desk',
      badge: 'ECL / Compliance & SCN',
      icon: Building2,
      desc: 'Statutory SCN clarification replies, DGPS lease boundary overlays & compliance filings.',
      persona: 'Rajmahal Colliery Office · Eastern Coalfields Ltd',
      accentBorder: 'border-blue-500/30 hover:border-blue-400 group-hover:shadow-[0_0_24px_rgba(59,130,246,0.22)]',
      iconBg: 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
      badgeBg: 'bg-blue-500/10 text-blue-300 border border-blue-500/30',
      btnBg: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500',
      handler: handleOperatorLogin,
      btnId: 'btn-login-operator'
    },
    {
      id: 'citizen',
      title: 'Citizen Vigilance',
      badge: 'Khanan Prahari Complaints',
      icon: Eye,
      desc: 'Geotagged community reporting of unauthorized mining, dust pollution & blasting tremors.',
      persona: 'Citizen Environmental Desk · Aadhaar / Mobile OTP',
      accentBorder: 'border-teal-500/30 hover:border-teal-400 group-hover:shadow-[0_0_24px_rgba(20,184,166,0.22)]',
      iconBg: 'bg-teal-500/10 text-teal-400 border border-teal-500/30',
      badgeBg: 'bg-teal-500/10 text-teal-300 border border-teal-500/30',
      btnBg: 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500',
      handler: handleCitizenLogin,
      btnId: 'btn-login-citizen'
    }
  ];

  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#081225] via-[#060D1A] to-[#03060C] text-slate-100 flex flex-col justify-between p-4 md:p-6 overflow-hidden select-none">
      {/* Subtle National Tricolor Accent Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 grid grid-cols-3 z-30">
        <div className="bg-[#FF9933]" />
        <div className="bg-[#FFFFFF]" />
        <div className="bg-[#138808]" />
      </div>

      {/* 1. TOP HEADER: Compact official emblem with logo, title & subtle NIC trust banner */}
      <header className="shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        {/* Left: Emblem, Title & SIH26024 Tag */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <KhananRakshakLogo className="h-10 w-10 md:h-11 md:w-11" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white truncate">
                K | AI-Based Smart Governance &amp; Compliance System
              </h1>
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border border-cyan-500/40 shrink-0">
                SIH26024
              </span>
            </div>
            <div className="text-xs text-slate-400 font-medium truncate flex items-center gap-2">
              <span>कोयला मंत्रालय &bull; Ministry of Coal</span>
              <span className="text-slate-600">&bull;</span>
              <span>Directorate General of Mines Safety (DGMS)</span>
            </div>
          </div>
        </div>

        {/* Right: Subtle National Informatics Centre / Parichay SSO Trust Banner */}
        <div className="shrink-0 flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold text-slate-200">National Informatics Centre (NIC)</span>
          </div>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span className="text-slate-400 hidden md:inline">Parichay 2.0 SSO Verified &bull; TLS 1.3</span>
        </div>
      </header>

      {/* 2. 5-PORTAL CARD GRID (Single Screen Fit, Zero Scroll) */}
      <main className="flex-1 flex flex-col justify-center my-auto py-2 min-h-0">
        <div className="mb-2.5 text-center md:text-left flex items-center justify-between">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Select Authorized Access Tier
            </h2>
            <p className="text-xs text-slate-400">
              Role-governed single sign-on with cryptographic credentials and digital identity verification.
            </p>
          </div>
          <span className="hidden lg:inline-block text-[11px] text-slate-400 font-mono bg-slate-900/80 border border-slate-800 px-2.5 py-1 rounded">
            Node: NIC-DEL-CLUST-04 &bull; MeghRaj Cloud
          </span>
        </div>

        {/* 5-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 lg:gap-3.5 h-[62vh] max-h-[460px] min-h-[320px]">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <div
                key={portal.id}
                className={`group relative bg-[#0C192E]/90 hover:bg-[#0F213E] border rounded-xl p-4 flex flex-col justify-between transition-all duration-300 shadow-lg ${portal.accentBorder}`}
              >
                {/* Top: Icon & Badge */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${portal.iconBg}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider truncate max-w-[135px] ${portal.badgeBg}`}>
                      {portal.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm lg:text-base font-bold text-white tracking-tight leading-snug group-hover:text-cyan-200 transition-colors">
                    {portal.title}
                  </h3>

                  {/* 1-Line Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mt-1.5 line-clamp-3">
                    {portal.desc}
                  </p>
                </div>

                {/* Bottom: Persona preview & CTA button */}
                <div className="pt-2 border-t border-slate-800/70 space-y-2.5">
                  <div className="text-[10px] text-slate-400 bg-slate-900/80 border border-slate-800/90 rounded px-2 py-1 truncate">
                    <span className="text-slate-500 font-mono mr-1">Auth:</span>
                    <span className="text-slate-300 font-medium">{portal.persona}</span>
                  </div>

                  <button
                    id={portal.btnId}
                    onClick={portal.handler}
                    className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer ${portal.btnBg}`}
                  >
                    <span>Access Portal</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* 3. MINIMALIST SINGLE-LINE COMPACT FOOTER */}
      <footer className="shrink-0 pt-2.5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="text-slate-300 font-medium">
            Ministry of Coal &bull; Directorate General of Mines Safety (DGMS) &bull; SIH26024 Compliance Architecture
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-500 text-[10px]">
          <span>GIGW 2.0 &bull; STQC Audited</span>
          <span>&bull;</span>
          <span>&copy; {new Date().getFullYear()} Govt. of India</span>
        </div>
      </footer>

      {/* Parichay / MeriPehchaan Auth Splash Screen Modal */}
      {splashData && (
        <div className="fixed inset-0 z-50 bg-[#06101E]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border-2 border-[#0B2545] rounded-xl shadow-2xl max-w-md w-full overflow-hidden text-center animate-in zoom-in-95 duration-200">
            {/* Top Tricolor Strip */}
            <div className="h-1.5 w-full grid grid-cols-3">
              <div className="bg-[#FF9933]" />
              <div className="bg-[#FFFFFF]" />
              <div className="bg-[#138808]" />
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              {/* Central Badge of the Parichay / MeriPehchaan Auth Splash Screen */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative inline-flex items-center justify-center p-1 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-400 to-emerald-400 shadow-[0_0_24px_rgba(6,182,212,0.4)]">
                  <div className="bg-[#0A192F] p-1 rounded-full flex items-center justify-center">
                    <KhananRakshakLogo className="h-16 w-16" />
                  </div>
                </div>

                <div className="mt-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block">
                    National Single Sign-On (SSO)
                  </span>
                  <h3 className="text-xl font-black text-[#0B2545] tracking-tight">
                    मेरी पहचान &bull; MeriPehchaan
                  </h3>
                  <div className="text-xs font-semibold text-blue-700">
                    Parichay 2.0 Identity Gateway &bull; NIC
                  </div>
                </div>
              </div>

              {/* Target Platform Banner */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-left space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Accessing Platform</span>
                  <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                    SIH26024
                  </span>
                </div>
                <div className="font-bold text-sm text-slate-900">
                  KhananRakshak AI (K-AI)
                </div>
                <div className="text-[11px] text-slate-600 leading-snug">
                  AI-Powered Smart Governance &amp; Satellite Surveillance System for Coal Mines
                </div>
              </div>

              {/* Active Officer / Identity Card */}
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-left text-xs space-y-1">
                <div className="text-[10px] uppercase font-bold text-blue-900">
                  Verified Identity Profile
                </div>
                <div className="font-bold text-slate-900 text-sm">
                  {splashData.user.name}
                </div>
                <div className="text-slate-600 text-[11px]">
                  {splashData.user.designation}
                </div>
                <div className="text-[10px] font-mono text-slate-500 truncate">
                  Protocol: {splashData.protocol}
                </div>
              </div>

              {/* Dynamic Status Progression Bar */}
              <div className="space-y-2 text-left">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span>
                    <span className="font-medium text-slate-700">{splashData.step}</span>
                  </span>
                  <span className="font-mono text-slate-400 text-[10px]">TLS 1.3</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 animate-pulse rounded-full w-full" />
                </div>
              </div>

              {/* Immediate Proceed Action */}
              <button
                onClick={() => onSelectRole(splashData.user, splashData.route)}
                className="w-full py-2.5 bg-[#0B2545] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Authorize &amp; Launch Console</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
