interface ErrorMessageProps {
  error: { status?: number } | null;
  getErrorMessage: () => string;
}

export const ErrorMessage = ({ error, getErrorMessage }: ErrorMessageProps) => {
  if (!error) return null;

  const isNotFoundError = error.status === 404;
  
  return (
    <div className={`mt-4 p-3 border rounded ${
      isNotFoundError 
        ? "text-yellow-800 bg-yellow-50 border-yellow-200" 
        : "text-red-500 bg-red-50 border-red-200"
    }`}>
      {getErrorMessage()}
    </div>
  );
}; 