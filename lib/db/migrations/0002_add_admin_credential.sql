-- The admin panel's single credential row.
--
-- One password, no email, no user table - /admin is one private surface, not a product with
-- accounts. The primary key is the fixed string 'singleton' so a second credential cannot be
-- inserted by accident; the code reads this row by id rather than taking whatever comes back first.
--
-- The seeded value is a scrypt hash (N=16384, r=8, p=1) with a per-row salt, NOT the password.
-- Rotate it with `pnpm admin:set-password '<new password>'`.
--
-- Idempotent: safe to run against a database that already has the table.
CREATE TABLE IF NOT EXISTS "AdminCredential" (
    "id" text PRIMARY KEY NOT NULL,
    "passwordHash" text NOT NULL,
    "failedAttempts" integer DEFAULT 0 NOT NULL,
    "lockedUntil" timestamp(3),
    "lastLoginAt" timestamp(3),
    "createdAt" timestamp(3) DEFAULT now() NOT NULL,
    "updatedAt" timestamp(3) DEFAULT now() NOT NULL
);

-- ON CONFLICT DO NOTHING so re-running never resets a password that has since been rotated.
INSERT INTO "AdminCredential" ("id", "passwordHash")
VALUES (
    'singleton',
    'scrypt$16384$8$1$45aa5bf097bc79f5c292e32ff65c76a6$c6b01bf9cc8b142296401f2f03b52a066d66a744bdf8518deee0f90800295df29335e843df910827d56a8051341c44103472d65db9c6c3728932c20a6bfc0fc8'
)
ON CONFLICT ("id") DO NOTHING;
