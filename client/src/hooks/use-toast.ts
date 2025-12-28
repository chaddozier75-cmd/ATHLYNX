import { toast as sonnerToast } from "sonner";

export const useToast = () => {
  return {
    toast: (props: { title?: string; description?: string; variant?: "default" | "destructive" }) => {
      if (props.variant === "destructive") {
        sonnerToast.error(props.title || "Error", {
          description: props.description,
        });
      } else {
        sonnerToast.success(props.title || "Success", {
          description: props.description,
        });
      }
    },
  };
};
