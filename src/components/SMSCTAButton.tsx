'use client';

import React from 'react';
import { ArrowRight, MessageCircle, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface SMSCTAButtonProps {
  foundCodes: string[];
  isMobile: boolean;
  showQRCode: boolean;
  setShowQRCode: (show: boolean) => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  buttonText?: string;
}

const SMSCTAButton: React.FC<SMSCTAButtonProps> = ({
  foundCodes,
  isMobile,
  showQRCode,
  setShowQRCode,
  variant = 'primary',
  className = '',
  buttonText
}) => {
  const EMILY_PHONE = '+18135551234'; // Replace with actual number

  const getPrefilledMessage = () => {
    const codesCount = foundCodes.length;

    if (codesCount === 0) {
      return "Hi Emily! 🚀 Just saw your Bestie Bookkeepers Halloween app offer! I've been dreaming about having my own app (iOS App Store or custom web)—this feels like my moment! Your BFF app results are amazing. When can we talk about MY app idea? Let's make this happen!";
    }

    if (codesCount < 3) {
      return `Hi Emily! 📱 Found ${foundCodes.join(", ")} on your page and I'm ALL IN! Your BFF app proof-of-concept sold me. I want my own app (still deciding iOS vs web). When can we do a Bestie strategy call to plan mine?`;
    }

    return "Hi Emily! 🏆 BOOM! All 3 codes found + 100% page engagement! I see the ultimate prize (that $99 App Store fee 👀). I'm READY to build my app with Bestie Bookkeepers. When can we start? SO many ideas!";
  };

  const handleCTAClick = () => {
    const message = getPrefilledMessage();
    const smsLink = `sms:${EMILY_PHONE}${isMobile ? '&' : '?'}body=${encodeURIComponent(message)}`;

    if (isMobile) {
      window.location.href = smsLink;
    } else {
      setShowQRCode(true);
    }
  };

  const getButtonText = () => {
    if (buttonText) return buttonText;
    if (foundCodes.length === 3) return "I Found All 3 Codes!";
    if (foundCodes.length > 0) return "Let's Build My App";
    return "Let's Build Your App";
  };

  const baseStyles = "relative overflow-hidden transition-all duration-300 font-bold rounded-full";

  const variantStyles = {
    primary: "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-2xl shadow-pink-500/50 hover:scale-105",
    secondary: "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-2xl shadow-pink-500/50 hover:scale-105",
    outline: "border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
  };

  return (
    <>
      {/* Main CTA Button */}
      <button
        onClick={handleCTAClick}
        className={`${baseStyles} ${variantStyles[variant]} px-10 py-5 text-lg md:text-xl flex items-center justify-center gap-3 group ${className}`}
      >
        {getButtonText()}
        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
      </button>

      {/* Desktop QR Code Modal */}
      {showQRCode && !isMobile && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowQRCode(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl transform animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQRCode(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-gray-900"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <div className="mb-6">
                <div className="inline-block p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4">
                  <MessageCircle className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Text Emily on Your Phone!
                </h3>
                <p className="text-gray-600">
                  Scan this QR code with your phone's camera to open your messaging app
                </p>
              </div>

              {/* QR Code */}
              <div className="bg-gray-100 rounded-xl p-6 mb-6">
                <div className="bg-white rounded-lg p-4 inline-block">
                  <QRCodeSVG
                    value={`sms:${EMILY_PHONE}?body=${encodeURIComponent(getPrefilledMessage())}`}
                    size={256}
                    level="H"
                    includeMargin={true}
                    fgColor="#7c3aed"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-4">Point your phone's camera at the QR code</p>
              </div>

              {/* Pre-filled Message Preview */}
              <div className="bg-purple-50 rounded-lg p-4 text-left">
                <p className="text-xs text-purple-600 font-semibold mb-2">Your pre-filled message:</p>
                <p className="text-sm text-gray-700 italic">"{getPrefilledMessage()}"</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SMSCTAButton;
