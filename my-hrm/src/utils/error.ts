import axios from "axios";

export const parseErrorMessage = (
  error: unknown,
  messageMap?: Record<string, string>,
  fallback = "Có lỗi xảy ra, vui lòng thử lại."
): string => {
  if (!axios.isAxiosError(error)) return fallback;

  if (!error.response) {
    const code = error.code;
    const msg = error.message;
    if (
      code === "ECONNREFUSED" ||
      code === "ERR_NETWORK" ||
      msg === "Network Error"
    ) {
      return "Không kết nối được tới API. Bật backend (vd: port 3086). Nếu Next chạy trong Docker, rebuild FE với DOCKER_API_URL trỏ tới host (vd: http://host.docker.internal:3086).";
    }
    return msg || fallback;
  }

  const message = error.response.data?.message as unknown;
  let result = fallback;

  if (Array.isArray(message)) result = message[0] || fallback;
  else if (typeof message === "string") result = message;

  if (messageMap) {
    const matched = Object.keys(messageMap).find((key) =>
      result.includes(key)
    );
    if (matched) return messageMap[matched];
  }

  return result;
};