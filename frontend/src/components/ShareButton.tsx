import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Check } from 'lucide-react';

interface Props {
  title: string;
  accentColor: string;
}

const ShareButton: React.FC<Props> = ({ title, accentColor }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <motion.button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-kufi"
      style={{
        color: accentColor,
        border: `1px solid ${accentColor}35`,
        background: `${accentColor}0d`,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="done"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center gap-1.5"
          >
            <Check size={13} strokeWidth={2.5} />
            تم النسخ
          </motion.span>
        ) : (
          <motion.span
            key="share"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center gap-1.5"
          >
            <Share2 size={13} strokeWidth={1.5} />
            مشاركة
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ShareButton;
