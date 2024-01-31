import React, { useEffect } from 'react';
import { useToast } from "../providers/toastProvider";

const Toast = () => {
  const { toasts, hideToast } = useToast();

  useEffect(() => {
    const timeoutIds = [];

    toasts.forEach((toast) => {
      const timeoutId = setTimeout(() => {
        hideToast(toast.id);
      }, 3000); // Hide the toast after 3 seconds

      timeoutIds.push(timeoutId);
    });
    console.log(toasts)
    return () => {
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [toasts, hideToast]);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col ">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`bg-red text-white p-4 mb-2 rounded-md  inline-flex`}
        >
          <p>{toast.message}</p>
          <button className="mr-4 focus:outline-none" onClick={() => hideToast(toast.id)}>
            &#10006;
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
