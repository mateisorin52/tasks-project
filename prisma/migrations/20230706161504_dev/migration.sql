-- AlterTable
CREATE SEQUENCE task_id_seq;
ALTER TABLE "Task" ALTER COLUMN "id" SET DEFAULT nextval('task_id_seq');
ALTER SEQUENCE task_id_seq OWNED BY "Task"."id";

-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";
