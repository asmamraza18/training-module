import { toast } from "sonner";

// Utility for success toasts
export const successToast = (title: string, description?: string) => {
  toast.success(title, {
    description,
    duration: 3000,
    position: "top-right",
  });
};

// Utility for error toasts
export const errorToast = (title: string, description?: string) => {
  toast.error(title, {
    description,
    duration: 3000,
    position: "top-right",
  });
};

// Utility for warning toasts
export const warningToast = (title: string, description?: string) => {
  toast.warning(title, {
    description,
    duration: 3000,
    position: "top-right",
  });
};

// Utility for informational toasts
export const infoToast = (title: string, description?: string) => {
  toast.info(title, {
    description,
    duration: 3000,
    position: "top-right",
  });
};
