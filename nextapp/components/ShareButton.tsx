'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Share2, Link2, MessageSquare, Check, X,
  MessageCircle, Twitter, ExternalLink,
} from 'lucide-react';

interface Props {
  title: string;
  accentColor: string;
  /** نص قصير للاقتباس (highlight) */
  quote?: string;
  /** وصف الحدث للمشاركة الطبيعية */
  description?: string;
}

const ShareButton: React.FC<Props> = ({ title, accentColor, quote, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  /* إغلاق عند النقر خارجاً */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node))
        setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const url = typeof window !== 'undefined' ? window.location.href : '';

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  const ACTIONS = [
    {
      key: 'link',
      icon: <Link2 size={14} />,
      label: 'نسخ الرابط',
      sub: url.length > 40 ? url.slice(0, 40) + '…' : url,
      action: () => copy(url, 'link'),
    },
    {
      key: 'quote',
      icon: <MessageSquare size={14} />,
      label: 'نسخ كاقتباس',
      sub: 'نص + رابط',
      action: () => copy(
        `❝ ${quote || title} ❞\n\n— نور النبوة | ${title}\n${url}`,
        'quote'
      ),
    },
    {
      key: 'twitter',
      icon: <Twitter size={14} />,
      label: 'مشاركة على X',
      sub: 'Twitter / X',
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `${title} — نور النبوة ﷺ\n${url}`
          )}`,
          '_blank'
        );
        setIsOpen(false);
      },
    },
    {
      key: 'whatsapp',
      icon: <MessageCircle size={14} />,
      label: 'مشاركة على واتساب',
      sub: 'WhatsApp',
      action: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(
            `${title} — نور النبوة ﷺ\n${url}`
          )}`,
          '_blank'
        );
        setIsOpen(false);
      },
    },
    ...(navigator.share
      ? [
          {
            key: 'native',
            icon: <ExternalLink size={14} />,
            label: 'مشاركة الصفحة',
            sub: 'تطبيقات الجهاز',
            action: async () => {
              try {
                await navigator.share({ title, text: description ?? quote, url });
              } catch {}
              setIsOpen(false);
            },
          },
        ]
      : []),
  ];

  return (
    <div ref={wrapRef} className="relative" dir="rtl">
      {/* ── زر الفتح ── */}
      <motion.button
        onClick={() => setIsOpen(v => !v)}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-kufi select-none"
        style={{
          color: accentColor,
          border: `1px solid ${accentColor}40`,
          background: isOpen ? `${accentColor}18` : `${accentColor}0d`,
          backdropFilter: 'blur(8px)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Share2 size={13} strokeWidth={1.6} />
        مشاركة
        <motion.svg
          width="9" height="5" viewBox="0 0 9 5" fill="none"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M1 1L4.5 4L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </motion.svg>
      </motion.button>

      {/* ── القائمة المنسدلة ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="share-menu"
            initial={{ opacity: 0, y: -10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.94 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute top-full mt-2.5 right-0 z-50 rounded-2xl overflow-hidden"
            style={{
              minWidth: 'min(230px, calc(100vw - 2rem))',
              maxWidth: 'calc(100vw - 2rem)',
              background: 'rgba(5,11,26,0.98)',
              border: `1px solid ${accentColor}20`,
              backdropFilter: 'blur(20px)',
              boxShadow: `0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px ${accentColor}08`,
            }}
          >
            {/* رأس القائمة */}
            <div
              className="px-4 py-3 flex items-center justify-between"
              style={{ borderBottom: `1px solid ${accentColor}12` }}
            >
              <span className="font-noto text-xs font-bold" style={{ color: accentColor }}>
                خيارات المشاركة
              </span>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="opacity-40 hover:opacity-80 transition-opacity"
                whileTap={{ scale: 0.9 }}
              >
                <X size={13} style={{ color: accentColor }} />
              </motion.button>
            </div>

            {/* خيارات */}
            <div className="p-2 space-y-0.5">
              {ACTIONS.map((act, i) => {
                const done = copiedKey === act.key;
                return (
                  <motion.button
                    key={act.key}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={act.action}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-right font-kufi text-xs transition-colors group"
                    style={{ color: done ? '#34D399' : '#a7a9ac' }}
                    whileHover={{
                      background: `${accentColor}10`,
                      color: done ? '#34D399' : accentColor,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* أيقونة */}
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{
                        background: done ? 'rgba(52,211,153,0.12)' : `${accentColor}12`,
                        color: done ? '#34D399' : `${accentColor}bb`,
                      }}
                    >
                      {done ? <Check size={13} strokeWidth={2.5} /> : act.icon}
                    </span>

                    {/* نص */}
                    <span className="flex-1 flex flex-col items-start gap-0.5">
                      <span className="font-bold" style={{ fontSize: '0.73rem' }}>
                        {done ? 'تم النسخ!' : act.label}
                      </span>
                      <span className="opacity-40" style={{ fontSize: '0.85rem' }}>{act.sub}</span>
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* تذييل */}
            <div
              className="px-4 py-2.5"
              style={{ borderTop: `1px solid ${accentColor}10` }}
            >
              <p className="font-noto text-center opacity-20" style={{ fontSize: '0.82rem', color: accentColor }}>
                نور النبوة — سيرة المصطفى ﷺ
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareButton;
