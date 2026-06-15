package migrations

import (
	"context"

	"github.com/uptrace/bun"
)

func init() {
	Migrations.MustRegister(func(ctx context.Context, db *bun.DB) error {
		_, err := db.ExecContext(ctx, `
			ALTER TABLE blogs ADD COLUMN IF NOT EXISTS views BIGINT NOT NULL DEFAULT 0;
		`)
		return err
	}, func(ctx context.Context, db *bun.DB) error {
		_, err := db.ExecContext(ctx, `
			ALTER TABLE blogs DROP COLUMN IF EXISTS views;
		`)
		return err
	})
}