interface ErrorMessageProps {
  error: { status?: number } | null;
  getErrorMessage: () => string;
}

export const ErrorMessage = ({ error, getErrorMessage }: ErrorMessageProps) => {
  if (!error) return null;

  const isNotFoundError = error.status === 404;
  
  return (
    <div className={`mt-2 p-2 border rounded-lg ${
      isNotFoundError 
        ? "text-amber-800 bg-amber-50 border-amber-200" 
        : "text-red-700 bg-red-50 border-red-200"
    }`}>
      <div className="flex items-center gap-1.5">
        <div className={`w-1.5 h-1.5 rounded-full ${
          isNotFoundError ? "bg-amber-500" : "bg-red-500"
        }`}></div>
        <span className="font-medium text-sm">{getErrorMessage()}</span>
      </div>
    </div>
  );
}; 