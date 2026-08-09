-- Records whether the visitor opted in to the SyncHQ AI intake session at the end of the contact
-- flow. Nullable on purpose: rows created before this step existed have no answer to record, and
-- NULL ("never asked") is meaningfully different from false ("asked, declined").
ALTER TABLE "Contact" ADD COLUMN IF NOT EXISTS "intakeOptIn" boolean;
