package models

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestBlogSlugNotEmpty(t *testing.T) {
	blog := Blog{
		Title: "Test Post",
		Slug:  "test-post",
	}

	assert.NotEmpty(t, blog.Slug)
	assert.Equal(t, "test-post", blog.Slug)
}

func TestBlogDefaultViews(t *testing.T) {
	blog := Blog{
		Title: "Test Post",
		Slug:  "test-post",
	}

	assert.Equal(t, int64(0), blog.Views)
}