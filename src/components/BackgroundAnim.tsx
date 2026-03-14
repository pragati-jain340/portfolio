export default function BackgroundAnim() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/20 dark:bg-primary/10 blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 dark:bg-dark-primary/10 blur-[150px]"></div>
      <div className="absolute top-[40%] left-[60%] w-[30vw] h-[30vw] rounded-full bg-primary/20 dark:bg-dark-primary/10 blur-[120px]"></div>
    </div>
  );
}
