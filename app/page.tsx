import Header from '@/components/header';
import Content from '@/components/content'
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="bg-white flex min-h-screen flex-col items-center justify-between">
      <Header />
      <Content />
      <Footer />
    </main>
  );
}
