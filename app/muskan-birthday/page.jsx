export const metadata = {
  title: 'Happy Birthday Muskan 🎉',
  description: 'A little birthday surprise page for Muskan.',
  robots: { index: false, follow: false },
};

export default function MuskanBirthdayPage() {
  return (
    <iframe
      src="/muskan-birthday/index.html"
      title="Happy Birthday Muskan"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        border: 'none',
      }}
      allow="autoplay"
    />
  );
}
