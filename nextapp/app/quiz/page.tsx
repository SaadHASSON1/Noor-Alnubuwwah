import type { Metadata } from 'next';
import QuizPage from '@/pages-src/QuizPage';

export const metadata: Metadata = { title: 'اختبار السيرة النبوية التفاعلي' };

export default function Page() {
  return <QuizPage />;
}
