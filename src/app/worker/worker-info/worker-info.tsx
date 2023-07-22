export const WorkerInfo = () => {
  return (
    <div className="w-full max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <img
        className="object-cover w-full h-20"
        src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        alt="avatar"
      />

      <div className="py-5 text-center">
        <a
          href="#"
          className="block text-xl font-bold text-gray-800 dark:text-white"
          tabIndex={0}
          role="link"
        >
          John Doe
        </a>
        <span className="text-sm text-gray-700 dark:text-gray-200">
          Software Engineer
        </span>
      </div>
    </div>
  );
};
