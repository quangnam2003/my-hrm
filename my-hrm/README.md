# My HRM (frontend)

Ứng dụng Next.js. Hướng dẫn chạy **cả backend lẫn frontend bằng Docker** nằm ở [README ở thư mục gốc repo](../README.md).

## Docker (tóm tắt)

Sau khi backend đã `docker compose up --build` trong `my-hrm-be`:

```bash
cd my-hrm
docker compose up --build
```

Mở `http://localhost:3200`. Biến `PORT` và `DOCKER_API_URL` có thể đặt trong `.env` (xem README gốc).

## Dev local (không Docker)

```bash
pnpm dev
# hoặc npm run dev
```

Mặc định Next.js thường là `http://localhost:3000` trừ khi bạn đổi cổng trong `.env` / cấu hình.
