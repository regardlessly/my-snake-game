-- CaritaHub Video Escalation Analytics
-- Database: cth_tzuchi_analytic

CREATE TABLE IF NOT EXISTS cth_escalation_calls (
    call_id        UUID,
    room_name      String,
    centre_id      UInt32,
    member_id      UInt32,
    staff_id       Nullable(UInt32),
    trigger_type   Enum8('voice'=1, 'button'=2, 'ai_auto'=3),
    ai_summary     String,
    risk_tier      Enum8('R1'=1, 'R2'=2, 'R3'=3, 'R4'=4),
    outcome        Enum8('connected'=1, 'timeout'=2, 'cancelled'=3),
    wait_seconds   UInt16,
    call_seconds   UInt16,
    language       String,
    created_at     DateTime64(3),
    connected_at   Nullable(DateTime64(3)),
    ended_at       Nullable(DateTime64(3))
) ENGINE = MergeTree()
ORDER BY (centre_id, created_at);
