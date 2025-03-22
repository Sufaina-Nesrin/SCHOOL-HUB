import { toast } from "react-toastify";
import { alertConstants } from "../constants/alertConstants"

function getPosition(placement) {
  const defaultPosition = toast?.POSITION?.TOP_CENTER || "top-center"; // Fallback for undefined
  let position = defaultPosition;
  switch (placement) {
    case "top-center":
      position = toast?.POSITION?.TOP_CENTER || "top-center";
      break;
    case "top-left":
      position = toast?.POSITION?.TOP_LEFT || "top-left";
      break;
    case "top-right":
      position = toast?.POSITION?.TOP_RIGHT || "top-right";
      break;
    case "bottom-left":
      position = toast?.POSITION?.BOTTOM_LEFT || "bottom-left";
      break;
    case "bottom-right":
      position = toast?.POSITION?.BOTTOM_RIGHT || "bottom-right";
      break;
    default:
      position = defaultPosition;
  }
  return position;
}


function success(message, placement = "top-center") {
  if (!message) return;
  toast.dismiss(message);
  toast.success(message, {
    position: getPosition(placement),
    toastId: message,
  });
  return { type: alertConstants.OK, message };
}

function warning(message, placement = "top-center") {
  if (!message) return;
  toast.dismiss(message);
  toast.warning(message, {
    position:  getPosition(placement),
    toastId: message
  });
  return { type: alertConstants.WARNING, message };
}

function error(message, placement = "top-center") {
  if (!message) return;
  toast.dismiss(message);
  toast.error(message, {
    position: getPosition(placement),
    toastId: message
  });
  return { type: alertConstants.ERROR, message };
}

function clear() {
  toast.dismiss();
  return { type: alertConstants.CLEAR };
}

export const alertActions = {
  success,
  error,
  warning,
  clear
};