export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const errorHandler = {
  handleAPIError: (error: any) => {
    if (error.response) {
      // Server responded with error status
      return new AppError(
        error.response.data?.message || "Server error",
        "API_ERROR",
        error.response.status
      );
    } else if (error.request) {
      // Network error
      return new AppError(
        "Network error. Please check your connection.",
        "NETWORK_ERROR"
      );
    } else {
      // Other error
      return new AppError(
        error.message || "An unexpected error occurred",
        "UNKNOWN_ERROR"
      );
    }
  },

  logError: (error: Error, context?: string) => {
    console.error(`[${context || "Error"}]:`, error);
    // In a real app, you might want to send this to a logging service
  },
};
