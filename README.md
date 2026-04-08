# My HRM

Monorepo gồm frontend Next.js (`my-hrm`) và backend NestJS + PostgreSQL (`my-hrm-be`).

## Chạy bằng Docker Compose

Cần Docker và Docker Compose (plugin `docker compose`). Backend và frontend dùng hai file compose riêng; chạy backend trước, sau đó frontend.

### 1. Backend (API + database)

```bash
cd my-hrm-be
cp .env.example .env
```

Sửa file `.env` cho phù hợp (tối thiểu: mật khẩu Postgres, `JWT_SECRET`). Với compose hiện tại, nên đặt:

- `PORT=3086` (trùng cổng map trong `docker-compose.yml`)
- `FRONTEND_URL=http://localhost:3200` (CORS khi mở app Next qua Docker)

Khởi chạy:

```bash
docker compose up --build
```

API: `http://localhost:3086`  
PostgreSQL trên máy host: cổng `5433` (user/database theo `.env`).

### 2. Frontend (Next.js)

Mở terminal khác:

```bash
cd my-hrm
```

Tạo hoặc chỉnh `.env` nếu cần:

- `PORT=3200`
- `DOCKER_API_URL=http://host.docker.internal:3086` (mặc định trong compose cũng vậy; đảm bảo backend đã chạy ở bước 1)

Chạy:

```bash
docker compose up --build
```

Ứng dụng: `http://localhost:3200`

### Ghi chú

- Trên Linux, `host.docker.internal` được bật qua `extra_hosts` trong compose frontend để container gọi được API trên máy host.
- Dừng stack: trong từng thư mục, `Ctrl+C` hoặc `docker compose down` (backend có volume DB, dữ liệu giữ lại trừ khi xóa volume).

## Chạy không Docker

Xem `my-hrm/README.md` (frontend dev) và cấu hình trong `my-hrm-be` (npm scripts, Prisma, Postgres local).
