import React, { useState } from 'react';
import { 
  Shield, 
  Building2, 
  Users, 
  ArrowRight, 
  Lock, 
  FileCheck, 
  KeyRound, 
  Smartphone, 
  ExternalLink,
  Info,
  CheckCircle2
} from 'lucide-react';
import { AuthUser } from '../types';

interface AuthGatewayProps {
  onSelectRole: (user: AuthUser, route: string) => void;
}

export default function AuthGateway({ onSelectRole }: AuthGatewayProps) {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'small'>('normal');

  const handleGovLogin = () => {
    onSelectRole({
      role: 'gov',
      name: 'Dr. A. Sharma',
      designation: 'Deputy Director (Surveillance)',
      agency: 'DGMS / Ministry of Coal',
      badgeText: 'Restricted Officer Access (Tier-1)',
      avatarInitials: 'AS'
    }, '/command');
  };

  const handleOperatorLogin = () => {
    onSelectRole({
      role: 'operator',
      name: 'Eastern Coalfields Ltd (ECL)',
      designation: 'Rajmahal Area Colliery Office',
      agency: 'Eastern Coalfields Limited (CIL)',
      badgeText: 'Regulated Industry Portal (Coal India / Captive)',
      avatarInitials: 'EC'
    }, '/operator');
  };

  const handleCitizenLogin = () => {
    onSelectRole({
      role: 'citizen',
      name: 'Citizen Observer',
      designation: 'Khanan Prahari Integrated Citizen Desk',
      agency: 'Public Environmental Vigilance',
      badgeText: 'Citizen Public Grievance',
      avatarInitials: 'KP'
    }, '/citizen');
  };

  return (
    <div className={`min-h-screen bg-[#F1F5F9] text-slate-800 flex flex-col justify-between font-sans ${fontSize === 'large' ? 'text-base' : fontSize === 'small' ? 'text-xs' : 'text-sm'}`}>
      {/* 1. OFFICIAL TOP HEADER BAR */}
      <header className="bg-white border-b border-[#CBD5E1] shadow-xs">
        {/* National Tricolor Subtle Bar (Saffron, White, Green thin line) */}
        <div className="h-1 w-full grid grid-cols-3">
          <div className="bg-[#FF9933]" />
          <div className="bg-[#FFFFFF] border-y border-slate-100" />
          <div className="bg-[#138808]" />
        </div>

        {/* Top Accessibility & Language Strip */}
        <div className="bg-[#0B2545] text-slate-200 text-xs px-4 sm:px-8 py-1.5 flex flex-wrap items-center justify-between border-b border-blue-950 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-300 font-medium tracking-wide">
              भारत सरकार | Government of India
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-[11px] text-amber-300 font-medium">
              Single Sign-On (SSO) Portal &bull; MeriPehchaan Integrated
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-300 hover:text-white cursor-pointer transition-colors">
              Screen Reader Access
            </span>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setFontSize('small')} 
                className={`px-1 rounded ${fontSize === 'small' ? 'bg-blue-800 text-white font-bold' : 'text-slate-300 hover:text-white'}`}
                title="Decrease font size"
              >
                A-
              </button>
              <button 
                onClick={() => setFontSize('normal')} 
                className={`px-1 rounded ${fontSize === 'normal' ? 'bg-blue-800 text-white font-bold' : 'text-slate-300 hover:text-white'}`}
                title="Default font size"
              >
                A
              </button>
              <button 
                onClick={() => setFontSize('large')} 
                className={`px-1 rounded ${fontSize === 'large' ? 'bg-blue-800 text-white font-bold' : 'text-slate-300 hover:text-white'}`}
                title="Increase font size"
              >
                A+
              </button>
            </div>
            <span className="text-slate-600">|</span>
            <span className="font-semibold text-white">Language: English (EN)</span>
          </div>
        </div>

        {/* Main Ministry Header Strip */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-left">
            {/* National Emblem Representation */}
            <div className="flex flex-col items-center justify-center pr-4 border-r border-slate-300">
              <div className="text-[#0B2545] font-serif font-bold text-center leading-none">
                <div className="text-[18px] tracking-tight">सत्यमेव जयते</div>
                <div className="text-[9px] text-slate-600 tracking-wider font-sans mt-0.5 uppercase">Govt. of India</div>
              </div>
            </div>

            {/* Ministry Titles */}
            <div>
              <div className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">
                कोयला मंत्रालय &bull; Ministry of Coal
              </div>
              <div className="text-lg sm:text-xl font-bold text-[#0B2545] tracking-tight flex items-center gap-2">
                <span>CoalGuard AI &bull; National Mine Surveillance &amp; Compliance Portal</span>
              </div>
              <div className="text-xs text-slate-500">
                Directorate General of Mines Safety (DGMS) &bull; Integrated Statutory Gateway
              </div>
            </div>
          </div>

          {/* Right Status / Security Badge */}
          <div className="hidden lg:flex flex-col items-end text-right border-l border-slate-200 pl-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0B2545]">
              <Lock className="w-3.5 h-3.5 text-emerald-700" />
              <span>National SSO &bull; Parichay 2.0</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Secure TLS 1.3 &bull; NIC Certificate Authority
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              Portal Ver: 4.2.1-NIC-MOC
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN CENTER CONTENT AREA */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Notice & Instructions Banner */}
        <div className="bg-white border border-[#CBD5E1] rounded-sm p-4 shadow-2xs flex items-start gap-3 text-xs text-slate-700">
          <Info className="w-4 h-4 text-[#0B2545] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-[#0B2545]">Official Advisory for Authorized Users:</span>
            <p className="text-slate-600 leading-relaxed">
              This is a secure Government of India regulatory platform under Section 70 of the Information Technology Act 2000 and Regulation 109 of the Coal Mines Regulations 2017. All satellite analysis, DGPS boundary coordinates, and statutory notice filings are digitally signed and legally binding. Unauthorized access is strictly prohibited and subject to penal action under the Indian Penal Code.
            </p>
          </div>
        </div>

        {/* Section Heading */}
        <div className="border-b border-[#CBD5E1] pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#0B2545]">
              Select Authorized Access Tier / Single Sign-On Gateway
            </h2>
            <p className="text-xs text-slate-500">
              Please choose your designated organizational portal to proceed with digital identity verification.
            </p>
          </div>
          <span className="text-[11px] text-slate-500 bg-slate-200/80 px-2.5 py-1 rounded-sm font-mono self-start sm:self-auto border border-slate-300">
            Node: NIC-DEL-CLUST-04
          </span>
        </div>

        {/* 3. AUTHENTIC 3-TIER ENTERPRISE LOGIN GRID (Horizontal Clean Cards) */}
        <div className="space-y-4">
          {/* ========================================================================= */}
          {/* PANEL 1: DIRECTORATE OF MINES SAFETY & SURVEILLANCE (DGMS / MoC)          */}
          {/* ========================================================================= */}
          <div className="bg-white border border-[#CBD5E1] rounded-sm p-5 sm:p-6 shadow-2xs hover:border-[#0B2545] transition-all">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              {/* Left Column: Department Info, Scope & Identity */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="w-8 h-8 rounded-sm bg-[#0B2545] text-white flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0B2545] leading-tight">
                      Directorate of Mines Safety &amp; Surveillance (DGMS / MoC)
                    </h3>
                    <div className="text-xs text-slate-500">
                      Ministry of Coal &bull; Central Mine Vigilance Command
                    </div>
                  </div>
                  <span className="ml-auto lg:ml-2 text-[11px] font-bold text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-sm">
                    Restricted Officer Access (Tier-1)
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  Geospatial radar, statutory notice issuance, and multi-source evidence auditing.
                </p>

                {/* Authorized Officer Identity Pill */}
                <div className="bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-xs flex items-center gap-2.5 max-w-md">
                  <div className="w-6 h-6 rounded-sm bg-[#0B2545] text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                    AS
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[#0B2545] truncate">
                      Dr. A. Sharma &bull; Deputy Director (Surveillance)
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      DGMS Headquarters, Dhanbad &bull; Ministry Clearance ID: MOC-DIR-8814
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Action Button & Protocols */}
              <div className="lg:w-80 shrink-0 lg:border-l lg:border-slate-200 lg:pl-6 flex flex-col justify-center space-y-2.5">
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-slate-400" />
                  <span>Protocol: MeriPehchaan (Parichay SSO / e-Gov)</span>
                </div>
                <button
                  id="btn-login-gov"
                  onClick={handleGovLogin}
                  className="w-full bg-[#0B2545] hover:bg-[#133A6B] text-white font-semibold text-xs py-3 px-4 rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs border border-[#0B2545]"
                >
                  <span>Authenticate via Parichay / MeriPehchaan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-[10px] text-slate-400 text-center">
                  Requires 2FA / Gov Authenticator Token
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PANEL 2: COLLIERY MANAGEMENT & LEASE OPERATORS                            */}
          {/* ========================================================================= */}
          <div className="bg-white border border-[#CBD5E1] rounded-sm p-5 sm:p-6 shadow-2xs hover:border-[#0B2545] transition-all">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              {/* Left Column: Department Info, Scope & Identity */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="w-8 h-8 rounded-sm bg-slate-700 text-white flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0B2545] leading-tight">
                      Colliery Management &amp; Lease Operators
                    </h3>
                    <div className="text-xs text-slate-500">
                      Eastern Coalfields Limited / Coal India Subsidiaries &amp; Captive Blocks
                    </div>
                  </div>
                  <span className="ml-auto lg:ml-2 text-[11px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-sm">
                    Regulated Industry Portal (Coal India / Captive)
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  Statutory show-cause notice desk, DGPS survey uploads, and clearance compliance logs.
                </p>

                {/* Authorized Operator Identity Pill */}
                <div className="bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-xs flex items-center gap-2.5 max-w-md">
                  <div className="w-6 h-6 rounded-sm bg-amber-800 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                    ECL
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[#0B2545] truncate">
                      Eastern Coalfields Ltd (ECL) &bull; Rajmahal Area Colliery Office
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      Agent &amp; Chief Mining Surveyor Desk &bull; CIL ID: ECL-RJM-OP-04
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Action Button & Protocols */}
              <div className="lg:w-80 shrink-0 lg:border-l lg:border-slate-200 lg:pl-6 flex flex-col justify-center space-y-2.5">
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Protocol: Class-3 Digital Signature Certificate (DSC)</span>
                </div>
                <button
                  id="btn-login-operator"
                  onClick={handleOperatorLogin}
                  className="w-full bg-white hover:bg-slate-50 text-[#0B2545] font-semibold text-xs py-3 px-4 rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs border-2 border-[#0B2545]"
                >
                  <span>Operator Login (Digital Signature / DSC)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-[10px] text-slate-400 text-center">
                  USB Token or e-Sign with e-Mudhra / NSDL
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PANEL 3: PUBLIC ENVIRONMENTAL VIGILANCE (KHANAN PRAHARI INTEGRATED)        */}
          {/* ========================================================================= */}
          <div className="bg-white border border-[#CBD5E1] rounded-sm p-5 sm:p-6 shadow-2xs hover:border-emerald-700 transition-all">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              {/* Left Column: Department Info, Scope & Identity */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="w-8 h-8 rounded-sm bg-emerald-700 text-white flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0B2545] leading-tight">
                      Public Environmental Vigilance (Khanan Prahari Integrated)
                    </h3>
                    <div className="text-xs text-slate-500">
                      Citizen Grievance &amp; Community Geotagged Observation Desk
                    </div>
                  </div>
                  <span className="ml-auto lg:ml-2 text-[11px] font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-sm">
                    Citizen Public Grievance
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  Lodge geotagged observations regarding boundary encroachment, dust dispersion, or blasting.
                </p>

                {/* Citizen Identity Pill */}
                <div className="bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-xs flex items-center gap-2.5 max-w-md">
                  <div className="w-6 h-6 rounded-sm bg-emerald-800 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                    KP
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[#0B2545] truncate">
                      Citizen Environmental Desk &bull; Khanan Prahari Network
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      Open Citizen Channel &bull; Aadhaar / Mobile OTP Verified
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Action Button & Protocols */}
              <div className="lg:w-80 shrink-0 lg:border-l lg:border-slate-200 lg:pl-6 flex flex-col justify-center space-y-2.5">
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Protocol: e-Pramaan / Jan Parichay Mobile OTP</span>
                </div>
                <button
                  id="btn-login-citizen"
                  onClick={handleCitizenLogin}
                  className="w-full bg-[#138808] hover:bg-[#0f6b06] text-white font-semibold text-xs py-3 px-4 rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs border border-[#138808]"
                >
                  <span>Proceed with Mobile OTP / e-Pramaan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-[10px] text-slate-400 text-center">
                  Instant Access &bull; No Prior Registration Needed
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informational Verification Note */}
        <div className="p-4 bg-slate-100 border border-slate-200 rounded-sm text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              All authentications are logged with IP, timestamp, and digital identity for regulatory audit under CCoM / DGMS.
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-500 shrink-0">
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span>&bull;</span>
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span>&bull;</span>
            <span className="hover:underline cursor-pointer">Helpdesk: 1800-11-2026</span>
          </div>
        </div>
      </main>

      {/* 4. OFFICIAL FOOTER */}
      <footer className="bg-[#0B2545] text-slate-300 text-xs border-t-2 border-[#138808] mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            <div className="space-y-1">
              <p className="font-semibold text-white">
                Designed and Developed for Ministry of Coal &bull; Hosted by National Informatics Centre (NIC)
              </p>
              <p className="text-slate-400 text-[11px]">
                Content Owned and Maintained by Directorate General of Mines Surveillance.
              </p>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <div className="bg-blue-950 border border-blue-900 px-3 py-1.5 rounded-sm text-center">
                <div className="font-bold text-white text-[10px]">NIC CLOUD</div>
                <div className="text-[9px] text-slate-400">MeghRaj Certified</div>
              </div>
              <div className="bg-blue-950 border border-blue-900 px-3 py-1.5 rounded-sm text-center">
                <div className="font-bold text-white text-[10px]">STQC AUDITED</div>
                <div className="text-[9px] text-slate-400">GIGW 2.0 Compliant</div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} Ministry of Coal, Government of India. All Rights Reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Last Updated: 02 Sep 2026</span>
              <span>&bull;</span>
              <span>Best viewed in Chrome 90+, Firefox 88+, Edge 90+ (1366x768 or higher)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
