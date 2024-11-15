export default function AuthBackground() {
  return (
    <>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234B5563' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 left-1/4 w-24 h-24 bg-blue-200/20 rounded-full blur-2xl" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-indigo-200/20 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-purple-200/20 rounded-full blur-2xl" />
      </div>
    </>
  );
}
