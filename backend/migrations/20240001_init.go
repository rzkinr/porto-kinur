package migrations

import (
	"context"

	"github.com/uptrace/bun"
)

func init() {
	Migrations.MustRegister(func(ctx context.Context, db *bun.DB) error {
		// UP
		_, err := db.ExecContext(ctx, `
			CREATE TABLE IF NOT EXISTS contacts (
				id BIGSERIAL PRIMARY KEY,
				name TEXT NOT NULL,
				email TEXT NOT NULL,
				message TEXT NOT NULL,
				created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
			);

			CREATE TABLE IF NOT EXISTS projects (
				id BIGSERIAL PRIMARY KEY,
				title TEXT NOT NULL,
				description TEXT,
				tech TEXT,
				github TEXT,
				demo TEXT,
				status TEXT,
				created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
			);

			CREATE TABLE IF NOT EXISTS blogs (
				id BIGSERIAL PRIMARY KEY,
				title TEXT NOT NULL,
				slug TEXT UNIQUE NOT NULL,
				excerpt TEXT,
				content TEXT,
				tags TEXT,
				read_time TEXT,
				created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
			);

			CREATE TABLE IF NOT EXISTS profiles (
				id BIGSERIAL PRIMARY KEY,
				bio1 TEXT,
				bio2 TEXT,
				tagline TEXT,
				location TEXT,
				email TEXT,
				github TEXT,
				linkedin TEXT,
				updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
			);

			CREATE TABLE IF NOT EXISTS skills (
				id BIGSERIAL PRIMARY KEY,
				category TEXT NOT NULL,
				items TEXT,
				"order" INT DEFAULT 0
			);

			CREATE TABLE IF NOT EXISTS certifications (
				id BIGSERIAL PRIMARY KEY,
				name TEXT NOT NULL,
				issuer TEXT,
				year TEXT,
				cert_id TEXT,
				created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
			);
		`)
		return err
	}, func(ctx context.Context, db *bun.DB) error {
		// DOWN
		_, err := db.ExecContext(ctx, `
			DROP TABLE IF EXISTS certifications;
			DROP TABLE IF EXISTS skills;
			DROP TABLE IF EXISTS profiles;
			DROP TABLE IF EXISTS blogs;
			DROP TABLE IF EXISTS projects;
			DROP TABLE IF EXISTS contacts;
		`)
		return err
	})
}